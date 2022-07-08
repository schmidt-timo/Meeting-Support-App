import { NAVIGATION_IDS } from "../../utils/constants";
import { exampleUser } from "../../utils/exampleData";
import { getNameInitials } from "../../utils/functions";
import PageTemplate from "../templates/PageTemplate";

type Props = {
  userId: string;
  onLogout: () => void;
};

const ProfilePage = ({ userId, onLogout }: Props) => {
  // TODO: Get User by id
  const user = exampleUser;

  return (
    <PageTemplate
      header={{
        title: "Profile",
      }}
      activeNavItemId={NAVIGATION_IDS.profile}
    >
      <div className="flex flex-col items-center space-y-3 p-5">
        <div className="bg-gray-500 rounded-full w-24 h-24 flex items-center justify-center text-white text-4xl">
          {getNameInitials(user.name ?? user.email)}
        </div>
        <div className="text-center pb-8">
          <h1 className="font-bold text-xl">{user.name}</h1>
          <h2 className="text-sm font-medium text-gray-400 truncate">
            {user.email}
          </h2>
        </div>
        <div className="space-y-2">
          <button className="w-full bg-gray-200 hover:bg-gray-300 rounded-xl p-2 ">
            Change name
          </button>
          <button className="w-full bg-gray-200 hover:bg-gray-300 rounded-xl p-2">
            Change email address
          </button>
          <button className="w-full bg-gray-200 hover:bg-gray-300 rounded-xl p-2">
            Manage participants
          </button>
          <button className="w-full bg-gray-200 hover:bg-gray-300 rounded-xl p-2">
            Settings
          </button>
          <button
            onClick={onLogout}
            className="w-full bg-gray-200 hover:bg-gray-300 rounded-xl p-2"
          >
            Logout
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ProfilePage;
