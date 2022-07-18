import { useAuth } from "../../../lib/auth";
import {
  filterAnsweredQuestions,
  filterOpenQuestions,
} from "../../../utils/filtering";
import { MeetingQuestion } from "../../../utils/types";
import Label from "../../formElements/Label";
import LabelInputWrapper from "../../formElements/LabelInputWrapper";
import QuestionItem from "../../QuestionItem/QuestionItem";
import QuestionItemInput from "../../QuestionItem/QuestionItemInput";
import SubPageLayout from "../layouts/SubPageLayout";

type Props = {
  meetingQuestions: MeetingQuestion[];
  onClose: () => void;
  onAddQuestion: (question: string) => void;
  onUpvote: (meetingQuestion: MeetingQuestion) => void;
  onMarkAsAnswered: (meetingQuestion: MeetingQuestion) => void;
};

const ManageQuestions = ({
  meetingQuestions,
  onClose,
  onAddQuestion,
  onUpvote,
  onMarkAsAnswered,
}: Props) => {
  const { user } = useAuth();

  // filter questions
  const openQuestions = filterOpenQuestions(meetingQuestions);
  const answeredQuestions = filterAnsweredQuestions(meetingQuestions);

  return (
    <SubPageLayout title="Questions" onClose={onClose}>
      <div className="space-y-5 pb-5">
        <QuestionItemInput onAdd={onAddQuestion} />
        <div className="space-y-2">
          {!!openQuestions.length && (
            <>
              <Label>{`Open Questions (${openQuestions.length})`}</Label>
              {openQuestions.map((q) => (
                <QuestionItem
                  key={q.id}
                  meetingQuestion={q}
                  onUpvote={() => onUpvote(q)}
                  onMarkAsAnswered={() => onMarkAsAnswered(q)}
                  upvoted={q.upvotes.includes(user!.id)}
                >
                  {q.question}
                </QuestionItem>
              ))}
            </>
          )}
          {!!answeredQuestions.length && (
            <>
              <Label>{`Answered Questions (${answeredQuestions.length})`}</Label>
              {answeredQuestions.map((q) => (
                <QuestionItem
                  key={q.id}
                  meetingQuestion={q}
                  onUpvote={() => onUpvote(q)}
                  onMarkAsAnswered={() => onMarkAsAnswered(q)}
                  upvoted={q.upvotes.includes(user!.id)}
                >
                  {q.question}
                </QuestionItem>
              ))}
            </>
          )}
        </div>
      </div>
    </SubPageLayout>
  );
};

export default ManageQuestions;
