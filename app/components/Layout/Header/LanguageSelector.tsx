import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const languages: string[] = ["EN", "PT", "FR", "ES"];

export const LanguageSelector = (): JSX.Element => {
  const [selectedLang, setSelectedLang] = useState<string>("PT");
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (): void => {
    setOpen((prev) => !prev);
  };

  const handleSelect = (lang: string): void => {
    setSelectedLang(lang);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center font-medium focus:outline-none"
      >
        {selectedLang}
        <FontAwesomeIcon icon={faChevronDown} className="ml-2 w-3 h-3" />
      </button>

      <div
        className={`absolute right-0 z-10 mt-2 w-24 origin-top-right transform transition-all duration-200 ease-out ${
          open
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        } bg-stone-900 rounded shadow-lg`}
      >
        <ul className="py-1 text-gray-700">
          {languages
            .filter((lang) => lang !== selectedLang)
            .map((lang) => (
              <li key={lang}>
                <button
                  onClick={() => handleSelect(lang)}
                  className="w-full px-4 py-2 text-white text-left hover:bg-stone-800"
                >
                  {lang}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
