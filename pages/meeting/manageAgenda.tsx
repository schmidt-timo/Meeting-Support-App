import type { NextPage } from "next";
import Button from "../../components/formElements/Button";
import MeetingAgendaItem from "../../components/MeetingAgendaItem/MeetingAgendaItem";
import SubviewBuilder from "../../components/SubviewBuilder/SubviewBuilder";
import { exampleAgendaItems } from "../../utils/exampleData";

const agendaItems = exampleAgendaItems;

const ManageAgenda: NextPage = () => {
  return (
    <SubviewBuilder
      title="Manage agenda"
      backButtonPath="/meeting/createMeeting"
      variant="ARROW"
    >
      <div className="space-y-3 pb-3">
        {agendaItems.map((a) => (
          <MeetingAgendaItem
            title={a.title}
            description={a.description}
            duration={a.duration}
            key={a.id}
          />
        ))}
      </div>
      <div>
        <Button highlighted onClick={() => {}}>
          Add new item
        </Button>
      </div>
    </SubviewBuilder>
  );
};

export default ManageAgenda;
