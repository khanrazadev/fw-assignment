import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { celebsData } from "../types/types";
import { CelebDetails } from "./CelebDetails";

export const CelebAccordion = ({
  celebsData,
}: {
  celebsData: celebsData[];
}) => {
  const [activeCelebTab, setActiveCelebTab] = useState<number | null>(null);
  const [isEditCelebDetails, setIsEditCelebDetails] = useState<boolean | null>(
    false
  );

  const inputChangeHandler = (value: string) => {
    console.log(value);
  };

  //Function to manage visibility of Celeb's tab
  const toggleAccordion = (id: number) => {
    if (isEditCelebDetails) return;
    setActiveCelebTab(activeCelebTab === id ? null : id);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {celebsData.map((celeb, index) => (
        <div
          key={index}
          className="mb-4 cursor-pointer border-2 border-base-300 rounded-xl p-4 flex flex-col gap-5"
          onClick={() => toggleAccordion(celeb.id)}
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
                {activeCelebTab === celeb.id ? (
                  <AiOutlineMinus />
                ) : (
                  <AiOutlinePlus />
                )}
              </div>
            </div>
          </div>

          {/* details  of celeb  */}
          {activeCelebTab === celeb.id && (
            <CelebDetails
              celeb={celeb}
              isEditCelebDetails={isEditCelebDetails}
              activeCelebTab={activeCelebTab}
              inputChangeHandler={inputChangeHandler}
              setIsEditCelebDetails={setIsEditCelebDetails}
            />
          )}
        </div>
      ))}
    </div>
  );
};
