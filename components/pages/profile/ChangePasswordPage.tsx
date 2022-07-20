import { useForm } from "react-hook-form";
import { ERROR_MESSAGES } from "../../../utils/constants";
import Button from "../../formElements/Button";
import ErrorMessage from "../../formElements/ErrorMessage";
import Input from "../../formElements/Input";
import Label from "../../formElements/Label";
import LabelInputWrapper from "../../formElements/LabelInputWrapper";
import SubPageLayout from "../layouts/SubPageLayout";

type Props = {
  onClose: () => void;
  onChangePassword: (password: string) => void;
};

type Inputs = {
  password: string;
  confirmPassword: string;
};

const ChangePasswordPage = ({ onClose, onChangePassword }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    criteriaMode: "all",
  });

  const { password } = watch();

  const onSubmit = (data: Inputs) => {
    onChangePassword(data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SubPageLayout title="Change password" onClose={onClose}>
        <div className="space-y-3 pb-3">
          <LabelInputWrapper>
            <Label icon="email">New password</Label>
            <Input
              type="password"
              {...register("password", {
                required: ERROR_MESSAGES.IS_REQUIRED,
                validate: {
                  minLength: (v) =>
                    v.length >= 6 || ERROR_MESSAGES.PASSWORD.MIN_LENGTH,
                },
              })}
            />
            <ErrorMessage fieldName="password" errors={errors} multipleErrors />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>Confirm password</Label>
            <Input
              type="password"
              {...register("confirmPassword", {
                required: ERROR_MESSAGES.IS_REQUIRED,
                validate: {
                  minLength: (v) =>
                    v === password || ERROR_MESSAGES.PASSWORD.NO_MATCH,
                },
              })}
            />
            <ErrorMessage
              fieldName="confirmPassword"
              errors={errors}
              multipleErrors
            />
          </LabelInputWrapper>
        </div>
        <Button variant="highlighted" type="submit">
          Change password
        </Button>
      </SubPageLayout>
    </form>
  );
};

export default ChangePasswordPage;
