import type { NextPage } from "next";
import { useRouter } from "next/router";
import FeedbackForm from "../../components/feedback/feedbackForm";
import SubPageLayout from "../../components/pages/layouts/SubPageLayout";
import { useAuth } from "../../lib/auth";
import { submitFeedback } from "../../lib/supabase/meetings";
import { MEETING_FEEDBACK_QUESTIONS } from "../../utils/constants";
import { generateRandomID } from "../../utils/functions";

const GiveFeedbackPage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <SubPageLayout
      title="Give Feedback"
      onClose={() => router.push("/reports")}
    >
      <FeedbackForm
        onSubmitFeedback={async (responses) =>
          submitFeedback({
            id: generateRandomID(),
            createdBy: user!.id,
            meetingId: router.query.meetingId as string,
            responses: [
              {
                id: generateRandomID(),
                question: MEETING_FEEDBACK_QUESTIONS[0],
                response: responses.question1,
              },
              {
                id: generateRandomID(),
                question: MEETING_FEEDBACK_QUESTIONS[1],
                response: responses.question2,
              },
              {
                id: generateRandomID(),
                question: MEETING_FEEDBACK_QUESTIONS[2],
                response: responses.question3,
              },
            ],
          })
            .then((data) => {
              if (data) {
                router.push("/reports");
              }
            })
            .catch((error) => {
              throw error;
            })
        }
      />
    </SubPageLayout>
  );
};

export default GiveFeedbackPage;
