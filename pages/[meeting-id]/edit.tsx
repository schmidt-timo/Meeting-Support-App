import type { NextPage } from "next";
import { useRouter } from "next/router";
import NewMeetingPage, {
  NewMeetingInputs,
} from "../../components/views/NewMeetingPage";
import { exampleMeetings } from "../../utils/exampleData";
import { Meeting } from "../../utils/types";

const EditMeeting: NextPage = () => {
  const router = useRouter();
  // TODO: Pass data over
  const meeting: Meeting = exampleMeetings[0];
  const meetingData: NewMeetingInputs = {
    meetingTitle: meeting.title,
    meetingStartDate: meeting.startDate.toISOString().split("T")[0],
    meetingEndDate: meeting.endDate.toISOString().split("T")[0],
    meetingStartTime: meeting.startDate.toISOString().split("T")[1],
    meetingEndTime: meeting.endDate.toISOString().split("T")[1],
    meetingLocation: meeting.location ?? "",
    meetingDescription: meeting.description ?? "",
  };

  return (
    <NewMeetingPage
      meetingData={meetingData}
      buttonText="Save"
      onNext={(data) => {
        const editedMeeting: Meeting = {
          id: meeting.id,
          title: meetingData!!.meetingTitle,
          startDate: new Date(
            `${meetingData!!.meetingStartDate}T${
              meetingData!!.meetingStartTime
            }`
          ),
          endDate: new Date(
            `${meetingData!!.meetingEndDate}T${meetingData!!.meetingEndTime}`
          ),
          location: meetingData?.meetingLocation,
          description: meetingData?.meetingDescription,
          createdBy: meeting.createdBy,
          completed: false,
          agenda: meeting.agenda,
          participants: meeting.participants,
        };
        //TODO: Replace meeting object in database
        router.push("/");
      }}
      onClose={() => router.push("/")}
    />
  );
};

export default EditMeeting;
