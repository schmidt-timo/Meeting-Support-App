import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import ManageAgenda from "../../components/pages/meetings/ManageAgenda";
import {
  deleteFileFromAgendaItem,
  fetchSingleMeeting,
  getPublicFileUrlForAgendaItem,
  updateAgenda,
  uploadFileToAgendaItem,
} from "../../lib/supabase/meetings";
import { getFileNameFromUrl } from "../../utils/functions";
import { MeetingAgendaItem } from "../../utils/types";

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
    },
  };
};

type Props = {
  meetingId: string;
  agendaItems: MeetingAgendaItem[];
};

const EditAgenda: NextPage<Props> = ({
  meetingId,
  agendaItems: initialAgendaItems,
}) => {
  const router = useRouter();
  const [agendaItems, setAgendaItems] =
    useState<MeetingAgendaItem[]>(initialAgendaItems);

  const [fileIsUploading, setFileIsUploading] = useState(false);

  return (
    <ManageAgenda
      isUploading={fileIsUploading}
      agendaItems={agendaItems}
      buttonText="Save"
      onNext={async (items) => {
        const { data, error } = await updateAgenda(meetingId, items);

        if (error) {
          throw error;
        }

        if (data) {
          router.push("/");
        }
      }}
      onClose={() => router.push("/")}
      onAddAgendaItem={async (item, file) => {
        return new Promise((resolve, reject) => {
          if (file) {
            setFileIsUploading(true);
            uploadFileToAgendaItem(file, item.id, meetingId).then(
              (uploadData) => {
                if (uploadData) {
                  getPublicFileUrlForAgendaItem(
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
                  getPublicFileUrlForAgendaItem(file.name, item.id, meetingId)
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
        setAgendaItems(agendaItems.filter((item) => item.id !== itemId));
      }}
      onUpload={async (file, itemId) => {
        uploadFileToAgendaItem(file, itemId, meetingId).then((res) => {});
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
