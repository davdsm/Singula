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
        initial={{ opacity: 0, y: -20, x: "-50%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="border border-singula-border z-[90] md:z-40 p-5 px-8 md:px-14 bg-black w-4/5 rounded-[4rem] flex justify-between items-center fixed top-10 left-1/2 translate-x-[-50%]"
      >
        {logo && <Logo width={112} height={26} className="w-[112px] h-[26px]" />}
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
        transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
        className="z-40 fixed top-0 left-0 w-full h-dvh"
      >
        <Sidebar list={menuList} open={sidebar} />
      </motion.aside>
    </>
  );
};

export default Header;
