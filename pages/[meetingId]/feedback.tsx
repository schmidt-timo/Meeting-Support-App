import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import {
  MdOutlineSentimentDissatisfied,
  MdOutlineSentimentNeutral,
  MdOutlineSentimentSatisfied,
  MdThumbDownOffAlt,
  MdThumbUpOffAlt,
} from "react-icons/md";
import FeedbackViewItem from "../../components/feedback/FeedbackViewItem";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import SubPageLayout from "../../components/pages/layouts/SubPageLayout";
import {
  fetchFeedbackForMeeting,
  fetchSingleMeeting,
} from "../../lib/supabase/meetings";
import { MEETING_FEEDBACK_QUESTIONS } from "../../utils/constants";
import {
  mapNotEmptyResponses,
  mapEmojisToResponses,
  mapFeedbackToQuestions,
  mapYesNoToResponses,
} from "../../utils/functions";
import { Meeting, MeetingFeedback } from "../../utils/types";

interface Params extends ParsedUrlQuery {
  meetingId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params as Params;

  const { data: meeting, error } = await fetchSingleMeeting(params.meetingId);

  if (error) {
    throw error;
  }

  const { data: feedback, error: feedbackError } =
    await fetchFeedbackForMeeting(params.meetingId);

  if (feedbackError) {
    throw feedbackError;
  }

  return {
    props: {
      meeting,
      feedback,
    },
  };
};

type Props = {
  meeting: Meeting;
  feedback: MeetingFeedback[];
};

const FeedbackPage: NextPage<Props> = ({ meeting, feedback }) => {
  const router = useRouter();

  if (!meeting || !feedback) {
    return <LoadingScreen />;
  }

  const mappedFeedback = mapFeedbackToQuestions(feedback);
  const emojis = mapEmojisToResponses(mappedFeedback[0]);
  const yesNo = mapYesNoToResponses(mappedFeedback[1]);
  const comments = mapNotEmptyResponses(mappedFeedback[2]);

  return (
    <SubPageLayout
      title="Feedback Report"
      onClose={() => router.push("/reports")}
    >
      {!!feedback.length ? (
        <div className="space-y-5">
          <FeedbackViewItem question={MEETING_FEEDBACK_QUESTIONS[0]}>
            <div className="flex items-center justify-between space-x-2">
              <span className="w-full py-4 px-3 bg-white rounded-xl text-sm flex items-center justify-center space-x-2 text-base font-medium">
                <MdOutlineSentimentSatisfied className="w-6 h-6" />
                <p>{emojis.good}</p>
              </span>
              <span className="w-full py-4 px-3 bg-white rounded-xl text-sm flex items-center justify-center space-x-2 text-base font-medium">
                <MdOutlineSentimentNeutral className="w-6 h-6" />
                <p>{emojis.neutral}</p>
              </span>
              <span className="w-full py-4 px-3 bg-white rounded-xl text-sm flex items-center justify-center space-x-2 text-base font-medium">
                <MdOutlineSentimentDissatisfied className="w-6 h-6" />
                <p>{emojis.bad}</p>
              </span>
            </div>
          </FeedbackViewItem>
          <FeedbackViewItem question={MEETING_FEEDBACK_QUESTIONS[1]}>
            <div className="flex items-center justify-between space-x-2">
              <span className="w-full py-4 px-3 bg-white rounded-xl text-sm flex items-center justify-center space-x-2 text-base font-medium">
                <MdThumbUpOffAlt className="w-6 h-6" />
                <p>{yesNo.yes}</p>
              </span>
              <span className="w-full py-4 px-3 bg-white rounded-xl text-sm flex items-center justify-center space-x-2 text-base font-medium">
                <MdThumbDownOffAlt className="w-6 h-6" />
                <p>{yesNo.no}</p>
              </span>
            </div>
          </FeedbackViewItem>
          <FeedbackViewItem question={MEETING_FEEDBACK_QUESTIONS[2]}>
            {!!comments.length ? (
              <span className="space-y-2">
                {comments.map((response) => (
                  <div
                    key={response.id}
                    className="p-3 bg-white rounded-xl text-sm"
                  >
                    <p className="whitespace-pre-wrap">{response.response}</p>
                  </div>
                ))}
              </span>
            ) : (
              <div className="p-3 bg-white rounded-xl text-sm w-full">
                No comments available
              </div>
            )}
          </FeedbackViewItem>
        </div>
      ) : (
        <p>No feedback available yet</p>
      )}
    </SubPageLayout>
  );
};

export default FeedbackPage;
