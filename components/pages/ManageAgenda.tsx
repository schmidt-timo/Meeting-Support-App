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
  onAddAgendaItem: (item: MeetingAgendaItem) => Promise<void>;
  onUpdateAgendaItem: (item: MeetingAgendaItem) => void;
  onDeleteAgendaItem: (itemId: string) => void;
};

const ManageAgendaContent = ({
  agendaItems,
  buttonText,
  onNext,
  onAddAgendaItem,
  onUpdateAgendaItem,
  onDeleteAgendaItem,
}: ManageAgendaContentProps) => {
  const [showNewItemButton, setShowNewItemButton] = useState<Boolean>(true);

  return (
    <>
      <div className="space-y-3 pb-3">
        {agendaItems?.map((a) => (
          <AgendaItem
            agendaItem={a}
            key={a.id}
            onDelete={onDeleteAgendaItem}
            onChange={onUpdateAgendaItem}
          />
        ))}
        {!showNewItemButton ? (
          <AgendaItemInput
            onAbort={() => setShowNewItemButton(true)}
            onSave={(item) =>
              onAddAgendaItem(item).then(() => {
                setShowNewItemButton(true);
              })
            }
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
  onAddAgendaItem: (item: MeetingAgendaItem) => Promise<void>;
  onUpdateAgendaItem: (item: MeetingAgendaItem) => void;
  onDeleteAgendaItem: (itemId: string) => void;
};

const ManageAgenda = ({
  agendaItems,
  onBack,
  buttonText,
  onNext,
  onClose,
  onAddAgendaItem,
  onUpdateAgendaItem,
  onDeleteAgendaItem,
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
            onAddAgendaItem={onAddAgendaItem}
            onUpdateAgendaItem={onUpdateAgendaItem}
            onDeleteAgendaItem={onDeleteAgendaItem}
          />
        </SubPageTemplate>
      ) : (
        <SubPageTemplate title="Manage agenda" onClose={onClose}>
          <ManageAgendaContent
            agendaItems={agendaItems}
            buttonText={buttonText}
            onNext={onNext}
            onAddAgendaItem={onAddAgendaItem}
            onUpdateAgendaItem={onUpdateAgendaItem}
            onDeleteAgendaItem={onDeleteAgendaItem}
          />
        </SubPageTemplate>
      )}
    </>
  );
};

export default ManageAgenda;
