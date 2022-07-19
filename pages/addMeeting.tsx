import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import Button from "../components/formElements/Button";
import Input from "../components/formElements/Input";
import Label from "../components/formElements/Label";
import LabelInputWrapper from "../components/formElements/LabelInputWrapper";
import NotificationLabel from "../components/formElements/NotificationLabel";
import SubPageLayout from "../components/pages/layouts/SubPageLayout";
import { useAuth } from "../lib/auth";
import { updateParticipants } from "../lib/supabase/meeting";
import { fetchSingleMeeting } from "../lib/supabase/meetings";
import {
  convertParticipantsForDatabase,
  generateRandomID,
  is10MinutesBeforeMeetingOrLater,
  isMeetingId,
} from "../utils/functions";
import { Meeting, MeetingParticipant } from "../utils/types";

const AddMeeting: NextPage = () => {
  const router = useRouter();
  const [meetingId, setMeetingId] = useState("");
  const [qrResult, setQrResult] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { user } = useAuth();

  const addParticipantToMeeting = async () => {
    const { data, error } = await fetchSingleMeeting(meetingId);

    if (data) {
      const meeting: Meeting = data;
      const participants: MeetingParticipant[] = meeting.participants;
      // check if you are already participating
      const participantAlreadyExists =
        participants.findIndex((pa) => pa.email === user!.email!) !== -1;

      if (participantAlreadyExists) {
        setErrorMessage("You are already participating in this meeting");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else {
        // add own ID to participants list and go back
        const newParticipants: MeetingParticipant[] = [
          ...participants,
          {
            id: generateRandomID(),
            email: user!.email!,
          },
        ];

        const convertedParticipants =
          convertParticipantsForDatabase(newParticipants);

        const { data: updateData, error: updateError } =
          await updateParticipants(meetingId, convertedParticipants);
        if (updateData) {
          // if meeting is taking place right now, redirect to it
          if (is10MinutesBeforeMeetingOrLater(new Date(meeting.startDate))) {
            router.push(`${meetingId}/start`);
          }
          // or else show message and redirect to overview page
          else {
            setSuccessMessage(
              "You are now participating in this meeting and will be redirected shortly"
            );
            setTimeout(() => {
              setSuccessMessage("");
              router.push("/");
            }, 4000);
          }
        }

        if (updateError) {
          setErrorMessage("Error: You could not be added to this meeting");
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      }
    }

    if (error) {
      setErrorMessage("A meeting with this ID does not exist");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    // if scanned qr code is a meetingId
    if (isMeetingId(meetingId)) addParticipantToMeeting();
  }, [qrResult]);

  return (
    <SubPageLayout title="Add meeting" onClose={() => router.push("/")}>
      <div className="space-y-5">
        <LabelInputWrapper>
          <Label>Add a meeting by scanning the qr code</Label>
          <div className="rounded-xl">
            <div id="reader" className=""></div>
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  setQrResult(result?.getText());
                  setMeetingId(result?.getText());
                }

                if (!!error) {
                }
              }}
              constraints={{
                facingMode: "environment",
              }}
              videoContainerStyle={{
                backgroundColor: "black",
                borderRadius: "0.75rem",
                width: "100%",
              }}
            />
          </div>
        </LabelInputWrapper>
        <LabelInputWrapper>
          <Label>or enter the Meeting ID manually</Label>
          <Input
            placeholder="Meeting ID"
            value={meetingId}
            onChange={(event) => setMeetingId(event.target.value)}
          />
          {!!errorMessage.length && (
            <NotificationLabel variant="red">{errorMessage}</NotificationLabel>
          )}
          {!!successMessage.length && (
            <NotificationLabel variant="green">
              {successMessage}
            </NotificationLabel>
          )}
        </LabelInputWrapper>
      </div>
      <Button
        variant="highlighted"
        onClick={async () => {
          addParticipantToMeeting();
        }}
      >
        Add meeting
      </Button>
    </SubPageLayout>
  );
};

export default AddMeeting;
