import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import ManageParticipants from "../../components/pages/ManageParticipants";
import { useAuth } from "../../lib/auth";
import {
  fetchSingleMeeting,
  updateParticipants,
} from "../../lib/supabase/meetings";
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
      participants: meeting.participants,
    },
  };
};

type Props = {
  meetingId: string;
  participants: MeetingParticipant[];
};

const EditParticipants: NextPage<Props> = ({
  meetingId,
  participants: initialParticipants,
}) => {
  const { user } = useAuth();
  const router = useRouter();
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
    checkParticipants().then((p) => setParticipants(p));
  }, []);

  return (
    <ManageParticipants
      userId={user!.id}
      participants={participants}
      buttonText="Save"
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
            router.push("/");
          }
        }
      }}
      onClose={() => router.push("/")}
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
