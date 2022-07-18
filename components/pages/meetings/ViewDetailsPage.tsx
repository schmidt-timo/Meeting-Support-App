import { useState, useEffect } from "react";
import { getParticipantInfoIfEmailIsRegistered } from "../../../lib/supabase/users";
import {
  formatMeetingDate,
  formatMeetingTime,
} from "../../../utils/formatting";
import { isTheSameDay } from "../../../utils/functions";
import { Meeting, MeetingParticipant } from "../../../utils/types";
import Accordion from "../../Accordion/Accordion";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import DetailsAgendaItem from "../../MeetingDetails/DetailsAgendaItem";
import DetailsLine from "../../MeetingDetails/DetailsLine";
import DetailsParticipantItem from "../../MeetingDetails/DetailsParticipantItem";
import SubPageLayout from "../layouts/SubPageLayout";

type Props = {
  userId: string;
  meeting: Meeting;
  meetingCreator: any;
  onClose: () => void;
};

const ViewDetailsPage = ({
  meeting: initialMeeting,
  onClose,
  meetingCreator,
}: Props) => {
  // Fix dates
  const meeting = {
    ...initialMeeting,
    startDate: new Date(initialMeeting.startDate),
    endDate: new Date(initialMeeting.endDate),
  };

  const [isLoading, setIsLoading] = useState(true);
  const [participants, setParticipants] = useState<MeetingParticipant[]>(
    meeting.participants
  );

  useEffect(() => {
    async function checkParticipants(): Promise<MeetingParticipant[]> {
      return new Promise(async (resolve, reject) => {
        let temp: MeetingParticipant[] = [];
        for (const p of meeting.participants) {
          const { data, error } = await getParticipantInfoIfEmailIsRegistered(
            p.email
          );

          if (error) {
            temp = [...temp, p];
          }

          if (data) {
            temp = [...temp, data];
          }
        }
        resolve(temp);
      });
    }

    // check if participants are already registered
    checkParticipants().then((p) => {
      setParticipants(p);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SubPageLayout title={meeting.title} onClose={onClose}>
      <div className="space-y-3">
        <div className="w-full">
          <Accordion title="General info">
            <div className="p-2 space-y-1 bg-white rounded-xl">
              {isTheSameDay(meeting.startDate, meeting.endDate) ? (
                <>
                  <DetailsLine symbol="date">
                    {formatMeetingDate(meeting.startDate)}
                  </DetailsLine>
                  <DetailsLine symbol="time">
                    {formatMeetingTime(meeting.startDate, meeting.endDate)}
                  </DetailsLine>
                </>
              ) : (
                <>
                  <DetailsLine symbol="date">
                    {`from ${formatMeetingDate(meeting.startDate)}`}
                  </DetailsLine>
                  <DetailsLine symbol="time">
                    {meeting.startDate.toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </DetailsLine>
                  <DetailsLine symbol="date">
                    {`to ${formatMeetingDate(meeting.endDate)}`}
                  </DetailsLine>
                  <DetailsLine symbol="time">
                    {meeting.endDate.toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </DetailsLine>
                </>
              )}
              {meeting.location && (
                <DetailsLine symbol="location">{meeting.location}</DetailsLine>
              )}
              <DetailsLine symbol="author">
                <p>
                  {`Created by ${
                    meetingCreator.name
                      ? meetingCreator.name
                      : `user with email address ${meetingCreator.email}`
                  }`}
                </p>
                {meetingCreator.name && (
                  <p className="text-xs text-gray-500">
                    ({meetingCreator.email})
                  </p>
                )}
              </DetailsLine>
            </div>
          </Accordion>
        </div>
        {meeting.description && (
          <Accordion title="Description">
            <div className="w-full rounded-xl p-3 bg-white space-y-1">
              <p className="text-xs">{meeting.description}</p>
            </div>
          </Accordion>
        )}
        <Accordion title="Participants">
          <div className="space-y-1.5">
            {participants.map((p) => (
              <DetailsParticipantItem participant={p} key={p.id} />
            ))}
          </div>
        </Accordion>
        {meeting.agenda.length < 0 && (
          <Accordion title="Agenda">
            <div className="space-y-1.5">
              {meeting.agenda?.map((item) => (
                <DetailsAgendaItem agendaItem={item} key={item.id} />
              ))}
            </div>
          </Accordion>
        )}
      </div>
    </SubPageLayout>
  );
};

export default ViewDetailsPage;
