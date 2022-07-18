import { MdOutlineClose, MdOutlineDone, MdThumbUp } from "react-icons/md";
import { formatUpvoteText } from "../../utils/formatting";
import { MeetingQuestion } from "../../utils/types";

type Props = {
  meetingQuestion: MeetingQuestion;
};

const QuestionViewItem = ({ meetingQuestion }: Props) => {
  return (
    <div className="flex flex-col justify-between py-2 px-3 pt-2.5 bg-white rounded-xl max-h-question">
      <div className="flex space-x-2 items-center text-sm font-medium truncate-3-lines">
        {meetingQuestion.question}
      </div>
      <div>
        <div className="flex space-x-1 justify-start pt-3">
          <div className="flex items-center space-x-1.5 py-1 px-2 font-medium text-xs">
            <MdThumbUp className="w-3 h-3 flex-shrink-0" />
            <p>{formatUpvoteText(meetingQuestion.upvotes)}</p>
          </div>
          <button className="flex items-center space-x-1.5 py-1 px-2 font-medium text-xs">
            {meetingQuestion.answered ? (
              <MdOutlineDone className="w-4 h-4 flex-shrink-0 text-green-500" />
            ) : (
              <MdOutlineClose className="w-4 h-4 flex-shrink-0 text-red-500" />
            )}

            {meetingQuestion.answered ? (
              <p className="text-green-500">was marked as answered</p>
            ) : (
              <p className="text-red-500">was not marked as answered</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionViewItem;
