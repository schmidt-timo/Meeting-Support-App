import { useForm } from "react-hook-form";
import { Meeting } from "../../utils/types";
import Button from "../formElements/Button";
import Input from "../formElements/Input";
import Label from "../formElements/Label";
import LabelInputWrapper from "../formElements/LabelInputWrapper";
import Textarea from "../formElements/Textarea";
import SubviewBuilder from "../SubviewBuilder/SubviewBuilder";

type CreateMeetingInputs = {
  meetingTitle: string;
  meetingStartDate: string;
  meetingEndDate: string;
  meetingStartTime: string;
  meetingEndTime: string;
  meetingLocation: string;
  meetingDescription: string;
};

type Props = {
  onManageAgenda: () => void;
  onManageParticipants: () => void;
  onCreateMeeting: (meeting: Meeting) => void;
  onClose: () => void;
};

const CreateMeetingPage = ({
  onManageAgenda,
  onManageParticipants,
  onCreateMeeting,
  onClose,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateMeetingInputs>();
  const onSubmit = (data: CreateMeetingInputs) => {
    console.log(data);
    const meeting: Meeting = {
      id: "string",
      title: "",
      startDate: new Date(),
      endDate: new Date(),
      location: "string",
      createdBy: "timoschmidt",
      completed: false,
    };
    onCreateMeeting(meeting);
  };
  const { meetingStartDate, meetingStartTime } = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SubviewBuilder title="Create Meeting" onClose={onClose}>
        <div className="space-y-3 pb-3">
          <LabelInputWrapper>
            <Label mandatory>Meeting title</Label>
            <Input
              placeholder="Meeting title"
              {...register("meetingTitle", { required: true })}
            />
          </LabelInputWrapper>
          <LabelInputWrapper sideBySide>
            <span className="w-full space-y-1">
              <Label mandatory>Start Date</Label>
              <Input
                type="date"
                {...register("meetingStartDate", { required: true })}
              />
            </span>
            <span className="w-full space-y-1">
              <Label mandatory>Start time</Label>
              <Input
                type="time"
                {...register("meetingStartTime", { required: true })}
              />
            </span>
          </LabelInputWrapper>
          <LabelInputWrapper sideBySide>
            <span className="w-full space-y-1">
              <Label mandatory>End Date</Label>
              <Input
                type="date"
                defaultValue={meetingStartDate}
                {...register("meetingEndDate", { required: true })}
              />
            </span>
            <span className="w-full space-y-1">
              <Label mandatory>End time</Label>
              <Input
                type="time"
                defaultValue={meetingStartTime}
                {...register("meetingEndTime", { required: true })}
              />
            </span>
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>Meeting location</Label>
            <Input
              placeholder="e.g. meeting room"
              {...register("meetingLocation")}
            />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>Short description</Label>
            <Textarea
              placeholder="Meeting description"
              {...register("meetingDescription")}
            />
          </LabelInputWrapper>
          <Button onClick={onManageAgenda}>Manage agenda</Button>
          <Button onClick={onManageParticipants}>Manage participants</Button>
        </div>
        <div>
          <Button highlighted type="submit">
            Create
          </Button>
        </div>
      </SubviewBuilder>
    </form>
  );
};

export default CreateMeetingPage;
