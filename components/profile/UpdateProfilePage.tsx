import { useState } from "react";
import { MdCheck } from "react-icons/md";
import { COLORS } from "../../utils/constants";
import { User } from "../../utils/types";
import Button from "../formElements/Button";
import Input from "../formElements/Input";
import Label from "../formElements/Label";
import LabelInputWrapper from "../formElements/LabelInputWrapper";
import SubPageTemplate from "../templates/SubPageTemplate";

type Props = {
  user: User;
  onClose: () => void;
  onUpdateProfile: (updatedUser: User) => void;
};

const UpdateProfilePage = ({ user, onClose, onUpdateProfile }: Props) => {
  const [userName, setUserName] = useState(user.name);
  const [color, setColor] = useState(user.color);

  return (
    <SubPageTemplate title="Update name and color" onClose={onClose}>
      <div className="space-y-3 pb-3">
        <LabelInputWrapper>
          <Label>Name</Label>
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </LabelInputWrapper>
        <LabelInputWrapper>
          <Label>Avatar Color</Label>
          <div className="grid gap-2 grid-cols-5 grid-rows-2 max-w-mobile">
            {COLORS.map((c) => (
              <button
                key={c}
                style={{ backgroundColor: c }}
                className="aspect-square relative flex items-center justify-center"
                onClick={() => setColor(c)}
              >
                {c === color && <MdCheck className="w-8 h-8" />}
              </button>
            ))}
          </div>
        </LabelInputWrapper>
      </div>
      <Button
        variant="highlighted"
        onClick={() =>
          onUpdateProfile({
            ...user,
            name: userName,
            color: color,
          })
        }
      >
        Save changes
      </Button>
    </SubPageTemplate>
  );
};

export default UpdateProfilePage;
