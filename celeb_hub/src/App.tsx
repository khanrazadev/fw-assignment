import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { getCelebsData } from "./store/CelebiritySlice";
import { celebsTypes } from "./types/types";
import CelebAccordion from "./components/CelebAccordion";
import { LightAndDarkButton } from "./components/LightAndDarkButton";

function App() {
  const celebsData = useSelector(getCelebsData);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredCelebs, setFilteredCelebs] = useState<celebsTypes[]>([]);

  useEffect(() => {
    const searchLower = searchInput.toLowerCase();
    const filteredData = celebsData.celebs.filter((celeb) => {
      return Object.values(celeb).some(
        (val) =>
          typeof val === "string" && val.toLowerCase().includes(searchLower)
      );
    });
    setFilteredCelebs(filteredData);
  }, [searchInput, celebsData]);

  return (
    <div className="flex flex-col gap-4 lg:mx-52 mx-7 min-h-screen py-40">
      <LightAndDarkButton />
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      {filteredCelebs.length === 0 ? (
        <div className="text-xl italic flex justify-center items-center">
          No data found.
        </div>
      ) : (
        <CelebAccordion celebsData={filteredCelebs} />
      )}
    </div>
  );
}

const SearchBar: React.FC<{
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
  const { searchInput, setSearchInput } = props;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex p-3 text-neutral-500 gap-3 items-center rounded-lg border-2 border-base-300 h-14">
        <BsSearch color="grey" />
        <input
          className="bg-transparent text-primary focus:outline-none w-full italic placeholder-neutral-400"
          placeholder="Search celebs"
          value={searchInput}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default App;
