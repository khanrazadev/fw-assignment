import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash3, BsPencil } from "react-icons/bs";
import { CelebAccordionProps } from "../types/types";
import { DailogBox } from "./DailogBox";

export const CelebAccordion: React.FC<CelebAccordionProps> = ({
  celebsData,
}) => {
  const [activeCelebTab, setActiveCelebTab] = useState<number | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<
    boolean | null
  >();

  //Function to manage visibility of Celeb's tab
  const toggleAccordion = (index: number) => {
    setActiveCelebTab(activeCelebTab === index ? null : index);
  };

  const modalVisibilityHandler = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };

  // Function to get celeb's age
  const getAgeOfCeleb = (dob: string) => {
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    return isNaN(age) ? null : age;
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {isDeleteModalVisible && <DailogBox />}

      {celebsData.map((celeb, index) => (
        <div
          key={index}
          className="mb-4 cursor-pointer border-2 border-base-300 rounded-xl p-4 flex flex-col gap-5"
          onClick={() => toggleAccordion(index)}
        >
          <div className=" flex text-xl font-semibold gap-4">
            <div className=" flex justify-between items-center w-full">
              <div className=" flex items-center gap-6">
                <img
                  src={celeb.picture}
                  alt={celeb.first}
                  className="border w-16 h-16 rounded-full object-cover"
                />
                <div>
                  {celeb.first} {celeb.last}
                </div>
              </div>
              <div className=" cursor-pointer  text-base text-neutral-400">
                {activeCelebTab === index ? (
                  <AiOutlineMinus />
                ) : (
                  <AiOutlinePlus />
                )}
              </div>
            </div>
          </div>

          {/* details  of celeb  */}
          {activeCelebTab === index && (
            <>
              <div className=" flex items-center justify-between w-5/6 px-4">
                <div>
                  <p className=" text-neutral-500">Age</p>
                  <p>{getAgeOfCeleb(celeb.dob)}</p>
                </div>
                <div>
                  <p className=" text-neutral-500">Gender</p>
                  <p>{celeb.gender}</p>
                </div>
                <div>
                  <p className=" text-neutral-500">Country</p>
                  <p>{celeb.country}</p>
                </div>
              </div>

              <div>
                <p className=" text-neutral-500">Description</p>
                <p>{celeb.description}</p>
              </div>

              {/* update & delete button */}
              <div className=" cursor-pointer text-blue-500 flex gap-6 items-center justify-end">
                <BsTrash3
                  size="25px"
                  color="red"
                  onClick={modalVisibilityHandler}
                />
                <BsPencil size="20px" />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
