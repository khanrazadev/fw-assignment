import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { celebsData } from "../types/types";

export const CelebHeader = ({
  celeb,
  index,
  toggleAccordion,
  isEditCelebDetails,
  activeCelebTab,
  inputChangeHandler,
}: {
  celeb: celebsData;
  index: number;
  toggleAccordion: (value: number) => void;
  isEditCelebDetails: boolean | null;
  activeCelebTab: boolean | number;
  inputChangeHandler: (value: string) => void;
}) => {
  return (
    <div
      key={index}
      className="mb-4 cursor-pointer border-2 border-base-300 rounded-xl p-4 flex flex-col gap-5"
      onClick={() => toggleAccordion(index)}
    >
      <div className=" flex text-xl font-semibold gap-4">
        <div className=" flex justify-between items-center w-full">
          <div className=" flex items-center gap-4">
            <img
              src={celeb.picture}
              alt={celeb.first}
              className="border w-16 h-16 rounded-full object-cover"
            />
            <div>
              {isEditCelebDetails && activeCelebTab === index ? (
                <input
                  className=" border-2 border-base-300 rounded-xl px-2 py-1 focus:outline-none w-28"
                  defaultValue={`                        ${celeb.first} ${celeb.last}
                  `}
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
            {activeCelebTab === index ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </div>
        </div>
      </div>
    </div>
  );
};
