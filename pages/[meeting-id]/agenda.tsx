import type { NextPage } from "next";
import { useRouter } from "next/router";
import ManageAgenda from "../../components/pages/ManageAgenda";
import { exampleMeetings } from "../../utils/exampleData";
import { Meeting } from "../../utils/types";

const EditAgenda: NextPage = () => {
  const router = useRouter();
  // TODO: Pass data over
  const meeting: Meeting = exampleMeetings[0];

  return (
    <ManageAgenda
      agendaItems={meeting.agenda ?? []}
      buttonText="Save"
      onNext={(items) => {
        // TODO: Save to database
        router.push("/");
      }}
      onClose={() => router.push("/")}
    />
  );
};

export default EditAgenda;
