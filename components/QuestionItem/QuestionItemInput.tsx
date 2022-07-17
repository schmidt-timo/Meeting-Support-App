import { useForm } from "react-hook-form";
import { ERROR_MESSAGES } from "../../utils/constants";
import Button from "../formElements/Button";
import ErrorMessage from "../formElements/ErrorMessage";
import Input from "../formElements/Input";
import Label from "../formElements/Label";
import LabelInputWrapper from "../formElements/LabelInputWrapper";

type QuestionInputs = {
  question: string;
};

type Props = {
  onAdd: (question: string) => void;
};

const QuestionItemInput = ({ onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestionInputs>({
    criteriaMode: "all",
    mode: "onChange",
  });
  const onSubmit = (data: QuestionInputs) => {
    onAdd(data.question);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LabelInputWrapper>
        <Label>Add new question</Label>
        <Input
          autoFocus
          placeholder="Your question here?"
          {...register("question", {
            required: ERROR_MESSAGES.IS_REQUIRED,
          })}
        />
        <ErrorMessage fieldName="question" errors={errors} />

        <Button type="submit" variant="highlighted">
          Add question
        </Button>
      </LabelInputWrapper>
    </form>
  );
};

export default QuestionItemInput;
