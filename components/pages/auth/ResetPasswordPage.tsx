import { useForm } from "react-hook-form";
import { ERROR_MESSAGES } from "../../../utils/constants";
import { validateEmailRegex } from "../../../utils/regex";
import Button from "../../formElements/Button";
import ErrorMessage from "../../formElements/ErrorMessage";
import Input from "../../formElements/Input";
import Label from "../../formElements/Label";
import LabelInputWrapper from "../../formElements/LabelInputWrapper";
import NotificationLabel from "../../formElements/NotificationLabel";
import AuthPageLayout from "../layouts/AuthPageLayout";

export type ResetPasswordInputs = {
  email: string;
};

type Props = {
  onResetPassword: (email: string) => void;
  onLogin: () => void;
  errorMessage?: string;
};

const ResetPasswordPage = ({
  onResetPassword,
  onLogin,
  errorMessage,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    criteriaMode: "all",
  });

  const onSubmit = (data: ResetPasswordInputs) => {
    onResetPassword(data.email);
  };
  return (
    <AuthPageLayout
      title="Reset your password"
      secondaryChildren={
        <Button
          className="bg-mblue-500 bg-opacity-20 hover:bg-mblue-500       hover:bg-opacity-30"
          onClick={onLogin}
        >
          Back To Login
        </Button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3 p-5">
          <LabelInputWrapper>
            <Label required icon="email">
              Email address
            </Label>
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
          </LabelInputWrapper>
          <Button variant="highlighted" type="submit">
            Send reset password link
          </Button>

          {!!errorMessage?.length && (
            <NotificationLabel variant="yellow">
              {errorMessage}
            </NotificationLabel>
          )}
        </div>
      </form>
    </AuthPageLayout>
  );
};

export default ResetPasswordPage;
