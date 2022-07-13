import { useState } from "react";
import { useForm } from "react-hook-form";
import { ERROR_MESSAGES } from "../../../utils/constants";
import { validateEmailRegex } from "../../../utils/regex";
import Button from "../../formElements/Button";
import ErrorMessage from "../../formElements/ErrorMessage";
import Input from "../../formElements/Input";
import Label from "../../formElements/Label";
import LabelInputWrapper from "../../formElements/LabelInputWrapper";
import NotificationLabel from "../../formElements/NotificationLabel";
import SubPageLayout from "../layouts/SubPageLayout";

type Props = {
  onClose: () => void;
  onChangeEmail: (email: string) => Promise<void>;
};

type Inputs = {
  email: string;
};

const ChangeEmailPage = ({ onClose, onChangeEmail }: Props) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    criteriaMode: "all",
  });

  const onSubmit = (data: Inputs) => {
    onChangeEmail(data.email).then(() => {
      setLoading(true);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SubPageLayout title="Change email address" onClose={onClose}>
        <div className="space-y-3">
          <NotificationLabel variant="yellow">
            After clicking the button you will be logged out automatically and
            receive a confirmation link to your new email address. Only after
            clicking on this link your email address will be changed.
          </NotificationLabel>
          <LabelInputWrapper>
            <Label icon="email">New email address</Label>
            <Input
              placeholder="example@domain.com"
              {...register("email", {
                required: ERROR_MESSAGES.IS_REQUIRED,
                pattern: {
                  value: validateEmailRegex,
                  message: ERROR_MESSAGES.NOT_EMAIL_REGEX,
                },
              })}
            />
            <ErrorMessage fieldName="email" errors={errors} multipleErrors />
            {loading && (
              <NotificationLabel variant="green">
                A confirmation email has been sent successfully. Please check
                your mailbox.
              </NotificationLabel>
            )}
          </LabelInputWrapper>
        </div>
        <Button variant="highlighted" type="submit">
          Send confirmation link
        </Button>
      </SubPageLayout>
    </form>
  );
};

export default ChangeEmailPage;
