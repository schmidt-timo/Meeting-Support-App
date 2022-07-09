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

export type SignUpInputs = {
  email: string;
  password: string;
};

type Props = {
  onSignUpNewAccount: (credentials: SignUpInputs) => void;
  onLogin: () => void;
  errorMessage?: string;
  successMessage?: string;
};

const SignUpPage = ({
  onSignUpNewAccount,
  errorMessage,
  successMessage,
  onLogin,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>({
    criteriaMode: "all",
  });

  const onSubmit = (data: SignUpInputs) => {
    onSignUpNewAccount(data);
  };

  return (
    <AuthPageTemplate
      title="Sign up for new account"
      secondaryChildren={<Button onClick={onLogin}>Back To Login</Button>}
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
          <Button type="submit" highlighted>
            Sign up
          </Button>
          {!!errorMessage?.length && (
            <NotificationLabel variant="RED">{errorMessage}</NotificationLabel>
          )}
          {!!successMessage?.length && (
            <NotificationLabel variant="GREEN">
              {successMessage}
            </NotificationLabel>
          )}
        </div>
      </form>
    </AuthPageTemplate>
  );
};

export default SignUpPage;
