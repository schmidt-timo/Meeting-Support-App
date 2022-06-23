import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import NewMeetingPage from "../components/views/NewMeetingPage";
import ManageAgenda from "../components/views/ManageAgenda";
import { MeetingAgendaItem } from "../utils/types";

type Views = "CREATE_MEETING" | "MANAGE_AGENDA" | "MANAGE_PARTICIPANTS";

const NewMeeting: NextPage = () => {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<Views>("CREATE_MEETING");
  const [agendaItems, setAgendaItems] = useState<MeetingAgendaItem[]>([]);

  return (
    <>
      {currentView === "CREATE_MEETING" && (
        <NewMeetingPage
          onNext={(meeting) => {
            // TODO: Save meeting
            setCurrentView("MANAGE_AGENDA");
          }}
          onClose={() => router.push("/")}
        />
      )}
      {currentView === "MANAGE_AGENDA" && (
        <ManageAgenda
          agendaItems={agendaItems}
          onBack={(items) => {
            setAgendaItems(items);
            setCurrentView("CREATE_MEETING");
          }}
          onClose={() => router.push("/")}
        />
      )}
    </>
  );
};

export default NewMeeting;
