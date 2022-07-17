import { useEffect, useRef, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { MeetingAgendaItem } from "../../../utils/types";
import AgendaItem from "../../AgendaItem/AgendaItem";
import AgendaItemInput from "../../AgendaItem/AgendaItemInput";
import Button from "../../formElements/Button";
import SubPageLayout from "../layouts/SubPageLayout";

type ManageAgendaContentProps = {
  buttonText: string;
  agendaItems: MeetingAgendaItem[];
  onNext: (items: MeetingAgendaItem[]) => void;
  onAddAgendaItem: (item: MeetingAgendaItem, file?: File) => Promise<void>;
  onUpdateAgendaItem: (item: MeetingAgendaItem, file?: File) => Promise<void>;
  onDeleteAgendaItem: (itemId: string) => void;
  onUpload: (file: File, itemId: string) => void;
  onRemoveFile: (fileUrl: string, itemId: string) => void;
};

const ManageAgendaContent = ({
  agendaItems,
  buttonText,
  onNext,
  onAddAgendaItem,
  onUpdateAgendaItem,
  onDeleteAgendaItem,
  onRemoveFile,
}: ManageAgendaContentProps) => {
  const [showNewItemButton, setShowNewItemButton] = useState<Boolean>(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }, [showNewItemButton]);

  return (
    <>
      <div className="space-y-3 pb-3">
        {agendaItems?.map((a) => (
          <AgendaItem
            agendaItem={a}
            key={a.id}
            onDelete={onDeleteAgendaItem}
            onChange={onUpdateAgendaItem}
            onRemoveFile={onRemoveFile}
          />
        ))}
        {!showNewItemButton ? (
          <div ref={ref}>
            <AgendaItemInput
              onAbort={() => setShowNewItemButton(true)}
              onSave={(item, file) =>
                onAddAgendaItem(item, file).then(() => {
                  setShowNewItemButton(true);
                })
              }
              onRemoveFile={onRemoveFile}
            />
          </div>
        ) : (
          <Button
            onClick={() => setShowNewItemButton(false)}
            className="flex items-center justify-center space-x-2"
          >
            <MdAddCircle className="w-5 h-5 text-gray-600" />
            <p>Add item</p>
          </Button>
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
  onAddAgendaItem: (item: MeetingAgendaItem, file?: File) => Promise<void>;
  onUpdateAgendaItem: (item: MeetingAgendaItem, file?: File) => Promise<void>;
  onDeleteAgendaItem: (itemId: string) => void;
  onUpload: (file: File, itemId: string) => void;
  onRemoveFile: (fileUrl: string, itemId: string) => void;
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
  onUpload,
  onRemoveFile,
}: Props) => {
  return (
    <>
      {onBack ? (
        <SubPageLayout
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
            onUpload={onUpload}
            onRemoveFile={onRemoveFile}
          />
        </SubPageLayout>
      ) : (
        <SubPageLayout title="Manage agenda" onClose={onClose}>
          <ManageAgendaContent
            agendaItems={agendaItems}
            buttonText={buttonText}
            onNext={onNext}
            onAddAgendaItem={onAddAgendaItem}
            onUpdateAgendaItem={onUpdateAgendaItem}
            onDeleteAgendaItem={onDeleteAgendaItem}
            onUpload={onUpload}
            onRemoveFile={onRemoveFile}
          />
        </SubPageLayout>
      )}
    </>
  );
};

export default ManageAgenda;
