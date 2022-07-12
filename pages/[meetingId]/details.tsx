import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ViewDetailsPage from "../../components/pages/ViewDetailsPage";
import { useAuth } from "../../lib/auth";
import { supabase } from "../../lib/supabase/config";
import { fetchSingleMeeting } from "../../lib/supabase/meetings";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data: meeting, error } = await fetchSingleMeeting(params.meetingId);

  const { data: meetingCreator, error: meetingCreatorError } = await supabase
    .from("existing_users")
    .select("*")
    .eq("id", meeting.createdBy)
    .single();

  if (error) {
    throw error;
  }

  return {
    props: {
      meeting: meeting,
      meetingCreator,
    },
  };
};

const EditMeeting: NextPage = ({ meeting, meetingCreator }) => {
  const router = useRouter();
  const { user } = useAuth();

  if (!meeting || !meetingCreator) {
    return <LoadingScreen />;
  }

  return (
    <ViewDetailsPage
      userId={user!.id}
      meetingCreator={meetingCreator}
      meeting={meeting}
      onClose={() => router.push("/")}
    />
  );
};

export default EditMeeting;
