import { MdOutlineClose, MdOutlineDone, MdThumbUp } from "react-icons/md";
import { formatUpvoteText } from "../../utils/formatting";
import { MeetingQuestion } from "../../utils/types";

type Props = {
  meetingQuestion: MeetingQuestion;
  onUpvote?: () => void;
  onMarkAsAnswered?: () => void;
  upvoted?: boolean;
  isDesktop?: boolean;
};

const QuestionItem = ({
  meetingQuestion,
  onUpvote,
  onMarkAsAnswered,
  upvoted,
  isDesktop,
}: Props) => {
  return (
    <div className="flex flex-col justify-between p-3 pt-2.5 bg-white rounded-xl max-h-question">
      <div className="flex space-x-2 items-center text-sm font-medium truncate-3-lines text-mblue-600">
        {meetingQuestion.question}
      </div>
      <div>
        <div className="flex space-x-2 justify-end pt-3">
          {onUpvote ? (
            <button
              onClick={onUpvote}
              className={`flex items-center space-x-1.5 py-1 px-2 font-medium rounded-xl 
              ${isDesktop ? "text-extrasmall" : "text-xs"}
              ${
                upvoted
                  ? "bg-mblue-600 text-white"
                  : "bg-mblue-200 bg-opacity-60 text-mblue-600"
              }`}
            >
              <MdThumbUp className="w-3 h-3 flex-shrink-0" />
              <p>{formatUpvoteText(meetingQuestion.upvotes)}</p>
            </button>
          ) : (
            <div className="flex items-center space-x-1.5 py-1 px-2 font-medium text-xs text-mblue-600">
              <MdThumbUp className="w-3 h-3 flex-shrink-0" />
              <p>{formatUpvoteText(meetingQuestion.upvotes)}</p>
            </div>
          )}
          {onMarkAsAnswered ? (
            <button
              onClick={onMarkAsAnswered}
              className={`flex items-center space-x-1.5 py-1 px-2 font-medium bg-mblue-200 bg-opacity-60 text-mblue-600 rounded-xl ${
                isDesktop ? "text-extrasmall" : "text-xs"
              }`}
            >
              {meetingQuestion.answered ? (
                <MdOutlineClose className="w-3.5 h-3.5 flex-shrink-0" />
              ) : (
                <MdOutlineDone className="w-3.5 h-3.5 flex-shrink-0" />
              )}
              <p>
                {meetingQuestion.answered
                  ? "mark as not answered"
                  : "mark as answered"}
              </p>
            </button>
          ) : (
            <button className="flex items-center space-x-1.5 py-1 px-2 font-medium text-xs">
              {meetingQuestion.answered ? (
                <MdOutlineDone className="w-4 h-4 flex-shrink-0 text-green-500" />
              ) : (
                <MdOutlineClose className="w-4 h-4 flex-shrink-0 text-red-500" />
              )}

              {meetingQuestion.answered ? (
                <p className="text-green-500">was marked as answered</p>
              ) : (
                <p className="text-red-500">was marked as unanswered</p>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
