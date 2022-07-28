import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ManageParticipants from "../../components/pages/meetings/ManageParticipants";
import ViewParticipants from "../../components/pages/meetings/ViewParticipants";
import { useAuth } from "../../lib/auth";
import { updateParticipants } from "../../lib/supabase/meeting";
import { fetchSingleMeeting } from "../../lib/supabase/meetings";
import { getParticipantInfoIfEmailIsRegistered } from "../../lib/supabase/users";
import {
  arraysAreEqual,
  convertParticipantsForDatabase,
} from "../../utils/functions";
import { MeetingParticipant } from "../../utils/types";

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
      createdBy: meeting.createdBy,
      participants: meeting.participants,
    },
  };
};

type Props = {
  meetingId: string;
  createdBy: string;
  participants: MeetingParticipant[];
  onClose?: () => void;
};

const EditParticipants: NextPage<Props> = ({
  meetingId,
  createdBy,
  participants: initialParticipants,
  onClose,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [participants, setParticipants] =
    useState<MeetingParticipant[]>(initialParticipants);

  useEffect(() => {
    async function checkParticipants(): Promise<MeetingParticipant[]> {
      return new Promise(async (resolve, reject) => {
        let temp: MeetingParticipant[] = [];
        for (const p of participants) {
          const { data, error } = await getParticipantInfoIfEmailIsRegistered(
            p.email
          );

          if (error) {
            temp = [...temp, p];
          }

          if (data) {
            temp = [...temp, data];
          }
        }
        resolve(temp);
      });
    }

    // check if participants are already registered
    checkParticipants().then((p) => {
      setParticipants(p);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (createdBy !== user!.id) {
    return (
      <ViewParticipants
        userId={user!.id}
        participants={participants}
        onClose={() => {
          if (onClose) {
            onClose();
          } else {
            router.push("/");
          }
        }}
        onDeclineMeeting={async () => {
          const newParticipants = convertParticipantsForDatabase(
            participants.filter((p) => p.id !== user!.id)
          );

          const { data, error } = await updateParticipants(
            meetingId,
            newParticipants
          );

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
        }}
      />
    );
  }

  return (
    <ManageParticipants
      userId={user!.id}
      participants={participants}
      buttonText="Save"
      loadingText="Saving ..."
      onCreate={async (p) => {
        if (!arraysAreEqual(initialParticipants, p)) {
          const newParticipants = convertParticipantsForDatabase(p);

          const { data, error } = await updateParticipants(
            meetingId,
            newParticipants
          );

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
        } else {
          if (onClose) {
            onClose();
          } else {
            router.push("/");
          }
        }
      }}
      onClose={() => {
        if (onClose) {
          onClose();
        } else {
          router.push("/");
        }
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
      onDeleteParticipant={(participantId) => {
        setParticipants(participants.filter((p) => p.id !== participantId));
      }}
    />
  );
};

export default EditParticipants;
