import { useEffect, useRef, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const look = url.searchParams.get("look");
  const design = url.searchParams.get("design");

  return { look, design };
};

export const SearchBar = ({
  showMobile,
  closeSidebar,
}: {
  showMobile: boolean;
  closeSidebar?: Function;
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchParams] = useSearchParams();
  const element = useRef(null);
  const searchString = searchParams.get("look");
  const isDesign = searchParams.get("design");

  const navigate = useNavigate();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeSidebar && closeSidebar();
    element.current?.blur();
    navigate(`/search?look=${searchText}`);
  };

  const { t } = useTranslation();

  useEffect(() => {
    if (!isDesign) {
      setSearchText(searchString ?? "");
    }
  }, [searchString]);

  return (
    <form
      className={`${
        showMobile ? "absolute -bottom-8" : "hidden"
      } flex relative text-gray-600 items-center`}
      action=""
      onSubmit={submit}
    >
      <input
        ref={element}
        type="text"
        name="search"
        placeholder={t("menu.search")}
        className="bg-stone-900 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none text-white"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button type="submit" className="absolute right-0 mr-4 text-white">
        <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
      </button>
    </form>
  );
};
