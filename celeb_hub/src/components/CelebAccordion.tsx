import { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { BsTrash3, BsPencil } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { CelebAccordionProps } from "../types/types";
import { DailogBox } from "./DailogBox";

export const CelebAccordion: React.FC<CelebAccordionProps> = ({
  celebsData,
}) => {
  const [name, setName] = useState<string>();
  const [age, setAge] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [description, setDescription] = useState<string>();

  const [activeCelebTab, setActiveCelebTab] = useState<number | null>(null);
  const [editCelebDetails, setEditCelebDetails] = useState<boolean | null>(
    false
  );
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<
    boolean | null
  >();

  //gender options
  const genderOptions = [
    "Male",
    "Female",
    "Transgender",
    "Rather not say",
    "Others",
  ];
  //edit change handler

  const inputChangeHandler = (value: any) => {
    console.log(value);
  };
  //Function to manage visibility of Celeb's tab
  const toggleAccordion = (index: number) => {
    if (editCelebDetails) return;
    setActiveCelebTab(activeCelebTab === index ? null : index);
  };

  const modalVisibilityHandler = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };
  const editDetailsHandler = () => {
    setEditCelebDetails(!editCelebDetails);
  };

  // Function to get celeb's age
  const getAgeOfCeleb = (dob: string) => {
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    return isNaN(age) ? null : age;
  };

  //Custom inputs to edit the details of celebs>
  const CustomInputTab = ({
    value,
    e,
  }: {
    value: any;
    e: React.ChangeEvent<HTMLInputElement>; // Change this type according to your use case
  }) => {
    return (
      <input
        className=" border-2 border-base-300 rounded-xl px-2 py-1 focus:outline-none w-28"
        defaultValue={value}
        onChange={(e) => inputChangeHandler(e.target.value)}
      />
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {isDeleteModalVisible && <DailogBox />}

      {celebsData.map((celeb, index) => (
        <form>
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
                    {editCelebDetails && activeCelebTab === index ? (
                      <CustomInputTab
                        value={`${celeb.first} ${celeb.last}`}
                        e={(e) => e}
                      />
                    ) : (
                      <>
                        {celeb.first} {celeb.last}
                      </>
                    )}
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
                    <p>
                      {editCelebDetails && activeCelebTab === index ? (
                        <CustomInputTab
                          value={getAgeOfCeleb(celeb.dob)}
                          e={(e) => e}
                        />
                      ) : (
                        <>{getAgeOfCeleb(celeb.dob)}</>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className=" text-neutral-500">Gender</p>
                    {editCelebDetails && activeCelebTab === index ? (
                      <details className="dropdown">
                        <summary className="  border-2 border-base-300 rounded-lg px-4 py-1">
                          {celeb.gender}
                        </summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 border-base-300 border mt-1 rounded-lg w-52">
                          {genderOptions.map((option, index) => (
                            <li
                              key={index}
                              value={option}
                              className=" border-b px-3 py-2 hover:bg-base-300 rounded-lg"
                              onClick={() => {
                                inputChangeHandler(option);
                              }}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <p>{celeb.gender}</p>
                    )}
                  </div>
                  <div>
                    <p className=" text-neutral-500">Country</p>
                    <p>
                      {editCelebDetails && activeCelebTab === index ? (
                        <CustomInputTab value={celeb.country} />
                      ) : (
                        <>{celeb.country}</>
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  <p className=" text-neutral-500">Description</p>
                  <p>
                    {editCelebDetails && activeCelebTab === index ? (
                      <textarea
                        className=" border-2 border-base-300 rounded-xl px-2 py-1 focus:outline-none w-full h-[9rem]"
                        defaultValue={celeb.description}
                      />
                    ) : (
                      <>{celeb.description}</>
                    )}
                  </p>
                </div>

                {/* update & delete button */}
                <div className=" cursor-pointer text-blue-500 flex gap-6 items-center justify-end">
                  {editCelebDetails && activeCelebTab === index ? (
                    <RxCrossCircled
                      size="25px"
                      color="red"
                      onClick={() => setEditCelebDetails(false)}
                    />
                  ) : (
                    <BsTrash3
                      size="25px"
                      color="red"
                      onClick={(e: React.MouseEvent<SVGElement>) => {
                        e.stopPropagation();

                        modalVisibilityHandler();
                      }}
                    />
                  )}

                  {editCelebDetails && activeCelebTab === index ? (
                    <AiOutlineCheckCircle
                      size="25px"
                      color="green"
                      onClick={() => {}} //saves the data
                    />
                  ) : (
                    <BsPencil
                      size="20px"
                      onClick={(e: React.MouseEvent<SVGElement>) => {
                        e.stopPropagation();

                        editDetailsHandler();
                      }}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </form>
      ))}
    </div>
  );
};
