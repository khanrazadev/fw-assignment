import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { celebsTypes } from "../types/types";
import { ChangeEvent, useState, useEffect } from "react";

const PICTURE_SIZE = "w-16 h-16"; // Common picture size class
const INPUT_STYLE =
  "border-2 border-base-300 rounded-xl px-2 py-1 focus:outline-none w-20";

interface CelebsHeaderProps {
  celeb: celebsTypes;
  isEditCelebDetails: boolean | null;
  activeCelebTab: null | number;
  setFirstName: (firstName: string | undefined) => void;
  setLastName: (lastName: string | undefined) => void;
  setPicture: (p: string) => void;
  picture: string;
}

export function CelebsHeader({
  celeb,
  isEditCelebDetails,
  activeCelebTab,
  setFirstName,
  setLastName,
  setPicture,
  picture,
}: CelebsHeaderProps) {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target instanceof FileReader) {
          setPicture(URL.createObjectURL(file));
        }
      };
      reader.readAsDataURL(file);
    }
  }, [file, setPicture]);

  const isEditing = isEditCelebDetails && activeCelebTab === celeb.id;

  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null); // Set to null if selectedFile is undefined
  };

  return (
    <div className="flex text-xl font-semibold gap-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          {isEditing ? (
            <label
              className={`cursor-pointer ${PICTURE_SIZE} rounded-full overflow-hidden`}
            >
              <img
                src={picture}
                alt={celeb.first}
                className={`w-full h-full object-cover`}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePictureChange}
              />
            </label>
          ) : (
            <img
              src={celeb.picture}
              alt={celeb.first}
              className={`border ${PICTURE_SIZE} rounded-full object-cover`}
            />
          )}

          <div>
            {isEditing ? (
              <div className="flex gap-1">
                <input
                  className={INPUT_STYLE}
                  defaultValue={celeb.first}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className={INPUT_STYLE}
                  defaultValue={celeb.last}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            ) : (
              <>
                {celeb.first} {celeb.last}
              </>
            )}
          </div>
        </div>
        <div className="cursor-pointer text-base text-neutral-400">
          {activeCelebTab === celeb.id ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
    </div>
  );
}
