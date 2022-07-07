import { useForm } from "react-hook-form";
import { Meeting } from "../../utils/types";
import Button from "../formElements/Button";
import Input from "../formElements/Input";
import Label from "../formElements/Label";
import LabelInputWrapper from "../formElements/LabelInputWrapper";
import Textarea from "../formElements/Textarea";
import SubviewBuilder from "../SubviewBuilder/SubviewBuilder";

export type NewMeetingInputs = {
  meetingTitle: string;
  meetingStartDate: string;
  meetingEndDate: string;
  meetingStartTime: string;
  meetingEndTime: string;
  meetingLocation: string;
  meetingDescription: string;
};

type Props = {
  meetingData?: NewMeetingInputs;
  buttonText: string;
  onNext: (meetingData: NewMeetingInputs) => void;
  onClose: () => void;
};

const NewMeetingPage = ({
  meetingData,
  buttonText,
  onNext,
  onClose,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewMeetingInputs>();
  const onSubmit = (data: NewMeetingInputs) => {
    onNext(data);
  };
  const { meetingStartDate, meetingStartTime } = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SubviewBuilder title="Create Meeting" onClose={onClose}>
        <div className="space-y-3 pb-3">
          <LabelInputWrapper>
            <Label required>Meeting title</Label>
            <Input
              defaultValue={meetingData?.meetingTitle}
              placeholder="Meeting title"
              {...register("meetingTitle")}
            />
            {errors.meetingTitle && (
              <span className="uppercase text-extrasmall font-medium text-red-500">
                This field is required!
              </span>
            )}
          </LabelInputWrapper>
          <LabelInputWrapper sideBySide>
            <span className="w-full space-y-1">
              <Label required>Start Date</Label>
              <Input
                defaultValue={meetingData?.meetingStartDate}
                type="date"
                {...register("meetingStartDate")}
              />
            </span>
            <span className="w-full space-y-1">
              <Label required>Start time</Label>
              <Input
                defaultValue={meetingData?.meetingStartTime}
                type="time"
                {...register("meetingStartTime")}
              />
            </span>
          </LabelInputWrapper>
          <LabelInputWrapper sideBySide>
            <span className="w-full space-y-1">
              <Label required>End Date</Label>
              <Input
                type="date"
                defaultValue={meetingData?.meetingEndTime ?? meetingStartDate}
                {...register("meetingEndDate")}
              />
            </span>
            <span className="w-full space-y-1">
              <Label required>End time</Label>
              <Input
                type="time"
                defaultValue={meetingData?.meetingEndTime ?? meetingStartTime}
                {...register("meetingEndTime")}
              />
            </span>
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>Meeting location</Label>
            <Input
              defaultValue={meetingData?.meetingLocation}
              placeholder="e.g. meeting room"
              {...register("meetingLocation")}
            />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>Short description</Label>
            <Textarea
              defaultValue={meetingData?.meetingDescription}
              placeholder="Meeting description"
              {...register("meetingDescription")}
            />
          </LabelInputWrapper>
        </div>
        <div>
          <Button highlighted type="submit">
            {buttonText}
          </Button>
        </div>
      </SubviewBuilder>
    </form>
  );
};

export default NewMeetingPage;
