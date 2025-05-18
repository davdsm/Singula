import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchBar = ({ onSearch }: { onSearch: Function }) => {
  const [searchText, setSearchText] = useState<string>("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchText);
  };

  return (
    <form className="hidden md:block relative text-gray-600" action="" onSubmit={submit}>
      <input
        type="text"
        name="search"
        placeholder="Pesquisar..."
        className="bg-stone-900 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none text-white"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button type="submit" className="absolute right-0 mt-2 mr-4 text-white">
        <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
      </button>
    </form>
  );
};
