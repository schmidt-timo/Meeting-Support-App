import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginPage, { LoginInputs } from "../components/pages/LoginPage";
import RegisterPage, { RegisterInputs } from "../components/pages/RegisterPage";
import ResetPasswordPage from "../components/pages/ResetPasswordPage";
import SetNewPasswordPage from "../components/pages/SetNewPasswordPage";
import { supabase } from "../lib/supabase";

const queryString = require("query-string");

type Views = "LOGIN" | "REGISTER" | "RESET_PASSWORD";

const LoginScreen: NextPage = () => {
  const router = useRouter();
  const [view, setView] = useState<Views>("LOGIN");
  const [accessToken, setAccessToken] = useState("");

  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [resetPasswordErrorMessage, setResetPasswordErrorMessage] =
    useState("");
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");

  const onLogin = async (credentials: LoginInputs) => {
    const { email, password } = credentials;
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      setLoginErrorMessage(error.message);
      setTimeout(() => {
        setLoginErrorMessage("");
      }, 3000);
      throw error;
    }

    if (user) {
      if (router.pathname === "/") {
        router.reload();
      } else {
        router.push("/");
      }
    }
  };

  const onRegister = async (data: RegisterInputs) => {
    const { email, password } = data;
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setRegisterErrorMessage(error.message);
      setTimeout(() => {
        setRegisterErrorMessage("");
      }, 3000);
      throw error;
    }

    if (user) {
      if (router.pathname === "/") {
        router.reload();
      } else {
        router.push("/");
      }
    }
  };

  const onResetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      email
    );

    if (error) {
      setResetPasswordErrorMessage(error.message);
      setTimeout(() => {
        setResetPasswordErrorMessage("");
      }, 3000);
      throw error;
    }

    if (data) {
      setResetPasswordErrorMessage(
        "Email was successfully sent. Please check your mailbox."
      );
      setTimeout(() => {
        setResetPasswordErrorMessage("");
        setView("LOGIN");
      }, 5000);
    }
  };

  const onUpdatePassword = async (newPassword: string, accessToken: string) => {
    await supabase.auth.api
      .updateUser(accessToken, {
        password: newPassword,
      })
      .then(() => {
        setView("LOGIN");
      })
      .catch((error) => {
        setNewPasswordErrorMessage(error.message);
        setTimeout(() => {
          setNewPasswordErrorMessage("");
        }, 3000);
        throw error;
      });
  };

  useEffect(() => {
    if (router.query) {
      setAccessToken(
        queryString.parse(router.asPath.split("#")[1]).access_token as string
      );
    }
  }, [router.query, router.asPath]);

  // if link in mail was clicked to reset password
  if (router.asPath.indexOf("type=recovery") !== -1) {
    return (
      <SetNewPasswordPage
        onLogin={() => {
          setView("LOGIN");
          router.push("/login");
        }}
        onSetNewPassword={(newPassword) =>
          onUpdatePassword(newPassword, accessToken)
        }
        errorMessage={newPasswordErrorMessage}
      />
    );
  }

  if (view === "REGISTER") {
    return (
      <RegisterPage
        onRegister={onRegister}
        onLogin={() => setView("LOGIN")}
        errorMessage={registerErrorMessage}
      />
    );
  }

  if (view === "RESET_PASSWORD") {
    return (
      <ResetPasswordPage
        onLogin={() => setView("LOGIN")}
        errorMessage={resetPasswordErrorMessage}
        onResetPassword={onResetPassword}
      />
    );
  }

  return (
    <LoginPage
      errorMessage={loginErrorMessage}
      onLogin={onLogin}
      onForgotPassword={() => setView("RESET_PASSWORD")}
      onRegister={() => setView("REGISTER")}
    />
  );
};

export default LoginScreen;
