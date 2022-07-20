import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import EditMeetingPage from "../../components/pages/meetings/EditMeetingPage";
import {
  deleteMeeting,
  fetchSingleMeeting,
  updateMeetingDetails,
} from "../../lib/supabase/meetings";
import { convertStringsToDate } from "../../utils/functions";
import { DatabaseMeeting, Meeting } from "../../utils/types";

interface Params extends ParsedUrlQuery {
  meetingId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params as Params;

  const { data: meeting, error } = await fetchSingleMeeting(params.meetingId);

  if (error) {
    throw error;
  }

  return {
    props: {
      meeting: meeting,
    },
  };
};

type Props = {
  meeting: Meeting;
};

const EditMeeting: NextPage<Props> = ({ meeting }) => {
  const router = useRouter();

  if (!meeting) {
    return <LoadingScreen />;
  }

  return (
    <EditMeetingPage
      meetingData={meeting}
      onSave={async (updatedMeeting) => {
        const newMeeting: DatabaseMeeting = {
          ...meeting,
          title: updatedMeeting!!.title,
          startDate: convertStringsToDate(
            updatedMeeting!!.startDate,
            updatedMeeting!!.startTime
          ),
          endDate: convertStringsToDate(
            updatedMeeting!!.endDate,
            updatedMeeting!!.endTime
          ),
          location: updatedMeeting?.location,
          description: updatedMeeting?.description,
        };

        const { data, error } = await updateMeetingDetails(newMeeting);

        if (error) {
          throw error;
        }

        if (data) {
          router.push("/");
        }
      }}
      onClose={() => router.push("/")}
      onDelete={async () => {
        const { data, error } = await deleteMeeting(meeting.id);

        if (error) {
          throw error;
        }

        if (data) {
          router.push("/");
        }
      }}
    />
  );
};

export default EditMeeting;
