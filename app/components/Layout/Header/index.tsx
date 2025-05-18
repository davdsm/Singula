import { Logo } from "~/components/Elements/Logo";
import { Menu } from "./Menu";
import { SearchBar } from "./Searchbar";
import { WhatsApp } from "./WhatsApp";
import { LanguageSelector } from "./LanguageSelector";
import { Hamburger } from "./Hamburger";

export const Header = ({
  logo = true,
  menu = true,
  searchbar = true,
  whatsApp = true,
  lang = true,
}: {
  logo?: boolean;
  menu?: boolean;
  searchbar?: boolean;
  whatsApp?: boolean;
  lang?: boolean;
}) => {
  return (
    <div className="p-5 px-8 md:px-14 bg-black w-4/5 rounded-[4rem] m-auto flex justify-between items-center">
      {logo && <Logo width={112} height={26} />}
      {menu && <Menu />}
      <div className="flex items-center justify-between">
        {searchbar && (
          <SearchBar
            onSearch={(searchText: string) =>
              console.log(`search...${searchText}`)
            }
          />
        )}
        {whatsApp && <WhatsApp />}
        {lang && <LanguageSelector />}
        {menu && <Hamburger />}
      </div>
    </div>
  );
};

export default Header;
