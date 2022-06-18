import type { NextPage } from "next";
import Button from "../components/formElements/Button";
import Input from "../components/formElements/Input";
import Label from "../components/formElements/Label";
import LabelInputWrapper from "../components/formElements/LabelInputWrapper";
import SubviewBuilder from "../components/SubviewBuilder/SubviewBuilder";

const AddMeeting: NextPage = () => {
  return (
    <SubviewBuilder title="Add meeting" backButtonPath="/">
      <div className="space-y-10">
        <LabelInputWrapper>
          <Label>Add a meeting by scanning the qr code</Label>
          <div className="bg-black rounded-xl h-60" />{" "}
        </LabelInputWrapper>
        <LabelInputWrapper>
          <Label>or manually via Meeting ID</Label>
          <Input placeholder="Meeting ID" />
          <Button onClick={() => {}}>Add meeting</Button>
        </LabelInputWrapper>
      </div>
    </SubviewBuilder>
  );
};

export default AddMeeting;
