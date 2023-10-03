import { useState } from "react";
import { celebsTypes } from "../types/types";
import { CelebsHeader } from "./CelebHeader";
import CelebDetails from "./CelebDetails";

const CelebAccordion = ({ celebsData }: { celebsData: celebsTypes[] }) => {
  const [activeCelebTab, setActiveCelebTab] = useState<number | null>(null);
  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [picture, setPicture] = useState<string>("");
  const [isEditCelebDetails, setIsEditCelebDetails] = useState<boolean | null>(
    false
  );

  // Function to manage visibility of Celeb's tab
  const toggleAccordion = (id: number) => {
    if (isEditCelebDetails) return;
    setActiveCelebTab((prevActiveTab) => (prevActiveTab === id ? null : id));
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {celebsData.map((celeb) => (
        <div
          key={celeb.id}
          className="mb-4 cursor-pointer border-2 border-base-300 rounded-xl p-4 flex flex-col gap-5"
          onClick={() => toggleAccordion(celeb.id)}
        >
          <CelebsHeader
            celeb={celeb}
            isEditCelebDetails={isEditCelebDetails}
            activeCelebTab={activeCelebTab}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setPicture={setPicture}
            picture={picture}
          />
          {/* Details of celeb */}
          {activeCelebTab === celeb.id && (
            <CelebDetails
              celeb={celeb}
              isEditCelebDetails={isEditCelebDetails}
              activeCelebTab={activeCelebTab}
              setIsEditCelebDetails={setIsEditCelebDetails}
              firstName={firstName}
              lastName={lastName}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setPicture={setPicture}
              picture={picture}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CelebAccordion;
