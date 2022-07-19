import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ManageAgenda from "../components/pages/meetings/ManageAgenda";
import ManageParticipants from "../components/pages/meetings/ManageParticipants";
import NewMeetingPage, {
  MeetingDataInputs,
} from "../components/pages/meetings/NewMeetingPage";
import { useAuth } from "../lib/auth";
import {
  createMeeting,
  deleteFileFromAgendaItem,
  getSignedUrlForAgendaItemFile,
  uploadFileToAgendaItem,
} from "../lib/supabase/meetings";
import {
  getParticipantInfo,
  getParticipantInfoIfEmailIsRegistered,
} from "../lib/supabase/users";
import {
  convertParticipantsForDatabase,
  convertStringsToDate,
  generateMeetingID,
  getFileNameFromUrl,
} from "../utils/functions";
import {
  DatabaseMeeting,
  MeetingAgendaItem,
  MeetingParticipant,
} from "../utils/types";

type Views = "CREATE_MEETING" | "MANAGE_AGENDA" | "MANAGE_PARTICIPANTS";

const NewMeeting: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const initialParticipant = {
    id: user!.id,
    email: user!.email!,
  };

  const [currentView, setCurrentView] = useState<Views>("CREATE_MEETING");
  const [meetingData, setMeetingData] = useState<MeetingDataInputs>();
  const [agendaItems, setAgendaItems] = useState<MeetingAgendaItem[]>([]);
  const [participants, setParticipants] = useState<MeetingParticipant[]>([
    initialParticipant,
  ]);
  const [fileIsUploading, setFileIsUploading] = useState(false);

  const meetingId = generateMeetingID();

  useEffect(() => {
    // retrieve current user data and replace initial participant
    getParticipantInfo(user!.id).then((p) => {
      setParticipants([p]);
    });
  }, []);

  return (
    <>
      {currentView === "CREATE_MEETING" && (
        <NewMeetingPage
          meetingData={meetingData}
          buttonText="Next"
          onNext={(data) => {
            setMeetingData(data);
            setCurrentView("MANAGE_AGENDA");
          }}
          onClose={() => router.push("/")}
        />
      )}
      {currentView === "MANAGE_AGENDA" && (
        <ManageAgenda
          isUploading={fileIsUploading}
          agendaItems={agendaItems}
          onBack={(items) => {
            setAgendaItems(items);
            setCurrentView("CREATE_MEETING");
          }}
          buttonText="Next"
          onNext={(items) => {
            setAgendaItems(items);
            setCurrentView("MANAGE_PARTICIPANTS");
          }}
          onClose={() => router.push("/")}
          onAddAgendaItem={async (item, file) => {
            return new Promise((resolve, reject) => {
              if (file) {
                setFileIsUploading(true);
                uploadFileToAgendaItem(file, item.id, meetingId).then(
                  (uploadData) => {
                    if (uploadData) {
                      getSignedUrlForAgendaItemFile(
                        file.name,
                        item.id,
                        meetingId
                      ).then((url) => {
                        if (url) {
                          setAgendaItems([
                            ...agendaItems,
                            {
                              ...item,
                              fileUrl: url,
                            },
                          ]);
                          setFileIsUploading(false);
                          resolve();
                        }
                      });
                    }
                  }
                );
              } else {
                setAgendaItems([...agendaItems, item]);
                resolve();
              }
            });
          }}
          onUpdateAgendaItem={async (item, file) => {
            return new Promise((resolve, reject) => {
              if (file) {
                setFileIsUploading(true);
                uploadFileToAgendaItem(file, item.id, meetingId).then(
                  (uploadData) => {
                    if (uploadData) {
                      getSignedUrlForAgendaItemFile(
                        file.name,
                        item.id,
                        meetingId
                      )
                        .then((url) => {
                          if (url) {
                            const index = agendaItems.findIndex(
                              (i) => i.id === item.id
                            );
                            const newItem = {
                              ...item,
                              fileUrl: url,
                            };
                            setAgendaItems([
                              ...agendaItems.slice(0, index),
                              newItem,
                              ...agendaItems.slice(
                                index + 1,
                                agendaItems.length
                              ),
                            ]);
                            setFileIsUploading(false);
                            resolve();
                          }
                        })
                        .catch((error) => {
                          reject();
                          throw error;
                        });
                    }
                  }
                );
              } else {
                const index = agendaItems.findIndex((i) => i.id === item.id);
                setAgendaItems([
                  ...agendaItems.slice(0, index),
                  item,
                  ...agendaItems.slice(index + 1, agendaItems.length),
                ]);
                resolve();
              }
            });
          }}
          onDeleteAgendaItem={(itemId) => {
            setAgendaItems(agendaItems.filter((item) => item.id !== itemId));
          }}
          onRemoveFile={async (fileUrl, itemId) => {
            const fileName = getFileNameFromUrl(fileUrl);
            deleteFileFromAgendaItem(`${meetingId}/${itemId}/${fileName}`)
              .then((data) => {
                const index = agendaItems.findIndex((i) => i.id === itemId);

                const newItem = agendaItems[index];
                delete newItem.fileUrl;

                const newItems = [
                  ...agendaItems.slice(0, index),
                  newItem,
                  ...agendaItems.slice(index + 1, agendaItems.length),
                ];

                setAgendaItems(newItems);
              })
              .catch((error) => {
                throw error;
              });
          }}
        />
      )}
      {currentView === "MANAGE_PARTICIPANTS" && (
        <ManageParticipants
          userId={user!.id}
          participants={participants}
          buttonText="Create Meeting"
          loadingText="Creating meeting ..."
          onBack={(updatedParticipants) => {
            setParticipants(updatedParticipants);
            setCurrentView("MANAGE_AGENDA");
          }}
          onAddParticipant={async (participantToAdd) => {
            const { data, error } = await getParticipantInfoIfEmailIsRegistered(
              participantToAdd.email
            );

            if (data) {
              setParticipants([...participants, data]);
              return data;
            }

            if (error) {
              setParticipants([...participants, participantToAdd]);
              return participantToAdd;
            }
          }}
          onDeleteParticipant={(participantId) =>
            setParticipants(participants.filter((p) => p.id !== participantId))
          }
          onCreate={async (updatedParticipants) => {
            return new Promise(async (resolve, reject) => {
              setParticipants(updatedParticipants);
              const meeting: DatabaseMeeting = {
                id: meetingId,
                createdBy: user!.id,
                title: meetingData!!.title,
                startDate: convertStringsToDate(
                  meetingData!!.startDate,
                  meetingData!!.startTime
                ),
                endDate: convertStringsToDate(
                  meetingData!!.endDate,
                  meetingData!!.endTime
                ),
                location: meetingData?.location,
                description: meetingData?.description,
                agenda: agendaItems,
                participants:
                  convertParticipantsForDatabase(updatedParticipants),
                completed: false,
              };

              const { data, error } = await createMeeting(meeting);

              if (error) {
                reject();
                throw error;
              }

              if (data) {
                router.push("/");
                resolve();
              }
            });
          }}
          onClose={() => router.push("/")}
        />
      )}
    </>
  );
};

export default NewMeeting;
