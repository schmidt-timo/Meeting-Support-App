import type { NextPage } from "next";
import { useRouter } from "next/router";
import ManageParticipants from "../../components/pages/ManageParticipants";
import { exampleMeetings } from "../../utils/exampleData";
import { Meeting } from "../../utils/types";

const EditParticipants: NextPage = () => {
  const router = useRouter();
  // TODO: Pass data over
  const meeting: Meeting = exampleMeetings[0];

  return (
    <ManageParticipants
      participants={meeting.participants ?? []}
      buttonText="Save"
      onCreate={(participants) => {
        // TODO: Save to database
      }}
      onClose={() => router.push("/")}
    />
  );
};

export default EditParticipants;
