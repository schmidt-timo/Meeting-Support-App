import { useForm } from "react-hook-form";
import { ERROR_MESSAGES } from "../../utils/constants";
import { validateEmailRegex } from "../../utils/regex";
import Button from "../formElements/Button";
import ErrorMessage from "../formElements/ErrorMessage";
import Input from "../formElements/Input";
import Label from "../formElements/Label";
import LabelInputWrapper from "../formElements/LabelInputWrapper";
import NotificationLabel from "../formElements/NotificationLabel";
import AuthPageTemplate from "../templates/AuthPageTemplate";

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
    <AuthPageTemplate
      title="Reset your password"
      secondaryChildren={<Button onClick={onLogin}>Back to login</Button>}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3 p-5">
          <LabelInputWrapper>
            <Label required icon="EMAIL">
              Email address
            </Label>
            <Input
              placeholder="example@domain.com"
              {...register("email", {
                required: ERROR_MESSAGES.IS_REQUIRED,
                pattern: {
                  value: validateEmailRegex,
                  message: "Email address is not in correct format",
                },
              })}
            />
            <ErrorMessage fieldName="email" errors={errors} multipleErrors />
          </LabelInputWrapper>
          <Button highlighted type="submit">
            Send reset password link
          </Button>

          {!!errorMessage?.length && (
            <NotificationLabel variant="YELLOW">
              {errorMessage}
            </NotificationLabel>
          )}
        </div>
      </form>
    </AuthPageTemplate>
  );
};

export default ResetPasswordPage;
