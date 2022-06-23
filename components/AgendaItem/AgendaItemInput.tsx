import { useForm } from "react-hook-form";
import { MdCheck, MdClose } from "react-icons/md";
import { generateAgendaItemId } from "../../utils/functions";
import { MeetingAgendaItem } from "../../utils/types";

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
    watch,
    formState: { errors },
  } = useForm<AgendaInputs>();
  const onSubmit = (data: AgendaInputs) => {
    const item: MeetingAgendaItem = {
      id: agendaItem?.id ?? generateAgendaItemId(),
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
          {...register("agendaItemTitle")}
          defaultValue={agendaItem?.title}
        />
        <div className="w-full space-x-2 items-center flex">
          <input
            className="text-sm w-16 border p-0.5"
            placeholder="Duration"
            {...register("agendaItemDuration")}
            defaultValue={agendaItem?.duration}
          />
          <p className="text-sm">min</p>
        </div>
        <textarea
          className="w-full text-xs border p-0.5 resize-none"
          style={{ minHeight: "40px" }}
          placeholder="Description"
          {...register("agendaItemDescription")}
          defaultValue={agendaItem?.description}
        />

        {/* <p className="text-xs">{agendaItem.description}</p> */}

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
