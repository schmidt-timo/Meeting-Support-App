import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { meetingHasStarted } from "../../utils/functions";
import {
  DatabaseMeeting,
  Meeting,
  MeetingAgendaStatus,
} from "../../utils/types";
import { getServiceSupabase, supabase } from "./config";
import { updateMeetingDetails } from "./meetings";

export const useMeetingStatus = (meeting: Meeting) => {
  const [notStartedYet, setNotStartedYet] = useState(false);
  const [agendaStatus, setAgendaStatus] = useState<MeetingAgendaStatus>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    function checkIfMeetingHasStarted() {
      if (meetingHasStarted(new Date(meeting.startDate))) {
        setNotStartedYet(false);
        clearInterval(checkInterval);
      } else {
        setNotStartedYet(true);
      }
      setIsLoading(false);
    }

    if (!meetingHasStarted(new Date(meeting.startDate))) {
      // check every second until meeting start time is reached
      var checkInterval = setInterval(checkIfMeetingHasStarted, 1000);
    } else {
      setNotStartedYet(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgendaStatus(meeting.id)
      .then((res) => {
        if (!res.agendaStatus) {
        }
        if (Object.keys(res.agendaStatus).length === 0) {
          // is empty = was never created
          updateAgendaStatus(meeting.id, {
            currentItemIndex: 0,
            startedAt: new Date(meeting.startDate),
          }).then((data) => {
            setAgendaStatus(data.agendaStatus);
          });
        }
        if (Object.keys(res.agendaStatus).length > 0) {
          // was created before
          setAgendaStatus(res.agendaStatus);
        }
      })
      .catch((error) => {
        if (error.message === "isNull") {
          updateAgendaStatus(meeting.id, {
            currentItemIndex: 0,
            startedAt: meeting.startDate,
          });
        }
      });

    const supabaseServer = getServiceSupabase();

    const meetingSubscription = supabaseServer
      .from("meetings")
      .on("*", (payload) => {
        setAgendaStatus(payload.new.agendaStatus);

        if (
          meeting.startDate.toLocaleString("de-DE") !==
          new Date(payload.new.startDate).toLocaleString("de-DE")
        ) {
          router.reload();
        }
      })
      .subscribe();

    return () => {
      meetingSubscription.unsubscribe();
    };
  }, []);

  const startMeetingNow = async () => {
    const now = new Date();
    const durationInMilliseconds = Math.abs(
      meeting.startDate.getTime() - meeting.endDate.getTime()
    );
    const newMeeting: DatabaseMeeting = {
      ...meeting,
      startDate: now,
      endDate: new Date(now.getTime() + durationInMilliseconds),
    };

    const { data, error } = await updateMeetingDetails(newMeeting);

    if (error) {
      throw error;
    }

    if (data) {
      updateAgendaStatus(meeting.id, {
        currentItemIndex: 0,
        startedAt: now,
      });
    }
  };

  return {
    agendaStatus,
    notStartedYet,
    isLoading,
    startMeetingNow,
  };
};

export const fetchAgendaStatus = async (meetingId: string) => {
  const { data, error } = await supabase
    .from("meetings")
    .select("agendaStatus")
    .eq("id", meetingId)
    .single();

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
};

export const updateAgendaStatus = async (
  meetingId: string,
  newStatus: MeetingAgendaStatus
) => {
  const { data, error } = await supabase
    .from("meetings")
    .update({
      agendaStatus: {
        currentItemIndex: newStatus.currentItemIndex,
        startedAt: newStatus.startedAt,
        currentPresentationPage: newStatus.currentPresentationPage,
      },
    })
    .eq("id", meetingId)
    .single();

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
};
