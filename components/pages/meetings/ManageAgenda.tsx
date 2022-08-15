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
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
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
            onEdit={(inEditMode) => setIsInEditMode(inEditMode)}
          />
        ))}
        {!showNewItemButton ? (
          <div ref={ref}>
            <AgendaItemInput
              isUploading={isUploading}
              onAbort={() => setShowNewItemButton(true)}
              onSave={(item, file) =>
                onAddAgendaItem(item, file)
                  .then(() => {
                    setShowNewItemButton(true);
                  })
                  .catch((error) => {
                    throw error;
                  })
              }
              onRemoveFile={onRemoveFile}
            />
          </div>
        ) : (
          <Button
            onClick={() => setShowNewItemButton(false)}
            className="flex items-center justify-center space-x-2 bg-mblue-200 hover:bg-mblue-300 group-hover:text-white"
          >
            <MdAddCircle className="w-5 h-5 text-mblue-500 group-hover:text-white" />
            <p>Add item</p>
          </Button>
        )}
      </div>

      <Button
        disabled={!showNewItemButton || isInEditMode}
        variant="highlighted"
        onClick={() => onNext(agendaItems)}
        className="disabled:text-mblue-500 disabled:text-opacity-40 disabled:bg-mblue-500 disabled:bg-opacity-10"
      >
        {!showNewItemButton || isInEditMode
          ? "Save or discard the opened item first!"
          : buttonText}
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
