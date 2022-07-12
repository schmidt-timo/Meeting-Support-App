import { useState } from "react";
import { useForm } from "react-hook-form";
import { ERROR_MESSAGES } from "../../utils/constants";
import {
  convertStringsToDate,
  dateAsStringIsTodayOrLater,
} from "../../utils/functions";
import Button from "../formElements/Button";
import ErrorMessage from "../formElements/ErrorMessage";
import Input from "../formElements/Input";
import Label from "../formElements/Label";
import LabelInputWrapper from "../formElements/LabelInputWrapper";
import NotificationLabel from "../formElements/NotificationLabel";
import Textarea from "../formElements/Textarea";
import Modal from "../Modal/Modal";
import SubPageTemplate from "../templates/SubPageTemplate";
import { MeetingDataInputs } from "./NewMeetingPage";

type Props = {
  meetingData: any;
  onSave: (meeting: MeetingDataInputs) => void;
  onClose: () => void;
  onDelete: () => void;
};

const EditMeetingPage = ({ meetingData, onSave, onClose, onDelete }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState,
    formState: { errors },
  } = useForm<MeetingDataInputs>({
    criteriaMode: "all",
    defaultValues: {
      title: meetingData.title,
      startDate: meetingData.startDate.split("T")[0],
      startTime: new Date(meetingData.startDate).toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      endDate: meetingData.endDate.split("T")[0],
      endTime: new Date(meetingData.endDate).toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      location: meetingData?.location,
      description: meetingData?.description,
    },
  });

  const valuesHaveChanged = formState.isDirty;

  const onSubmit = (data: MeetingDataInputs) => {
    if (valuesHaveChanged) {
      onSave(data);
    } else {
      onClose();
    }
  };
  const { startDate, startTime, endDate } = watch();

  return (
    <>
      {showModal && (
        <Modal title="Are you sure?" onClose={() => setShowModal(false)}>
          <div className="space-y-5">
            <NotificationLabel variant="red">
              Be careful! This cannot be undone! Once you delete the meeting, it
              will be removed from your meeting list and that of your
              participants.
            </NotificationLabel>
            <div className="space-y-2">
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={onDelete} variant="red">
                Proceed with deletion
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <SubPageTemplate title="Edit Meeting" onClose={onClose}>
          <div className="space-y-3 pb-3">
            <LabelInputWrapper>
              <Label required>Meeting title</Label>
              <Input
                placeholder="Meeting title"
                {...register("title", {
                  required: ERROR_MESSAGES.IS_REQUIRED,
                })}
              />
              <ErrorMessage errors={errors} fieldName="title" />
            </LabelInputWrapper>
            <LabelInputWrapper>
              <div className="w-full flex space-y-0 space-x-3 justify-between">
                <span className="w-full space-y-1">
                  <Label required icon="date">
                    Start Date
                  </Label>
                  <Input
                    type="date"
                    {...register("startDate", {
                      required: ERROR_MESSAGES.START_DATE.IS_REQUIRED,
                      validate: {
                        notInPast: (v) =>
                          dateAsStringIsTodayOrLater(v) ||
                          ERROR_MESSAGES.START_DATE.NOT_IN_PAST,
                      },
                    })}
                  />
                </span>
                <span className="w-full space-y-1">
                  <Label required icon="time">
                    Start time
                  </Label>
                  <Input
                    type="time"
                    {...register("startTime", {
                      required: ERROR_MESSAGES.START_TIME.IS_REQUIRED,
                      validate: {
                        notInThePast: (v) =>
                          convertStringsToDate(startDate, v) > new Date() ||
                          ERROR_MESSAGES.START_TIME.NOT_IN_PAST,
                      },
                    })}
                  />
                </span>
              </div>
              <ErrorMessage
                errors={errors}
                fieldName="startDate"
                multipleErrors
              />
              <ErrorMessage
                errors={errors}
                fieldName="startTime"
                multipleErrors
              />
            </LabelInputWrapper>
            <LabelInputWrapper>
              <div className="w-full flex space-y-0 space-x-3 justify-between">
                <span className="w-full space-y-1">
                  <Label required icon="date">
                    End Date
                  </Label>
                  <Input
                    type="date"
                    {...register("endDate", {
                      required: ERROR_MESSAGES.END_TIME.IS_REQUIRED,
                      validate: {
                        notInPast: (v) =>
                          dateAsStringIsTodayOrLater(v) ||
                          ERROR_MESSAGES.END_DATE.NOT_IN_PAST,
                      },
                    })}
                  />
                </span>
                <span className="w-full space-y-1">
                  <Label required icon="time">
                    End time
                  </Label>
                  <Input
                    type="time"
                    {...register("endTime", {
                      required: ERROR_MESSAGES.END_TIME.IS_REQUIRED,
                      validate: {
                        notInThePast: (endTime) =>
                          convertStringsToDate(endDate, endTime) >
                            convertStringsToDate(startDate, startTime) ||
                          ERROR_MESSAGES.END_TIME.NOT_IN_PAST,
                      },
                    })}
                  />
                </span>
              </div>
              <ErrorMessage
                errors={errors}
                fieldName="endDate"
                multipleErrors
              />
              <ErrorMessage
                errors={errors}
                fieldName="endTime"
                multipleErrors
              />
            </LabelInputWrapper>
            <LabelInputWrapper>
              <Label>Meeting location</Label>
              <Input
                placeholder="e.g. meeting room"
                {...register("location")}
              />
            </LabelInputWrapper>
            <LabelInputWrapper>
              <Label>Short description</Label>
              <Textarea
                placeholder="Meeting description"
                {...register("description")}
              />
            </LabelInputWrapper>
            <Button
              type="button"
              variant="red"
              onClick={() => setShowModal(true)}
            >
              Delete Meeting
            </Button>
          </div>
          <Button type="submit" variant="highlighted">
            Save
          </Button>
        </SubPageTemplate>
      </form>
    </>
  );
};

export default EditMeetingPage;
