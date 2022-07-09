import { useForm } from "react-hook-form";
import { MeetingParticipant } from "../../utils/types";
import Button from "../formElements/Button";
import Input from "../formElements/Input";
import Label from "../formElements/Label";
import LabelInputWrapper from "../formElements/LabelInputWrapper";
import { validateEmailRegex } from "../../utils/regex";
import { generateRandomID } from "../../utils/functions";
import { ERROR_MESSAGES } from "../../utils/constants";
import ErrorMessage from "../formElements/ErrorMessage";
import NotificationLabel from "../formElements/NotificationLabel";

type ParticipantInputs = {
  email: string;
};

type Props = {
  errorMessage?: string;
  onAdd: (participant: MeetingParticipant) => void;
};

const ParticipantItemInput = ({ errorMessage, onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParticipantInputs>();
  const onSubmit = (data: ParticipantInputs) => {
    const participant: MeetingParticipant = {
      id: generateRandomID(),
      email: data.email,
    };
    onAdd(participant);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LabelInputWrapper>
        <Label>Add new participant</Label>
        <Input
          placeholder="example@domain.com"
          {...register("email", {
            required: ERROR_MESSAGES.IS_REQUIRED,
            validate: {
              isEmailAddress: (v) =>
                validateEmailRegex.test(v) || ERROR_MESSAGES.NOT_EMAIL_REGEX,
            },
          })}
        />
        <ErrorMessage fieldName="email" errors={errors} />
        {!!errorMessage?.length && (
          <NotificationLabel>{errorMessage}</NotificationLabel>
        )}
        <Button type="submit">Add participant</Button>
      </LabelInputWrapper>
    </form>
  );
};

export default ParticipantItemInput;
