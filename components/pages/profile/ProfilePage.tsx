import { NAVIGATION_IDS } from "../../../utils/constants";
import { getNameInitials } from "../../../utils/functions";
import { User } from "../../../utils/types";
import Button from "../../formElements/Button";
import PageLayout from "../layouts/PageLayout";

type Props = {
  user: User;
  email: string;
  onLogout: () => void;
  onUpdateProfile: () => void;
  onChangeEmail: () => void;
  onChangePassword: () => void;
  onDeleteAccount: () => void;
};

const ProfilePage = ({
  user,
  email,
  onLogout,
  onUpdateProfile,
  onChangeEmail,
  onChangePassword,
  onDeleteAccount,
}: Props) => {
  return (
    <PageLayout
      header={{
        title: "Profile",
      }}
      activeNavItemId={NAVIGATION_IDS.profile}
    >
      <div className="flex flex-col items-center space-y-3 p-5 w-full max-w-desktop">
        <div
          className="rounded-full w-24 h-24 flex items-center justify-center text-white text-4xl"
          style={{ backgroundColor: user.color }}
        >
          {!!user.name.length
            ? getNameInitials(user.name)
            : getNameInitials(email)}
        </div>
        <div className="text-center pb-8 truncate">
          {!!user.name?.length ? (
            <>
              <h1 className="font-bold text-xl truncate text-mblue-500">
                {user.name}
              </h1>
              <h2 className="text-sm font-medium text-mblue-500 text-opacity-40 truncate">
                {email}
              </h2>
            </>
          ) : (
            <h1 className="font-medium text-mblue-500 truncate">{email}</h1>
          )}
        </div>
        <div className="space-y-2 w-full flex flex-col items-center max-w-buttons">
          <Button variant="light" onClick={onUpdateProfile}>
            Update profile settings
          </Button>
          <Button variant="light" onClick={onChangeEmail}>
            Change email address
          </Button>
          <Button variant="light" onClick={onChangePassword}>
            Change password
          </Button>
          <Button variant="light" onClick={onDeleteAccount}>
            Delete account
          </Button>
          <Button variant="lightred" onClick={onLogout}>
            Log out
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
