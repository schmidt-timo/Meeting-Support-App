import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/formElements/Button";
import Input from "../../components/formElements/Input";
import Label from "../../components/formElements/Label";
import LabelInputWrapper from "../../components/formElements/LabelInputWrapper";
import Textarea from "../../components/formElements/Textarea";
import SubviewBuilder from "../../components/SubviewBuilder/SubviewBuilder";

type Inputs = {
  meetingTitle: string;
  meetingStartDate: Date;
  meetingEndDate: Date;
  meetingStartTime: Date;
  meetingEndTime: Date;
  meetingLocation: string;
  meetingDescription: string;
  meetingAgenda: [];
  meetingParticipants: [];
};

const CreateMeeting: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SubviewBuilder title="Create meeting" backButtonPath="/">
        <div className="space-y-3 pb-3">
          <LabelInputWrapper>
            <Label mandatory>Meeting title</Label>
            <Input placeholder="Meeting title" {...register("meetingTitle")} />
          </LabelInputWrapper>
          <LabelInputWrapper sideBySide>
            <span className="w-full space-y-1">
              <Label mandatory>Start Date</Label>
              <Input type="date" {...register("meetingStartDate")} />
            </span>
            <span className="w-full space-y-1">
              <Label mandatory>Start time</Label>
              <Input type="time" {...register("meetingStartTime")} />
            </span>
          </LabelInputWrapper>
          <LabelInputWrapper sideBySide>
            <span className="w-full space-y-1">
              <Label mandatory>End Date</Label>
              <Input type="date" {...register("meetingEndDate")} />
            </span>
            <span className="w-full space-y-1">
              <Label mandatory>End time</Label>
              <Input type="time" {...register("meetingEndTime")} />
            </span>
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>Meeting location</Label>
            <Input
              placeholder="Meeting room"
              {...register("meetingLocation")}
            />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>Short description</Label>
            <Textarea text="Meeting description" />
          </LabelInputWrapper>
          <Button onClick={() => router.push("/meeting/manageAgenda")}>
            Manage agenda
          </Button>
          <Button onClick={() => router.push("/meeting/manageParticipants")}>
            Manage participants
          </Button>
        </div>
        <div>
          <button
            className="w-full rounded-xl text-white font-medium px-3 py-2 outline-0 bg-gray-700 hover:bg-black"
            type="submit"
          >
            Create
          </button>
        </div>
      </SubviewBuilder>
    </form>
  );
};

export default CreateMeeting;
