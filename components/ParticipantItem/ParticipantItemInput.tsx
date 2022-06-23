import { useForm } from "react-hook-form";
import { MeetingParticipant } from "../../utils/types";
import Button from "../formElements/Button";
import Input from "../formElements/Input";
import Label from "../formElements/Label";
import LabelInputWrapper from "../formElements/LabelInputWrapper";
import { v4 as uuid } from "uuid";
import { validateEmailRegex } from "../../utils/regex";

type ParticipantInputs = {
  participantEmail: string;
};

type Props = {
  onAdd: (participant: MeetingParticipant) => void;
};

const ParticipantItemInput = ({ onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParticipantInputs>();
  const onSubmit = (data: ParticipantInputs) => {
    const participant: MeetingParticipant = {
      id: uuid(),
      email: data.participantEmail,
    };
    onAdd(participant);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LabelInputWrapper>
        <Label>Add new participant</Label>
        <Input
          placeholder="Email address*"
          {...register("participantEmail", {
            required: true,
            pattern: {
              value: validateEmailRegex, // TODO: Geht nicht mit Umlauten
              message: "This is not an email address",
            },
          })}
        />
        {
          errors.participantEmail && <p>This is not an email adress</p>
          // TODO: Change
        }
        <Button type="submit">Add participant</Button>
      </LabelInputWrapper>
    </form>
  );
};

export default ParticipantItemInput;
