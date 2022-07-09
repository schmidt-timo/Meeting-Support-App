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
            Register
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

export default RegisterPage;
