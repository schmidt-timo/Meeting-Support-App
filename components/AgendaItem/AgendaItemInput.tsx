import { useForm } from "react-hook-form";
import { MdCheck, MdClose } from "react-icons/md";
import { ERROR_MESSAGES } from "../../utils/constants";
import { generateRandomID } from "../../utils/functions";
import { validateNumberRegex } from "../../utils/regex";
import { MeetingAgendaItem } from "../../utils/types";
import ErrorMessage from "../formElements/ErrorMessage";

type AgendaInputs = {
  agendaItemTitle: string;
  agendaItemDescription: string;
  agendaItemDuration: number;
};

type Props = {
  agendaItem?: MeetingAgendaItem;
  onSave: (item: MeetingAgendaItem) => void;
  onAbort: () => void;
};

const AgendaItemInput = ({ agendaItem, onSave, onAbort }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgendaInputs>();
  const onSubmit = (data: AgendaInputs) => {
    const item: MeetingAgendaItem = {
      id: agendaItem?.id ?? generateRandomID(),
      title: data.agendaItemTitle,
      duration: data.agendaItemDuration,
      description: data.agendaItemDescription,
    };
    onSave(item);
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
          className="w-full text-xs border p-0.5"
          style={{ minHeight: "40px" }}
          placeholder="Description"
          {...register("agendaItemDescription")}
          defaultValue={agendaItem?.description}
        />
        <div className="space-x-2 flex justify-end pt-2">
          <button
            type="submit"
            className="bg-green-200 rounded-full w-7 h-7 flex justify-center items-center"
          >
            <MdCheck className="text-green-800 h-5 w-5" />
          </button>
          <button
            onClick={() => onAbort()}
            className="bg-red-200 rounded-full w-7 h-7 flex justify-center items-center"
          >
            <MdClose className="text-red-600 h-5 w-5" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default AgendaItemInput;
