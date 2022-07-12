import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import EditMeetingPage from "../../components/pages/EditMeetingPage";
import {
  deleteMeeting,
  fetchSingleMeeting,
  updateMeetingDetails,
} from "../../lib/supabase/meetings";
import { convertStringsToDate } from "../../utils/functions";
import { Meeting } from "../../utils/types";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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

const EditMeeting: NextPage = ({ meeting }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  if (!meeting) {
    return <LoadingScreen />;
  }

  return (
    <EditMeetingPage
      meetingData={meeting}
      onSave={async (updatedMeeting) => {
        const newMeeting: Meeting = {
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
