import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { celebsTypes } from "../types/types";

export function CelebsHeader({
  celeb,
  isEditCelebDetails,
  activeCelebTab,
  inputChangeHandler,
}: {
  celeb: celebsTypes;
  isEditCelebDetails: boolean | null;
  activeCelebTab: null | number;
  inputChangeHandler: (value: string) => void;
}) {
  return (
    <div className=" flex text-xl font-semibold gap-4">
      <div className=" flex justify-between items-center w-full">
        <div className=" flex items-center gap-4">
          <img
            src={celeb.picture}
            alt={celeb.first}
            className="border w-16 h-16 rounded-full object-cover"
          />
          <div>
            {isEditCelebDetails && activeCelebTab === celeb.id ? (
              <input
                className=" border-2 border-base-300 rounded-xl px-2 py-1 focus:outline-none w-28"
                defaultValue={`${celeb.first} ${celeb.last}`}
                onChange={(e) => inputChangeHandler(e.target.value)}
              />
            ) : (
              <>
                {celeb.first} {celeb.last}
              </>
            )}
          </div>
        </div>
        <div className=" cursor-pointer  text-base text-neutral-400">
          {activeCelebTab === celeb.id ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
    </div>
  );
}
