import type { NextPage } from "next";
import ViewBuilder from "../components/ViewBuilder/ViewBuilder";
import { NAVIGATION_IDS } from "../utils/constants";

const Profile: NextPage = () => {
  return (
    <ViewBuilder
      header={{
        title: "Profile",
      }}
      nav={{
        activeItemId: NAVIGATION_IDS.profile,
      }}
    >
      <div className="flex flex-col items-center space-y-3 p-5">
        <div className="bg-gray-500 rounded-full w-24 h-24 flex items-center justify-center text-white text-4xl">
          TS
        </div>
        <div className="text-center pb-8">
          <h1 className="font-bold text-xl">Timo Schmidt</h1>
          <h2 className="text-sm font-medium text-gray-400 truncate">
            myemail@address.com
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
            Settings
          </button>
          <button className="w-full bg-gray-200 hover:bg-gray-300 rounded-xl p-2">
            Logout
          </button>
        </div>
      </div>
    </ViewBuilder>
  );
};

export default Profile;
