import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import CreateMeetingPage from "../components/views/CreateMeetingPage";

type Views = "CREATE_MEETING" | "MANAGE_AGENDA" | "MANAGE_PARTICIPANTS";

const NewMeeting: NextPage = () => {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<Views>("CREATE_MEETING");

  return (
    <>
      {currentView === "CREATE_MEETING" && (
        <CreateMeetingPage
          onManageAgenda={() => setCurrentView("MANAGE_AGENDA")}
          onManageParticipants={() => setCurrentView("MANAGE_PARTICIPANTS")}
          onCreateMeeting={(meeting) => {}}
          onClose={() => router.push("/")}
        />
      )}
    </>
  );
};

export default NewMeeting;
