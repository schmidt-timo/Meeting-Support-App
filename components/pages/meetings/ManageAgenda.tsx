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
  onRemoveFile: (fileUrl: string, itemId: string) => void;
  isUploading: boolean;
};

const ManageAgendaContent = ({
  agendaItems,
  buttonText,
  onNext,
  onAddAgendaItem,
  onUpdateAgendaItem,
  onDeleteAgendaItem,
  onRemoveFile,
  isUploading,
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
              isUploading={isUploading}
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
            className="flex items-center justify-center space-x-2 bg-gray-400 hover:bg-gray-500 group hover:text-white"
          >
            <MdAddCircle className="w-5 h-5 text-gray-600 group-hover:text-white" />
            <p>Add item</p>
          </Button>
        )}
      </div>

      <Button
        disabled={!showNewItemButton}
        variant="highlighted"
        onClick={() => onNext(agendaItems)}
        className="disabled:text-gray-400 disabled:bg-gray-600"
      >
        {showNewItemButton
          ? buttonText
          : "Save or discard the opened item first!"}
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
  onRemoveFile: (fileUrl: string, itemId: string) => void;
  isUploading: boolean;
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
  onRemoveFile,
  isUploading,
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
            onRemoveFile={onRemoveFile}
            isUploading={isUploading}
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
            onRemoveFile={onRemoveFile}
            isUploading={isUploading}
          />
        </SubPageLayout>
      )}
    </>
  );
};

export default ManageAgenda;
