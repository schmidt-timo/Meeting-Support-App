import type { NextPage } from "next";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import ProfilePage from "../components/pages/ProfilePage";
import ChangeEmailPage from "../components/profile/ChangeEmailPage";
import ChangePasswordPage from "../components/profile/ChangePasswordPage";
import DeleteAccountPage from "../components/profile/DeleteAccountPage";
import UpdateProfilePage from "../components/profile/UpdateProfilePage";
import { useAuth } from "../lib/auth";
import {
  deleteUserAccount,
  updateUserAccountEmail,
  updateUserAccountPassword,
} from "../lib/supabase/account";
import {
  deleteUser,
  fetchSingleUser,
  updateProfile,
} from "../lib/supabase/users";
import { objectsAreEqual } from "../utils/functions";
import { User } from "../utils/types";

type Views = "PROFILE" | "UPDATE" | "EMAIL" | "PASSWORD" | "DELETE";

const Profile: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const { user: currentUser, logout } = useAuth();
  const [view, setView] = useState<Views>("PROFILE");

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data, error } = await fetchSingleUser(currentUser!.id);

      if (error) {
        throw error;
      }

      if (data) {
        setUser(data);
      }
    };
    getCurrentUser();
  }, []);

  if (!user) {
    return <LoadingScreen />;
  }

  if (view === "UPDATE") {
    return (
      <UpdateProfilePage
        user={user}
        onClose={() => setView("PROFILE")}
        onUpdateProfile={async (updatedUser) => {
          if (!objectsAreEqual(user, updatedUser)) {
            const { data, error } = await updateProfile(updatedUser);

            if (error) {
              throw error;
            }

            if (data) {
              setUser(data);
            }
          }
          setView("PROFILE");
        }}
      />
    );
  }

  if (view === "DELETE") {
    return (
      <DeleteAccountPage
        email={currentUser!.email!}
        onClose={() => setView("PROFILE")}
        onDeleteAccount={async () => {
          const { data: userData, error: userError } = await deleteUser(
            user!.id
          );

          if (userError) {
            throw userError;
          }

          if (userData) {
            const { data, error } = await deleteUserAccount(user!.id);

            if (error) {
              throw error;
            }

            if (data) {
              if (currentUser) {
                logout();
              }
            }
          }
        }}
      />
    );
  }

  if (view === "EMAIL") {
    return (
      <ChangeEmailPage
        onClose={() => setView("PROFILE")}
        onChangeEmail={async (updatedEmail) => {
          const { user: userData, error: updateUserError } =
            await updateUserAccountEmail(updatedEmail);

          if (updateUserError) {
            throw updateUserError;
          }

          if (userData) {
            logout();
          }
        }}
      />
    );
  }

  if (view === "PASSWORD") {
    return (
      <ChangePasswordPage
        onClose={() => setView("PROFILE")}
        onChangePassword={async (updatedPassword) => {
          const { user: userData, error: updateUserError } =
            await updateUserAccountPassword(updatedPassword);

          if (updateUserError) {
            throw updateUserError;
          }

          if (userData) {
            setView("PROFILE");
          }
        }}
      />
    );
  }

  return (
    <ProfilePage
      user={user}
      email={currentUser!.email ?? ""}
      onUpdateProfile={() => setView("UPDATE")}
      onChangeEmail={() => setView("EMAIL")}
      onChangePassword={() => setView("PASSWORD")}
      onDeleteAccount={() => setView("DELETE")}
      onLogout={logout}
    />
  );
};

export default Profile;
