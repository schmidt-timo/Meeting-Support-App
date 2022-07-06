import { ErrorMessage } from "@hookform/error-message";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Button from "../components/formElements/Button";
import ErrorLabel from "../components/formElements/ErrorLabel";
import Input from "../components/formElements/Input";
import Label from "../components/formElements/Label";
import LabelInputWrapper from "../components/formElements/LabelInputWrapper";
import { login } from "../lib/firebase";
import { auth } from "../lib/firebase-config";
import { FIELD_IS_REQUIRED_MESSAGE } from "../utils/constants";
import { validateEmailRegex } from "../utils/regex";

export type LoginInputs = {
  loginEmail: string;
  loginPassword: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    criteriaMode: "all",
  });
  const onSubmit = (data: LoginInputs) => {
    login(data.loginEmail, data.loginPassword)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setLoginErrorMessage("User does not exist.");
        }
        if (error.code === "auth/invalid-email") {
          setLoginErrorMessage("Email address is not valid.");
        }
        if (error.code === "auth/wrong-password") {
          setLoginErrorMessage("Password is not correct.");
        }
        console.log(error);
        setTimeout(() => setLoginErrorMessage(""), 3000);
      });
  };

  if (loading) {
    return <p>Loading ...</p>; // TODO: Add proper loading screen
  }

  if (user) {
    router.push("/");
  }

  return (
    <div className="p-8 flex flex-col items-center justify-center h-screen space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-medium">Welcome!</h1>
        <p>Please select one option.</p>
      </div>

      <div className="space-y-8 w-full">
        <div className="bg-gray-200 border border-gray-300 rounded-xl w-full p-5 space-y-5">
          <h1 className="font-medium text-lg text-gray-500 text-center">
            Registered Users
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <LabelInputWrapper>
                <Label required>Email address</Label>
                <Input
                  placeholder="Email address"
                  {...register("loginEmail", {
                    required: FIELD_IS_REQUIRED_MESSAGE,
                    pattern: {
                      value: validateEmailRegex,
                      message: "Email address is not in correct format",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="loginEmail"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <ErrorLabel key={type}>{message}</ErrorLabel>
                    ))
                  }
                />
              </LabelInputWrapper>
              <LabelInputWrapper>
                <Label required>Password</Label>
                <Input
                  placeholder="Password"
                  {...register("loginPassword", {
                    required: FIELD_IS_REQUIRED_MESSAGE,
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="loginPassword"
                  render={({ message }) => <ErrorLabel>{message}</ErrorLabel>}
                />
              </LabelInputWrapper>
              <div className="pt-2">
                <Button highlighted type="submit">
                  Sign in
                </Button>
              </div>
              {!!loginErrorMessage.length && (
                <ErrorLabel>{loginErrorMessage}</ErrorLabel>
              )}
            </div>
          </form>
        </div>
        <div className="bg-gray-500 border border-gray-700 rounded-xl w-full p-5 space-y-5">
          <h1 className="font-medium text-lg text-gray-100 text-center">
            New here?
          </h1>
          <Button>Register new account</Button>
          <Button>Sign in as guest</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
