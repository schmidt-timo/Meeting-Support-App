import { MdInsertDriveFile, MdRemoveRedEye, MdCancel } from "react-icons/md";

type Props = {
  file: File;
  onRemove: () => void;
};

const LocalFilePreview = ({ file, onRemove }: Props) => {
  return (
    <div className="w-full flex flex-col flex-shrink-0 text-sm pl-2 pr-3 rounded-xl bg-mblue-100 p-2 space-x-1 space-y-2 truncate">
      <span className="flex space-x-1 items-center px-1 text-mblue-600">
        <MdInsertDriveFile className="flex-shrink-0" />
        <p className="text-sm truncate">{file.name}</p>
      </span>
      <div className="flex space-x-2 text-mblue-600 text-sm font-medium">
        <a href={URL.createObjectURL(file)} target="_blank" rel="noreferrer">
          <button
            type="button"
            className="px-2.5 py-1 rounded-xl bg-white flex items-center justify-center space-x-1.5"
          >
            <MdRemoveRedEye className="h-4 w-4" />
            <p className="text-xs">View PDF</p>
          </button>
        </a>
        <button
          type="button"
          onClick={onRemove}
          className="px-2.5 py-1 rounded-xl bg-white flex items-center justify-center space-x-1.5"
        >
          <MdCancel className="h-4 w-4" />
          <p className="text-xs">Remove</p>
        </button>
      </div>
    </div>
  );
};

export default LocalFilePreview;
