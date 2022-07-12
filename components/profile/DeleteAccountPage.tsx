import { useForm } from "react-hook-form";
import { ERROR_MESSAGES } from "../../utils/constants";
import Button from "../formElements/Button";
import ErrorMessage from "../formElements/ErrorMessage";
import Input from "../formElements/Input";
import LabelInputWrapper from "../formElements/LabelInputWrapper";
import NotificationLabel from "../formElements/NotificationLabel";
import SubPageTemplate from "../templates/SubPageTemplate";

type Props = {
  email: string;
  onClose: () => void;
  onDeleteAccount: () => void;
};

type Inputs = {
  email: string;
};

const DeleteAccountPage = ({
  email: userEmail,
  onClose,
  onDeleteAccount,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    criteriaMode: "all",
  });

  const onSubmit = (data: Inputs) => {
    onDeleteAccount();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SubPageTemplate title="Delete Account" onClose={onClose}>
        <div className="space-y-3">
          <NotificationLabel variant="red">
            Be careful! This cannot be undone! Once you delete your account, you
            will lose all access to the meetings you have already created.
            However, the meetings will still exist unless they are deleted
            individually.
          </NotificationLabel>
          <NotificationLabel variant="yellow">
            To confirm your account deletion, please type in your email address.
          </NotificationLabel>
          <LabelInputWrapper>
            <Input
              placeholder={userEmail}
              {...register("email", {
                required: ERROR_MESSAGES.IS_REQUIRED,
                validate: {
                  confirmed: (v) =>
                    v === userEmail || "Does not match your email address",
                },
              })}
            />
            <ErrorMessage fieldName="email" errors={errors} multipleErrors />
          </LabelInputWrapper>
        </div>
        <Button variant="red" type="submit">
          Confirm Deletion
        </Button>
      </SubPageTemplate>
    </form>
  );
};

export default DeleteAccountPage;
