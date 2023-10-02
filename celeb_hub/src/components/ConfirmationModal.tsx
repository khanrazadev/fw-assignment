import { RxCross2 } from "react-icons/rx";

export const ConfirmationModal = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm">
      <div className=" w-[30rem] border-2 border-base-300 rounded-xl p-3 my-2 flex flex-col gap-6 bg-primary-content">
        <div className="flex justify-between items-center text-neutral-400 px-4">
          <p className="text-primary">Are you sure you want to delete?</p>
          <button>
            <RxCross2 />
          </button>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => {}}
            className="border-2 border-base-300 rounded-lg py-1 px-6 text-primary"
          >
            Cancel
          </button>
          <button className="rounded-lg py-1 px-6 bg-red-500 text-gray-50">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
