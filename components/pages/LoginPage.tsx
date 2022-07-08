import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { validateEmailRegex } from "../../utils/regex";
import Button from "../formElements/Button";
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
  onRegister: () => void;
  onForgotPassword: () => void;
  errorMessage?: string;
};

const LoginPage = ({
  errorMessage,
  onLogin,
  onForgotPassword,
  onRegister,
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
        <Button onClick={onRegister}>Register new Account</Button>
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
                required: "This field is required.",
                pattern: {
                  value: validateEmailRegex,
                  message: "Email address is not in correct format",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <NotificationLabel key={type}>{message}</NotificationLabel>
                ))
              }
            />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label required icon="PASSWORD">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "This field is required.",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <NotificationLabel>{message}</NotificationLabel>
              )}
            />
          </LabelInputWrapper>
          <Button highlighted type="submit">
            Sign in
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
