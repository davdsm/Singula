import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

export const SearchBar = ({ onSearch }: { onSearch: Function }) => {
  const [searchText, setSearchText] = useState<string>("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchText);
  };

  const { t } = useTranslation();

  return (
    <form
      className="hidden md:block relative text-gray-600"
      action=""
      onSubmit={submit}
    >
      <input
        type="text"
        name="search"
        placeholder={t("menu.search")}
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
