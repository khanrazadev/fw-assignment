import React, { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { BsPencil, BsTrash3 } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { celebsTypes } from "../types/types";
import { useDispatch } from "react-redux";
import { editCeleb } from "../store/CelebiritySlice";
import ConfirmationModal from "./ConfirmationModal";
import { toast } from "react-hot-toast";

interface CelebDetailsProps {
  celeb: celebsTypes;
  isEditCelebDetails: boolean | null;
  activeCelebTab: number | null;
  setIsEditCelebDetails: (value: boolean) => void;
  firstName: string | undefined;
  lastName: string | undefined;
  setFirstName: (firstName: string | undefined) => void;
  setLastName: (lastName: string | undefined) => void;
  setPicture: (p: string) => void;
  picture: string;
}

const CelebDetails: React.FC<CelebDetailsProps> = ({
  celeb,
  isEditCelebDetails,
  activeCelebTab,
  setIsEditCelebDetails,
  firstName,
  lastName,
  setFirstName,
  setLastName,
  setPicture,
  picture,
}: CelebDetailsProps) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<
    boolean | null
  >(false);
  const dispatch = useDispatch();

  const [inputAge, setInputAge] = useState<string>(celeb.dob.toString());
  const [selectGender, setSelectGender] = useState<string>(celeb.gender);
  const [inputCountry, setInputCountry] = useState<string>(celeb.country);
  const [inputDescription, setInputDescription] = useState<string>(
    celeb.description
  );

  const genderOptions = [
    "Male",
    "Female",
    "Transgender",
    "Rather not say",
    "Others",
  ];

  const dobToAge = new Date().getFullYear() - new Date(celeb.dob).getFullYear();
  const age = dobToAge.toString();
  function convertAgeToDob(age: number) {
    if (age >= 0 && age < 150) {
      // Add a reasonable age range
      const currentYear = new Date().getFullYear();
      const dobYear = currentYear - age;
      const dob = new Date(dobYear, 0, 12); // Assuming January 1 for the date
      return dob.toISOString().split("T")[0];
    } else {
      // Handle an invalid age input
      return toast.error("Invalid Age");
    }
  }

  const isEditable = isEditCelebDetails && activeCelebTab === celeb.id;

  const editDetailsHandler = () => {
    const minimumEditingAge = 18;

    if (parseInt(age) >= minimumEditingAge) {
      setIsEditCelebDetails(!isEditCelebDetails);
    } else {
      toast.error("You may edit the user only if they are an adult.");
    }
  };

  const saveEditedDetails = () => {
    try {
      const updatedDetails: celebsTypes = {
        id: celeb.id,
        first: firstName || "",
        last: lastName || "",
        dob: celeb.dob,
        gender: celeb.gender,
        picture: celeb.picture,
        country: celeb.country,
        description: celeb.description,
      };

      const updateIfChanged = <K extends keyof Partial<celebsTypes>>(
        key: K,
        value: string
      ) => {
        if (isEditCelebDetails) {
          if (value !== celeb[key]) {
            updatedDetails[key] = value as celebsTypes[K];
          }
        }
      };

      updateIfChanged("dob", inputAge);
      updateIfChanged("gender", selectGender);
      updateIfChanged("country", inputCountry);
      updateIfChanged("description", inputDescription);
      updateIfChanged("picture", picture);

      dispatch(editCeleb(updatedDetails));
      setIsEditCelebDetails(false);

      // Show a success toast if everything goes well.
      toast.success("Updated successfully!");
    } catch (error) {
      // Show an error toast if an exception occurs.
      toast.error("An error occurred while saving.");
    }
  };

  const modalVisibilityHandler = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };

  const handleInputChange = (key: string, value: string) => {
    if (isEditable) {
      switch (key) {
        case "inputAge":
          // Convert age to date when input changes
          setInputAge(convertAgeToDob(parseInt(value, 10)));

          break;
        case "picture":
          setPicture(value);
          break;
        case "selectGender":
          setSelectGender(value);
          break;
        case "inputCountry":
          setInputCountry(value);
          break;
        case "inputDescription":
          setInputDescription(value);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (isEditCelebDetails) {
      setInputAge(celeb.dob.toString());
      setFirstName(celeb.first);
      setLastName(celeb.last);
      setSelectGender(celeb.gender);
      setInputCountry(celeb.country);
      setPicture(celeb.picture);
      setInputDescription(celeb.description);
    }
  }, [isEditCelebDetails, celeb]);

  return (
    <>
      <div className="flex items-center justify-between w-5/6 px-4">
        <div>
          <p className="text-neutral-500">Age</p>
          <p>
            {isEditable ? (
              <input
                className="border-2 border-base-300 rounded-xl px-2 py-1 focus:outline-none w-28"
                defaultValue={age}
                type="number"
                onChange={(e) => handleInputChange("inputAge", e.target.value)}
              />
            ) : (
              age
            )}
          </p>
        </div>
        <div>
          <p className="text-neutral-500">Gender</p>
          {isEditable ? (
            <GenderDropdown
              genderOptions={genderOptions}
              selectGender={selectGender}
              handleSelectGender={(value) =>
                handleInputChange("selectGender", value)
              }
            />
          ) : (
            <p>{celeb.gender}</p>
          )}
        </div>
        <div>
          <p className="text-neutral-500">Country</p>
          <p>
            {isEditable ? (
              <input
                className="border-2 border-base-300 rounded-xl px-2 py-1 focus:outline-none w-28"
                value={inputCountry}
                type="text"
                onKeyPress={(e) => {
                  const charCode = e.charCode;
                  if (!/^[A-Za-z\s]$/.test(String.fromCharCode(charCode))) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) =>
                  handleInputChange("inputCountry", e.target.value)
                }
              />
            ) : (
              celeb.country
            )}
          </p>
        </div>
      </div>
      <div>
        <p className="text-neutral-500">Description</p>
        <p>
          {isEditable ? (
            <textarea
              className="border-2 border-base-300 rounded-xl px-2 py-1 focus:outline-none w-full h-[9rem]"
              value={inputDescription}
              onChange={(e) =>
                handleInputChange("inputDescription", e.target.value)
              }
            />
          ) : (
            celeb.description
          )}
        </p>
      </div>
      <div className="cursor-pointer text-blue-500 flex gap-6 items-center justify-end">
        {isEditable ? (
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
        {isEditable ? (
          <AiOutlineCheckCircle
            size="25px"
            color="green"
            onClick={saveEditedDetails}
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
      {isDeleteModalVisible && <ConfirmationModal celebId={celeb.id} />}
    </>
  );
};

interface GenderDropdownProps {
  selectGender: string;
  handleSelectGender: (value: string) => void;
  genderOptions: string[];
}

const GenderDropdown: React.FC<GenderDropdownProps> = ({
  selectGender,
  handleSelectGender,
  genderOptions,
}: GenderDropdownProps) => {
  return (
    <details className="dropdown">
      <summary className="border-2 w-[10rem] border-base-300 rounded-lg px-4 py-1">
        {selectGender}
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 border-base-300 border mt-1 rounded-lg w-52">
        {genderOptions.map((option, index) => (
          <li
            key={index}
            value={option}
            className="border-b px-3 py-2 hover:bg-base-300 rounded-lg"
            onClick={() => {
              handleSelectGender(option);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </details>
  );
};

export default CelebDetails;
