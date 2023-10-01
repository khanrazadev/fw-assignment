import { ChangeEvent, useState } from "react";
import { BsSearch } from "react-icons/bs";
export const SearchBar = ({ users, onSearch }: any) => {
  const [searchInput, setSearchInput] = useState<string | null>();

  console.log(searchInput, "raza");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
    handleSearch(input);
  };

  let searchTimeout: NodeJS.Timeout;

  const handleSearch = (input: string) => {
    clearTimeout(searchTimeout);

    // Set a new timeout to trigger the search after the user stops typing for 500 milliseconds (adjust as needed).
    searchTimeout = setTimeout(() => {
      const filteredUsers = users.filter((user: any) =>
        user.name.toLowerCase().includes(input.toLowerCase())
      );
      onSearch(filteredUsers);
    }, 500);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex p-3 gap-3 items-center rounded-lg border-2 border-base-300 h-14">
        <BsSearch color="grey" />
        <input
          className="bg-transparent text-primary focus:outline-none w-full placeholder-primary "
          placeholder="Search User"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
