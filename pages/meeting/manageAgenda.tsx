import type { NextPage } from "next";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../components/formElements/Button";
import Input from "../../components/formElements/Input";
import Label from "../../components/formElements/Label";
import LabelInputWrapper from "../../components/formElements/LabelInputWrapper";
import Textarea from "../../components/formElements/Textarea";
import MeetingAgendaItem from "../../components/MeetingAgendaItem/MeetingAgendaItem";
import Modal from "../../components/Modal/Modal";
import SubviewBuilder from "../../components/SubviewBuilder/SubviewBuilder";
import { exampleAgendaItems } from "../../utils/exampleData";

const agendaItems = exampleAgendaItems;

type Inputs = {
  agendaItemTitle: string;
  agendaItemDescription: string;
  agendaItemDuration: number;
};

const ManageAgenda: NextPage = () => {
  const [showModal, setShowModal] = useState<Boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <SubviewBuilder
        title="Manage agenda"
        backButtonPath="/meeting/createMeeting"
        variant="ARROW"
      >
        <div className="space-y-3 pb-3">
          {agendaItems.map((a) => (
            <MeetingAgendaItem
              title={a.title}
              description={a.description}
              duration={a.duration}
              key={a.id}
            />
          ))}
        </div>
        <div>
          <Button highlighted onClick={() => setShowModal(true)}>
            Add new item
          </Button>
        </div>
      </SubviewBuilder>
      {showModal && (
        <Modal title="Add new agenda item" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <LabelInputWrapper>
                <Label>Title</Label>
                <Input placeholder="Name" {...register("agendaItemTitle")} />
              </LabelInputWrapper>
              <LabelInputWrapper>
                <Label>Short description</Label>
                <Textarea
                  placeholder="Description"
                  {...register("agendaItemDescription")}
                />
              </LabelInputWrapper>
              <LabelInputWrapper>
                <Label>Duration (in minutes)</Label>
                <Input
                  placeholder="Duration in minutes"
                  {...register("agendaItemDuration")}
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

export default ManageAgenda;
