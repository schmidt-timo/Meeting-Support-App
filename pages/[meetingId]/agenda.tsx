import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import ManageAgenda from "../../components/pages/meetings/ManageAgenda";
import { fetchSingleMeeting, updateAgenda } from "../../lib/supabase/meetings";
import { arraysAreEqual } from "../../utils/functions";
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

  return (
    <ManageAgenda
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
      onAddAgendaItem={(item) => {
        return new Promise((resolve, reject) => {
          setAgendaItems([...agendaItems, item]);
          resolve();
        });
      }}
      onUpdateAgendaItem={(item) => {
        const index = agendaItems.findIndex((el) => el.id === item.id);
        const updatedItems = agendaItems;
        updatedItems[index] = item;
        setAgendaItems(updatedItems);
      }}
      onDeleteAgendaItem={(itemId) => {
        setAgendaItems(agendaItems.filter((item) => item.id !== itemId));
      }}
    />
  );
};

export default EditAgenda;
