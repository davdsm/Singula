import { motion } from "framer-motion";
import { Logo } from "~/components/Elements/Logo";
import { Menu } from "./Menu";
import { SearchBar } from "./Searchbar";
import { WhatsApp } from "./WhatsApp";
import { LanguageSelector } from "./LanguageSelector";
import { Hamburger } from "./Hamburger";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

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
  const [sidebar, setSidebar] = useState(false);

  const menuList: {
    key: string;
    link: string;
  }[] = [
    {
      key: "menu.about",
      link: "/about",
    },
    {
      key: "menu.products",
      link: "/products",
    },
    {
      key: "menu.materials",
      link: "/materials",
    },
    {
      key: "menu.catalog",
      link: "/catalog",
    },
    {
      key: "menu.contacts",
      link: "/contacts",
    },
  ];

  return (
    <>
      <motion.header
        /* initial={{ opacity: 0, y: -20, x: "-50%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }} */
        className="p-5 px-8 md:px-14 bg-black w-4/5 rounded-[4rem] flex justify-between items-center fixed top-10 left-1/2 translate-x-[-50%] z-10"
      >
        {logo && <Logo width={112} height={26} />}
        {menu && <Menu list={menuList} />}
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
          {menu && (
            <Hamburger
              open={() => setSidebar(true)}
              close={() => setTimeout(() => setSidebar(false), 10)}
            />
          )}
        </div>
      </motion.header>

      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: sidebar ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 25 }}
      >
        <Sidebar list={menuList} open={sidebar} />
      </motion.aside>
    </>
  );
};

export default Header;
