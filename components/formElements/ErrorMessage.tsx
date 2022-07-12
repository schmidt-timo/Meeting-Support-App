import { ErrorMessage as HookFormErrorMessage } from "@hookform/error-message";
import { MultipleFieldErrors } from "react-hook-form";
import NotificationLabel from "./NotificationLabel";

type Props = {
  fieldName: string;
  errors: any;
  variant?: "red" | "yellow";
  multipleErrors?: boolean;
};

const ErrorMessage = ({
  fieldName,
  errors,
  variant = "red",
  multipleErrors,
}: Props) => {
  const requiredIsBeingShown = (messages: MultipleFieldErrors) => {
    return (
      Object.entries(messages).findIndex(
        ([type, message]) => type === "required"
      ) !== -1
    );
  };

  return (
    <>
      {multipleErrors ? (
        <HookFormErrorMessage
          errors={errors}
          name={fieldName}
          render={({ messages, message }) =>
            messages &&
            (requiredIsBeingShown(messages) ? (
              <NotificationLabel>{message}</NotificationLabel>
            ) : (
              Object.entries(messages).map(([type, message]) => (
                <NotificationLabel key={type} variant={variant}>
                  {message}
                </NotificationLabel>
              ))
            ))
          }
        />
      ) : (
        <HookFormErrorMessage
          errors={errors}
          name={fieldName}
          render={({ message }) => (
            <NotificationLabel>{message}</NotificationLabel>
          )}
        />
      )}
    </>
  );
};

export default ErrorMessage;
