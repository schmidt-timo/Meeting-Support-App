import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import ManageAgenda from "../../components/pages/meetings/ManageAgenda";
import {
  deleteFileFromAgendaItem,
  fetchSingleMeeting,
  getSignedUrlForAgendaItemFile,
  updateAgenda,
  uploadFileToAgendaItem,
} from "../../lib/supabase/meetings";
import { updateAgendaStatus } from "../../lib/supabase/status";
import { getFileNameFromUrl } from "../../utils/functions";
import { MeetingAgendaItem, MeetingAgendaStatus } from "../../utils/types";

interface Params extends ParsedUrlQuery {
  meetingId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params as Params;

  const { data: meeting, error } = await fetchSingleMeeting(params.meetingId);

  if (error) {
    throw error;
  }

  return {
    props: {
      meetingId: meeting.id,
      agendaItems: meeting.agenda,
      agendaStatus: meeting.agendaStatus,
    },
  };
};

type Props = {
  meetingId: string;
  agendaItems: MeetingAgendaItem[];
  agendaStatus?: MeetingAgendaStatus;
  onClose?: () => void;
};

const EditAgenda: NextPage<Props> = ({
  meetingId,
  agendaItems: initialAgendaItems,
  agendaStatus,
  onClose,
}) => {
  const router = useRouter();
  const [agendaItems, setAgendaItems] =
    useState<MeetingAgendaItem[]>(initialAgendaItems);

  const [fileIsUploading, setFileIsUploading] = useState(false);
  const [filesToDelete, setFilesToDelete] = useState<MeetingAgendaItem[]>([]);

  return (
    <ManageAgenda
      isUploading={fileIsUploading}
      agendaItems={agendaItems}
      buttonText="Save"
      onNext={async (items) => {
        new Promise((resolve, reject) => {
          // delete files
          filesToDelete.forEach((f) => {
            const fileName = getFileNameFromUrl(f.fileUrl!);
            deleteFileFromAgendaItem(`${meetingId}/${f.id}/${fileName}`).catch(
              (error) => {
                throw error;
              }
            );
          });
          resolve(true);
        }).then(() => {
          new Promise((resolve, reject) => {
            if (
              agendaStatus &&
              agendaStatus.currentItemIndex > items.length - 1
            ) {
              // reset agendaStatus if necessary
              updateAgendaStatus(meetingId, {
                currentItemIndex: 0,
                startedAt: new Date(),
              })
                .then((data) => {
                  if (data) {
                    resolve(true);
                  }
                })
                .catch((error) => {
                  reject();
                  throw error;
                });
            } else {
              resolve(true);
            }
          }).then(async () => {
            const { data, error } = await updateAgenda(meetingId, items);

            if (error) {
              throw error;
            }

            if (data) {
              if (onClose) {
                onClose();
              } else {
                router.push("/");
              }
            }
          });
        });
      }}
      onClose={() => {
        if (onClose) {
          onClose();
        } else {
          router.push("/");
        }
      }}
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
                  getSignedUrlForAgendaItemFile(file.name, item.id, meetingId)
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
                          ...agendaItems.slice(index + 1, agendaItems.length),
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
        const item = agendaItems.find((i) => i.id === itemId);
        if (item?.fileUrl) {
          setFilesToDelete([...filesToDelete, item]);
        }
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
  );
};

export default EditAgenda;
