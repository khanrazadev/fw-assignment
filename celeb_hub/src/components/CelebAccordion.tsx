import { useState } from "react";
import { CelebDetails } from "./CelebDetails";
import { celebsTypes } from "../types/types";
import { CelebsHeader } from "./CelebHeader";

export const CelebAccordion = ({
  celebsData,
}: {
  celebsData: celebsTypes[];
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
          <CelebsHeader
            celeb={celeb}
            isEditCelebDetails={isEditCelebDetails}
            activeCelebTab={activeCelebTab}
            inputChangeHandler={inputChangeHandler}
          />
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
