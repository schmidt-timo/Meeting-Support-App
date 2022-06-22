import type { NextPage } from "next";
import ViewBuilder from "../components/ViewBuilder/ViewBuilder";
import ProfilePage from "../components/views/ProfilePage";
import { NAVIGATION_IDS } from "../utils/constants";

// TODO: REPLACE: Get userId and load meetings
const userId = "timoschmidt";

const Profile: NextPage = () => {
  return <ProfilePage userId={userId} />;
};

export default Profile;
