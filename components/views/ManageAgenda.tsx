import { useState } from "react";
import { MeetingAgendaItem } from "../../utils/types";
import AgendaItem from "../AgendaItem/AgendaItem";
import AgendaItemInput from "../AgendaItem/AgendaItemInput";
import Button from "../formElements/Button";
import SubviewBuilder from "../SubviewBuilder/SubviewBuilder";

type Props = {
  agendaItems: MeetingAgendaItem[];
  onBack: (items: MeetingAgendaItem[]) => void;
  onClose: () => void;
};

const ManageAgenda = ({
  agendaItems: initialItems,
  onBack,
  onClose,
}: Props) => {
  const [agendaItems, setAgendaItems] =
    useState<MeetingAgendaItem[]>(initialItems);
  const [showNewItemButton, setShowNewItemButton] = useState<Boolean>(true);

  return (
    <SubviewBuilder
      title="Manage agenda"
      onBack={() => onBack(agendaItems)}
      onClose={onClose}
    >
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
    </SubviewBuilder>
  );
};

export default ManageAgenda;
