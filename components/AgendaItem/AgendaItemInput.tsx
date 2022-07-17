import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdCheck, MdClose, MdUpload } from "react-icons/md";
import { ERROR_MESSAGES } from "../../utils/constants";
import { generateRandomID } from "../../utils/functions";
import { validateNumberRegex } from "../../utils/regex";
import { MeetingAgendaItem } from "../../utils/types";
import ErrorMessage from "../formElements/ErrorMessage";
import FilePreview from "./FilePreview";
import LocalFilePreview from "./LocalFilePreview";

type AgendaInputs = {
  agendaItemTitle: string;
  agendaItemDescription: string;
  agendaItemDuration: number;
};

type Props = {
  agendaItem?: MeetingAgendaItem;
  onSave: (item: MeetingAgendaItem, file?: File) => void;
  onAbort: () => void;
  onRemoveFile: (fileUrl: string, itemId: string) => void;
};

const AgendaItemInput = ({
  agendaItem,
  onSave,
  onAbort,
  onRemoveFile,
}: Props) => {
  const [file, setFile] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgendaInputs>({
    mode: "onChange",
  });

  const onSubmit = (data: AgendaInputs) => {
    const item: MeetingAgendaItem = {
      id: agendaItem?.id ?? generateRandomID(),
      title: data.agendaItemTitle,
      duration: data.agendaItemDuration,
      description: data.agendaItemDescription,
    };
    onSave(item, file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white rounded-xl px-3 pb-3 pt-2.5 space-y-1">
        <input
          className="w-full font-bold border p-0.5"
          placeholder="Title"
          {...register("agendaItemTitle", {
            required: ERROR_MESSAGES.IS_REQUIRED,
          })}
          defaultValue={agendaItem?.title}
        />
        <ErrorMessage errors={errors} fieldName="agendaItemTitle" />
        <div className="w-full space-x-2 items-center flex">
          <input
            className="text-sm w-16 border p-0.5"
            placeholder="Duration"
            {...register("agendaItemDuration", {
              pattern: {
                value: validateNumberRegex,
                message: ERROR_MESSAGES.NOT_NUMBER_REGEX,
              },
            })}
            defaultValue={agendaItem?.duration}
          />
          <p className="text-sm">min</p>
        </div>
        <ErrorMessage errors={errors} fieldName="agendaItemDuration" />
        <textarea
          className="w-full text-sm border p-0.5 min-h-agenda max-h-agenda"
          placeholder="Description"
          {...register("agendaItemDescription")}
          defaultValue={agendaItem?.description}
        />
        <div>
          {agendaItem?.fileUrl && (
            <FilePreview
              fileUrl={agendaItem.fileUrl}
              onRemove={(fileUrl) => onRemoveFile(fileUrl, agendaItem.id)}
            />
          )}
          {file && (
            <LocalFilePreview file={file} onRemove={() => setFile(undefined)} />
          )}
        </div>
        <div className="space-x-2 flex justify-between pt-2">
          <span style={{ maxWidth: "70%" }}>
            {!agendaItem?.fileUrl && (
              <label
                aria-label="Upload Button"
                className="flex justify-center items-center flex-shrink-0 cursor-pointer text-sm pl-2 pr-3 rounded-xl font-medium bg-gray-200 p-1 space-x-1"
              >
                <MdUpload className="w-4 h-4" />
                <p>Upload PDF</p>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(event) => setFile(event.target.files![0])}
                  className="hidden"
                />
              </label>
            )}
          </span>
          <span className="flex space-x-2">
            <button
              type="submit"
              className="bg-green-200 rounded-full w-7 h-7 flex justify-center items-center flex-shrink-0"
            >
              <MdCheck className="text-green-800 h-5 w-5" />
            </button>
            <button
              onClick={() => onAbort()}
              className="bg-red-200 rounded-full w-7 h-7 flex justify-center items-center flex-shrink-0"
            >
              <MdClose className="text-red-600 h-5 w-5" />
            </button>
          </span>
        </div>
      </div>
    </form>
  );
};

export default AgendaItemInput;
