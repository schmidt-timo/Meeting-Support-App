import type { NextPage } from "next";
import { useRouter } from "next/router";
import ProfilePage from "../components/views/ProfilePage";
import { logout } from "../lib/authentification";

// TODO: REPLACE: Get userId and load meetings
const userId = "timoschmidt";

const Profile: NextPage = () => {
  const router = useRouter();
  return (
    <ProfilePage
      userId={userId}
      onLogout={() =>
        logout().then(() =>
          router.push("/login").catch((error) => console.log(error))
        )
      }
    />
  );
};

export default Profile;
