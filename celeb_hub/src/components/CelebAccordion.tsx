import { useState } from "react";
import { celebsData } from "../types/types";
import { CelebDetails } from "./CelebDetails";
import { CelebHeader } from "./CelebHeader";

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
  const toggleAccordion = (index: number) => {
    if (isEditCelebDetails) return;
    setActiveCelebTab(activeCelebTab === index ? null : index);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {celebsData.map((celeb, index) => (
        <>
          {/* details  of celeb  */}
          {activeCelebTab === index && (
            <>
              <CelebHeader
                celeb={celeb}
                index={index}
                toggleAccordion={toggleAccordion}
                isEditCelebDetails={isEditCelebDetails}
                activeCelebTab={activeCelebTab}
                inputChangeHandler={inputChangeHandler}
              />
              <CelebDetails
                celeb={celeb}
                isEditCelebDetails={isEditCelebDetails}
                activeCelebTab={activeCelebTab}
                index={index}
                inputChangeHandler={inputChangeHandler}
                setIsEditCelebDetails={setIsEditCelebDetails}
              />
            </>
          )}
        </>
      ))}
    </div>
  );
};
