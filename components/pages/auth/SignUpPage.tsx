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

export type SignUpInputs = {
  email: string;
  password: string;
  name: string;
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
    <AuthPageLayout
      title="Sign up for new account"
      secondaryChildren={
        <Button
          className="bg-mblue-500 bg-opacity-20 hover:bg-mblue-600       hover:bg-opacity-30"
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
              autoFocus
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
          <LabelInputWrapper>
            <Label required icon="password">
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
          <LabelInputWrapper>
            <Label>Display name (optional)</Label>
            <Input placeholder="Max Mustermann" {...register("name")} />
          </LabelInputWrapper>
          <Button type="submit" variant="highlighted">
            Sign up
          </Button>
          {!!errorMessage?.length && (
            <NotificationLabel variant="red">{errorMessage}</NotificationLabel>
          )}
          {!!successMessage?.length && (
            <NotificationLabel variant="green">
              {successMessage}
            </NotificationLabel>
          )}
        </div>
      </form>
    </AuthPageLayout>
  );
};

export default SignUpPage;
