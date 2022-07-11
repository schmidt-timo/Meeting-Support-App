import { useState } from "react";
import { MeetingAgendaItem } from "../../utils/types";
import AgendaItem from "../AgendaItem/AgendaItem";
import AgendaItemInput from "../AgendaItem/AgendaItemInput";
import Button from "../formElements/Button";
import SubPageTemplate from "../templates/SubPageTemplate";

type ManageAgendaContentProps = {
  buttonText: string;
  agendaItems: MeetingAgendaItem[];
  onNext: (items: MeetingAgendaItem[]) => void;
};

const ManageAgendaContent = ({
  agendaItems: initialItems,
  buttonText,
  onNext,
}: ManageAgendaContentProps) => {
  const [agendaItems, setAgendaItems] =
    useState<MeetingAgendaItem[]>(initialItems);
  const [showNewItemButton, setShowNewItemButton] = useState<Boolean>(true);

  return (
    <>
      <div className="space-y-3 pb-3">
        {agendaItems?.map((a) => (
          <AgendaItem
            agendaItem={a}
            key={a.id}
            onDelete={(itemId) =>
              setAgendaItems(agendaItems.filter((item) => item.id !== itemId))
            }
            onChange={(item) => {
              const index = agendaItems.findIndex((el) => el.id === item.id);
              const updatedItems = agendaItems;
              updatedItems[index] = item;
              setAgendaItems(updatedItems);
            }}
          />
        ))}
        {!showNewItemButton ? (
          <AgendaItemInput
            onAbort={() => setShowNewItemButton(true)}
            onSave={(item) => {
              setAgendaItems([...agendaItems, item]);
              setShowNewItemButton(true);
            }}
          />
        ) : (
          <Button onClick={() => setShowNewItemButton(false)}>Add item</Button>
        )}
      </div>
      <Button variant="highlighted" onClick={() => onNext(agendaItems)}>
        {buttonText}
      </Button>
    </>
  );
};

type Props = {
  agendaItems: MeetingAgendaItem[];
  onBack?: (items: MeetingAgendaItem[]) => void;
  buttonText: string;
  onNext: (items: MeetingAgendaItem[]) => void;
  onClose: () => void;
};

const ManageAgenda = ({
  agendaItems,
  onBack,
  buttonText,
  onNext,
  onClose,
}: Props) => {
  return (
    <>
      {onBack ? (
        <SubPageTemplate
          title="Manage agenda"
          onBack={() => onBack(agendaItems)}
          onClose={onClose}
        >
          <ManageAgendaContent
            agendaItems={agendaItems}
            buttonText={buttonText}
            onNext={onNext}
          />
        </SubPageTemplate>
      ) : (
        <SubPageTemplate title="Manage agenda" onClose={onClose}>
          <ManageAgendaContent
            agendaItems={agendaItems}
            buttonText={buttonText}
            onNext={onNext}
          />
        </SubPageTemplate>
      )}
    </>
  );
};

export default ManageAgenda;
