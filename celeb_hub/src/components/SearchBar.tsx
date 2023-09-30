import { BsSearch } from "react-icons/bs";
export const SearchBar = () => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex p-3 gap-3 items-center rounded-lg border-2 border-base-300 h-10">
        <BsSearch color="grey" />
        <input
          className="bg-transparent focus:outline-none w-full "
          placeholder="Search User"
        />
      </div>
    </div>
  );
};
