import type { NextPage } from "next";
import PageTemplate from "../components/templates/PageTemplate";
import ProfilePage from "../components/pages/ProfilePage";
import { useAuth } from "../lib/auth";
import { NAVIGATION_IDS } from "../utils/constants";

// TODO: REPLACE: Get userId and load meetings
const userId = "timoschmidt";

const Profile: NextPage = () => {
  const { user, logout } = useAuth();
  console.log("Your logged in as ", user?.email);

  return <ProfilePage userId={userId} onLogout={logout} />;
};

export default Profile;
