import { motion } from "framer-motion";
import { Logo } from "~/components/Elements/Logo";
import { Menu } from "./Menu";
import { SearchBar } from "./Searchbar";
import { WhatsApp } from "./WhatsApp";
import { LanguageSelector } from "./LanguageSelector";
import { Hamburger } from "./Hamburger";
import { Sidebar } from "./Sidebar";
import { useEffect, useState } from "react";
import { useUrlParams } from "~/hooks/useUrlParams";
import { useHeader } from "~/context/HeaderContext";
import CookieConsent from "./CookieConsent";
import { DelayedLink } from "~/components/Elements/Link";
import { useCart } from "~/hooks/useCart";

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
  const [appear, setAppear] = useState(true);
  const [Cookies, setCookies] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { totalUnits } = useCart();

  useUrlParams();
  const { showHeader, setShowHeader, delayMenu, setDelayMenu } = useHeader();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        delayMenu && setDelayMenu(false);
        !showHeader && setShowHeader(true);
        setAppear(false); // scrolling down
      } else {
        setAppear(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (!localStorage.getItem("cookies-consent")) {
      setCookies(true);
    }
  }, []);

  const menuList: {
    key: string;
    link: string;
  }[] = [
    {
      key: "menu.products",
      link: "/products",
    },
    {
      key: "menu.about",
      link: "/about",
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

  const closeCookieConsent = () => {
    localStorage.setItem("cookies-consent", "true");
    setCookies(false);
  };

  return (
    <>
      {showHeader && (
        <>
          <motion.header
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{
              y: appear ? 0 : -20,
              opacity: appear ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              delay: delayMenu ? 5 : lastScrollY === 0 ? 0.8 : 0,
            }}
            className="border border-singula-border z-[90] md:z-40 p-5 px-8 md:px-14 bg-black w-4/5 rounded-[4rem] flex justify-between items-center fixed top-10 left-1/2 translate-x-[-50%]"
          >
            {logo && (
              <Logo width={112} height={26} className="w-full  md:w-[10%]" />
            )}
            {menu && <Menu list={menuList} />}
            <div className="w-full md:w-[40%] flex items-center justify-end">
              {searchbar && <SearchBar showMobile={false} />}
              <DelayedLink
                to="/quote"
                className="relative inline-flex items-center justify-center text-white hover:text-singula-main transition-colors ml-4 mr-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                  />
                </svg>
                {totalUnits > 0 && (
                  <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] px-1 rounded-full bg-singula-main text-white text-[10px] font-bold leading-[18px] text-center">
                    {totalUnits}
                  </span>
                )}
              </DelayedLink>
              {whatsApp && <WhatsApp />}
              {lang && <LanguageSelector />}
              {menu && (
                <Hamburger
                  status={sidebar}
                  open={() => setSidebar(true)}
                  close={() => setTimeout(() => setSidebar(false), 10)}
                />
              )}
            </div>
          </motion.header>

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: sidebar ? "0%" : "-100%" }}
            transition={{
              duration: sidebar ? 0.5 : 0,
              ease: "easeInOut",
              delay: 0,
            }}
            className="z-40 fixed top-0 left-0 w-full h-dvh"
          >
            <Sidebar
              list={menuList}
              open={sidebar}
              hide={() => setTimeout(() => setSidebar(false), 10)}
            />
          </motion.aside>
        </>
      )}
      <CookieConsent open={Cookies} close={closeCookieConsent} />
    </>
  );
};

export default Header;
