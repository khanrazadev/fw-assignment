import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { BsPencil, BsTrash3 } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { celebsTypes } from "../types/types";
import { ConfirmationModal } from "./ConfirmationModal";
export const CelebDetails = ({
  celeb,
  isEditCelebDetails,
  activeCelebTab,
  inputChangeHandler,
  setIsEditCelebDetails,
}: {
  celeb: celebsTypes;
  isEditCelebDetails: boolean | null;
  activeCelebTab: number | null;
  inputChangeHandler: (value: string) => void;
  setIsEditCelebDetails: (value: boolean) => void;
}) => {
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

  const modalVisibilityHandler = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };

  const editDetailsHandler = () => {
    setIsEditCelebDetails(!isEditCelebDetails);
  };

  //Custom inputs to edit the details of celebs>
  const CustomInputTab = ({
    value,
  }: {
    value: string | number;
    onChange: (value: string) => void;
  }) => {
    return (
      <input
        className=" border-2 border-base-300 rounded-xl px-2 py-1 focus:outline-none w-28"
        defaultValue={value}
        onChange={(e) => inputChangeHandler(e.target.value)}
      />
    );
  };

  const age = new Date().getFullYear() - new Date(celeb.dob).getFullYear();

  return (
    <>
      <div className=" flex items-center justify-between w-5/6 px-4">
        <div>
          <p className=" text-neutral-500">Age</p>
          <p>
            {isEditCelebDetails && activeCelebTab === celeb.id ? (
              <CustomInputTab
                value={age}
                onChange={(value: string) => inputChangeHandler(value)}
              />
            ) : (
              <>{age}</>
            )}
          </p>
        </div>
        <div>
          <p className=" text-neutral-500">Gender</p>
          {isEditCelebDetails && activeCelebTab === celeb.id ? (
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
            {isEditCelebDetails && activeCelebTab === celeb.id ? (
              <CustomInputTab
                value={celeb.country}
                onChange={(value: string) => inputChangeHandler(value)}
              />
            ) : (
              <>{celeb.country}</>
            )}
          </p>
        </div>
      </div>

      <div>
        <p className=" text-neutral-500">Description</p>
        <p>
          {isEditCelebDetails && activeCelebTab === celeb.id ? (
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
        {isEditCelebDetails && activeCelebTab === celeb.id ? (
          <RxCrossCircled
            size="25px"
            color="red"
            onClick={() => setIsEditCelebDetails(false)}
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

        {isEditCelebDetails && activeCelebTab === celeb.id ? (
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
      {isDeleteModalVisible && <ConfirmationModal />}
    </>
  );
};
