import type { NextPage } from "next";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../components/formElements/Button";
import Input from "../../components/formElements/Input";
import Label from "../../components/formElements/Label";
import LabelInputWrapper from "../../components/formElements/LabelInputWrapper";
import Modal from "../../components/Modal/Modal";
import ParticipantItem from "../../components/ParticipantItem/ParticipantItem";
import SubviewBuilder from "../../components/SubviewBuilder/SubviewBuilder";
import { exampleParticipants } from "../../utils/exampleData";
import { validateEmailRegex } from "../../utils/regex";
import { MeetingParticipant } from "../../utils/types";

const participants: MeetingParticipant[] = exampleParticipants;

type Inputs = {
  participantName: string;
  participantEmail: string;
};

const ManageParticipants: NextPage = () => {
  const [showModal, setShowModal] = useState<Boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <SubviewBuilder
        title="Manage participants"
        backButtonPath="/meeting/createMeeting"
        variant="ARROW"
      >
        <div className="space-y-3 pb-3">
          {participants.map((p) => (
            <ParticipantItem
              participant={p}
              onDelete={() => {}} // TODO: Add onDelete method
              key={p.id}
            />
          ))}
        </div>
        <div>
          <Button highlighted onClick={() => setShowModal(true)}>
            Add participant
          </Button>
        </div>
      </SubviewBuilder>

      {showModal && (
        <Modal title="Add new participant" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <LabelInputWrapper>
                <Label>Participant name</Label>
                <Input placeholder="Name" {...register("participantName")} />
              </LabelInputWrapper>
              <LabelInputWrapper>
                <Label mandatory>Email address</Label>
                <Input
                  placeholder="Email address"
                  {...(register("participantEmail"),
                  { required: true, pattern: validateEmailRegex })}
                />
              </LabelInputWrapper>
              <Button onClick={() => {}}>Add</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ManageParticipants;
