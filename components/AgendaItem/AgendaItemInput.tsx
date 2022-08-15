import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdCheck, MdClose, MdLoop, MdUpload } from "react-icons/md";
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
  isUploading?: boolean;
};

const AgendaItemInput = ({
  agendaItem,
  onSave,
  onAbort,
  onRemoveFile,
  isUploading = false,
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
      fileUrl: agendaItem?.fileUrl,
    };
    onSave(item, file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white rounded-xl px-3 pb-3 pt-2.5 space-y-1">
        <input
          className="w-full font-bold border p-0.5 text-mblue-500 border-mblue-300 border-opacity-40 placeholder-mblue-500 placeholder-opacity-40"
          placeholder="Title"
          {...register("agendaItemTitle", {
            required: ERROR_MESSAGES.IS_REQUIRED,
          })}
          defaultValue={agendaItem?.title}
        />
        <ErrorMessage errors={errors} fieldName="agendaItemTitle" />
        <div className="w-full space-x-2 items-center flex">
          <input
            className="text-sm w-16 border p-0.5 text-mblue-500 border-mblue-300 border-opacity-40 placeholder-mblue-500 placeholder-opacity-40"
            placeholder="Duration"
            {...register("agendaItemDuration", {
              pattern: {
                value: validateNumberRegex,
                message: ERROR_MESSAGES.NOT_NUMBER_REGEX,
              },
            })}
            defaultValue={agendaItem?.duration}
          />
          <p className="text-sm text-mblue-500">min</p>
        </div>
        <ErrorMessage errors={errors} fieldName="agendaItemDuration" />
        <textarea
          className="w-full text-sm border p-0.5 min-h-agenda max-h-agenda text-mblue-500 border-mblue-300 border-opacity-40 placeholder-mblue-500 placeholder-opacity-40"
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
              <div className="flex space-x-2 items-center">
                <label
                  aria-label="Upload Button"
                  className={`flex justify-center items-center flex-shrink-0 cursor-pointer text-sm pl-2 pr-3 rounded-xl font-medium p-1 space-x-1 ${
                    isUploading
                      ? "bg-mblue-500 text-white"
                      : "bg-mblue-200 bg-opacity-50 text-mblue-500 hover:mblue-200 hover:bg-opacity-100"
                  }`}
                >
                  {isUploading && (
                    <>
                      <MdLoop className="animate-spin h-4 w-4" />
                      <p>Uploading ...</p>
                    </>
                  )}
                  {!isUploading && file && (
                    <>
                      <MdUpload className="w-4 h-4" />
                      <p>Change PDF</p>
                    </>
                  )}

                  {!isUploading && !file && (
                    <>
                      <MdUpload className="w-4 h-4" />
                      <p>Upload PDF</p>
                    </>
                  )}
                  <input
                    disabled={isUploading}
                    type="file"
                    accept="application/pdf"
                    onChange={(event) => setFile(event.target.files![0])}
                    className="hidden"
                  />
                </label>
                {!isUploading && (
                  <p className="text-extrasmall text-mblue-500">(max. 50MB)</p>
                )}
              </div>
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
