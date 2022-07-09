import { useForm } from "react-hook-form";
import { useAuth } from "../../lib/auth";
import { ERROR_MESSAGES } from "../../utils/constants";
import Button from "../formElements/Button";
import ErrorMessage from "../formElements/ErrorMessage";
import Input from "../formElements/Input";
import Label from "../formElements/Label";
import LabelInputWrapper from "../formElements/LabelInputWrapper";
import NotificationLabel from "../formElements/NotificationLabel";
import AuthPageTemplate from "../templates/AuthPageTemplate";

export type SetNewPasswordInputs = {
  password: string;
};

type Props = {
  onLogin: () => void;
  onSetNewPassword: (newPassword: string) => void;
  errorMessage?: string;
};

const SetNewPasswordPage = ({
  onLogin,
  onSetNewPassword,
  errorMessage,
}: Props) => {
  const { session } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetNewPasswordInputs>({
    criteriaMode: "all",
  });

  const onSubmit = (data: SetNewPasswordInputs) => {
    onSetNewPassword(data.password);
  };

  return (
    <AuthPageTemplate
      title="Set new password"
      secondaryChildren={<Button onClick={onLogin}>Back to login</Button>}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3 p-5">
          <LabelInputWrapper>
            <Label required icon="PASSWORD">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: ERROR_MESSAGES.IS_REQUIRED,
              })}
            />
            <ErrorMessage fieldName="password" errors={errors} />
          </LabelInputWrapper>

          <Button highlighted type="submit">
            Set password
          </Button>

          {!!errorMessage?.length && (
            <NotificationLabel>{errorMessage}</NotificationLabel>
          )}
        </div>
      </form>
    </AuthPageTemplate>
  );
};

export default SetNewPasswordPage;
