import { HiOutlineDocument } from "react-icons/hi2";
import { HiOutlinePhoto } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

interface Props {
  file: File;
  removeFile: (name: string) => void;
  fileProgress: { [key: string]: number };
}

export const FileDisplayItem = ({ file, removeFile, fileProgress }: Props) => {
  return (
    <div
      key={file.name}
      className="grid grid-cols-12 gap-2 rounded-md bg-gray-100 p-2 px-3 text-xs md:text-sm"
    >
      <div className="col-span-2 flex items-center justify-center ">
        <div className="rounded border border-gray-300 px-2 py-3 md:px-3">
          {file.name.split(".")[1] === "pdf" ? (
            <HiOutlineDocument className="text-2xl text-blue-500" />
          ) : (
            <HiOutlinePhoto className="text-2xl text-blue-500" />
          )}
        </div>
      </div>

      <div className="col-span-10 space-y-2 md:space-y-0">
        <div className="flex justify-between">
          <div>
            <p className="line-clamp-1 w-2/3 text-xs md:w-full">{file.name}</p>
            <p>{(file.size / 1024 / 1024).toFixed(2)}MB</p>
          </div>

          <HiMiniXMark
            onClick={() => removeFile(file.name)}
            className="cursor-pointer bg-none text-red-600 hover:text-rose-700"
          />
        </div>

        <div className="grid grid-cols-12 gap-2 md:gap-0 ">
          <div className="col-span-10 flex items-center justify-center">
            <div className="h-1 w-full flex-grow rounded bg-gray-200">
              <div
                className="h-1 rounded-xl bg-blue-600"
                style={{ width: `${fileProgress[file.name]}%` }}
              ></div>
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-center text-sm text-gray-600">
            <span className="text-xs md:text-sm">
              {fileProgress[file.name]}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
