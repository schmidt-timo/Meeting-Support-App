import { MeetingAgendaItem } from "../../../utils/types";
import AgendaItem from "../../AgendaItem/AgendaItem";
import AgendaItemView from "../../AgendaItem/AgendaItemView";
import Button from "../../formElements/Button";
import SubPageLayout from "../layouts/SubPageLayout";

type Props = {
  agendaItems: MeetingAgendaItem[];
  onClose: () => void;
  onEditAgenda: () => void;
};

const FullAgenda = ({ agendaItems, onClose, onEditAgenda }: Props) => {
  return (
    <SubPageLayout title="Meeting agenda" onClose={onClose}>
      <div className="space-y-3 pb-3">
        {agendaItems?.map((a) => (
          <AgendaItemView agendaItem={a} key={a.id} />
        ))}
      </div>
      <Button variant="highlighted" onClick={onEditAgenda}>
        Edit agenda
      </Button>
    </SubPageLayout>
  );
};

export default FullAgenda;
