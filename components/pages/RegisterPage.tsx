import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { validateEmailRegex } from "../../utils/regex";
import Button from "../formElements/Button";
import Input from "../formElements/Input";
import Label from "../formElements/Label";
import LabelInputWrapper from "../formElements/LabelInputWrapper";
import NotificationLabel from "../formElements/NotificationLabel";
import AuthPageTemplate from "../templates/AuthPageTemplate";

export type RegisterInputs = {
  email: string;
  password: string;
};

type Props = {
  onRegister: (credentials: RegisterInputs) => void;
  onLogin: () => void;
  errorMessage?: string;
};

const RegisterPage = ({ onRegister, errorMessage, onLogin }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    criteriaMode: "all",
  });

  const onSubmit = (data: RegisterInputs) => {
    onRegister(data);
  };

  return (
    <AuthPageTemplate
      title="Register new account"
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
          <Button type="submit" highlighted>
            Register
          </Button>
          {!!errorMessage?.length && (
            <NotificationLabel variant="yellow">
              {errorMessage}
            </NotificationLabel>
          )}
        </div>
      </form>
    </AuthPageTemplate>
  );
};

export default RegisterPage;
