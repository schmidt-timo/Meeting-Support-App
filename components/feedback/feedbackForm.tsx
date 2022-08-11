import { useForm } from "react-hook-form";
import {
  MdOutlineSentimentDissatisfied,
  MdOutlineSentimentNeutral,
  MdOutlineSentimentSatisfied,
  MdThumbDownOffAlt,
  MdThumbUpOffAlt,
} from "react-icons/md";
import {
  ERROR_MESSAGES,
  MEETING_FEEDBACK_QUESTIONS,
} from "../../utils/constants";
import Button from "../formElements/Button";
import ErrorMessage from "../formElements/ErrorMessage";
import Textarea from "../formElements/Textarea";

type FeedbackInputs = {
  question1: string;
  question2: string;
  question3: string;
};

type Props = {
  onSubmitFeedback: (data: FeedbackInputs) => void;
};

const FeedbackForm = ({ onSubmitFeedback }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FeedbackInputs>({
    mode: "onChange",
  });

  const onSubmit = (data: FeedbackInputs) => {
    onSubmitFeedback(data);
  };

  const { question1, question2, question3 } = watch();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full flex flex-col justify-between desktop:justify-start space-y-3"
    >
      <div className="space-y-3">
        <FeedbackQuestion
          currentValue={question1}
          question={`${MEETING_FEEDBACK_QUESTIONS[0]} *`}
          responseType="emojis"
          register={{
            ...register("question1", {
              required: ERROR_MESSAGES.IS_REQUIRED,
            }),
          }}
        />
        <ErrorMessage fieldName="question1" errors={errors} />
        <FeedbackQuestion
          currentValue={question2}
          question={`${MEETING_FEEDBACK_QUESTIONS[1]} *`}
          responseType="yesNo"
          register={{
            ...register("question2", {
              required: ERROR_MESSAGES.IS_REQUIRED,
            }),
          }}
        />
        <ErrorMessage fieldName="question2" errors={errors} />
        <FeedbackQuestion
          currentValue={question3}
          question={MEETING_FEEDBACK_QUESTIONS[2]}
          responseType="text"
          register={{ ...register("question3") }}
        />
      </div>
      <Button type="submit" variant="highlighted">
        Submit feedback
      </Button>
    </form>
  );
};

export default FeedbackForm;

type FeedbackQuestionProps = {
  currentValue: string;
  question: string;
  responseType: "text" | "emojis" | "yesNo";
  register: any;
};

const FeedbackQuestion = ({
  currentValue,
  question,
  responseType,
  register,
}: FeedbackQuestionProps) => {
  return (
    <div className="bg-white rounded-xl p-3 font-medium text-center text-mblue-500">
      <p>{question}</p>
      {responseType === "emojis" && (
        <div className="w-full pt-3">
          <fieldset className="flex space-x-5 items-center justify-center text-mblue-500">
            <label>
              <MdOutlineSentimentSatisfied
                className={`w-14 h-14 cursor-pointer ${
                  currentValue === "good" && "text-green-500"
                }`}
              />
              <input
                {...register}
                type="radio"
                value="good"
                className="hidden"
              />
            </label>
            <label>
              <MdOutlineSentimentNeutral
                className={`w-14 h-14 cursor-pointer ${
                  currentValue === "neutral" && "text-green-500"
                }`}
              />
              <input
                {...register}
                type="radio"
                value="neutral"
                className="hidden"
              />
            </label>
            <label>
              <MdOutlineSentimentDissatisfied
                className={`w-14 h-14 cursor-pointer ${
                  currentValue === "bad" && "text-green-500"
                }`}
              />
              <input
                {...register}
                type="radio"
                value="bad"
                className="hidden"
              />
            </label>
          </fieldset>
        </div>
      )}
      {responseType === "yesNo" && (
        <div className="w-full flex items-center justify-center space-x-5 pt-3 text-mblue-500">
          <label>
            <MdThumbUpOffAlt
              className={`w-14 h-14 cursor-pointer ${
                currentValue === "yes" && "text-green-500"
              }`}
            />
            <input {...register} type="radio" value="yes" className="hidden" />
          </label>

          <label>
            <MdThumbDownOffAlt
              className={`w-14 h-14 cursor-pointer ${
                currentValue === "no" && "text-green-500"
              }`}
            />
            <input {...register} type="radio" value="no" className="hidden" />
          </label>
        </div>
      )}
      {responseType === "text" && (
        <div className="pt-3">
          <Textarea {...register} />
        </div>
      )}
    </div>
  );
};
