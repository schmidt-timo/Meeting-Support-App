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

export type LoginInputs = {
  email: string;
  password: string;
};

type Props = {
  onLogin: (credentials: LoginInputs) => void;
  onSignUpNewAccount: () => void;
  onForgotPassword: () => void;
  errorMessage?: string;
};

const LoginPage = ({
  errorMessage,
  onLogin,
  onForgotPassword,
  onSignUpNewAccount,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    criteriaMode: "all",
  });

  const onSubmit = (data: LoginInputs) => {
    onLogin(data);
  };

  return (
    <AuthPageTemplate
      title="Login"
      secondaryChildren={
        <Button onClick={onSignUpNewAccount}>Sign up for new account</Button>
      }
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
          <Button highlighted type="submit">
            Log in
          </Button>
          <button
            onClick={onForgotPassword}
            className="w-full text-sm text-gray-500"
          >
            Forgot your password?
          </button>

          {!!errorMessage?.length && (
            <NotificationLabel>{errorMessage}</NotificationLabel>
          )}
        </div>
      </form>
    </AuthPageTemplate>
  );
};

export default LoginPage;
