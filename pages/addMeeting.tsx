import type { NextPage } from "next";
import Button from "../components/formElements/Button";
import Input from "../components/formElements/Input";
import Label from "../components/formElements/Label";
import LabelInputWrapper from "../components/formElements/LabelInputWrapper";
import SubviewBuilder from "../components/SubviewBuilder/SubviewBuilder";
import { QrReader } from "react-qr-reader";
import { useState } from "react";

const AddMeeting: NextPage = () => {
  const [qrcode, setQrcode] = useState("No result");

  return (
    <SubviewBuilder title="Add meeting" backButtonPath="/">
      <div className="space-y-10">
        <LabelInputWrapper>
          <Label>Add a meeting by scanning the qr code</Label>
          <div className="rounded-xl">
            <QrReader
              className="w-full"
              onResult={(result, error) => {
                if (!!result) {
                  setQrcode(result?.getText());
                }
                if (!!error) {
                  console.info(error);
                }
              }}
              videoContainerStyle={{
                backgroundColor: "black",
                borderRadius: "0.75rem",
                width: "100%",
              }}
              constraints={{
                facingMode: "environment",
                aspectRatio: {
                  ideal: 1.777,
                },
              }}
            />
          </div>
        </LabelInputWrapper>
        <LabelInputWrapper>
          <Label>or manually via Meeting ID</Label>
          <Input placeholder="Meeting ID" value={qrcode} />
        </LabelInputWrapper>
      </div>
      <Button highlighted onClick={() => {}}>
        Add meeting
      </Button>
    </SubviewBuilder>
  );
};

export default AddMeeting;
