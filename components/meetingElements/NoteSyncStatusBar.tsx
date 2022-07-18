import { MdCheck, MdError } from "react-icons/md";

export type DatabaseSyncStatus = "SAVING" | "SAVED" | "NONE" | "NOT_SAVED";

type Props = {
  databaseStatus: DatabaseSyncStatus;
  onSave: () => void;
  variant?: "PERSONAL" | "SHARED";
};

const NoteSyncStatusBar = ({
  databaseStatus,
  onSave,
  variant = "PERSONAL",
}: Props) => {
  return (
    <div
      className={`flex w-full items-center justify-between p-2 border-l border-r border-b rounded-b-xl space-x-2
        ${databaseStatus === "NOT_SAVED" && "border-red-500"}
        ${databaseStatus === "SAVED" && "border-green-500"}
        ${databaseStatus === "SAVING" && "border-yellow-500"}
    `}
    >
      <button
        disabled={databaseStatus === "SAVED"}
        onClick={onSave}
        className={`text-white text-xs px-3 py-1 rounded-xl disabled:bg-transparent min-w-sm
        ${databaseStatus === "NOT_SAVED" && "bg-red-500"}
        `}
      >
        {variant === "SHARED" ? "Save notes" : "Save changes manually"}
      </button>
      <div className="text-xs font-medium pr-2">
        {databaseStatus === "SAVING" && (
          <div className="text-yellow-500">Saving ...</div>
        )}
        {databaseStatus === "SAVED" && (
          <div className="text-green-500 flex items-center space-x-1">
            <MdCheck className="w-4 h-4 flex-shrink-0" />
            <p>Saved</p>
          </div>
        )}
        {databaseStatus === "NOT_SAVED" && variant === "PERSONAL" && (
          <div className="text-red-500">Not saved yet</div>
        )}
        {databaseStatus === "NOT_SAVED" && variant === "SHARED" && (
          <div
            className="flex items-center justify-center space-x-1 text-red-500"
            style={{ lineHeight: "1.1" }}
          >
            <MdError className="w-5 h-5 flex-shrink-0" />
            <p>Shared Notes are not saved automatically.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteSyncStatusBar;
