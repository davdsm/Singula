import { motion } from "framer-motion";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export const Sidebar = ({
  list,
  open,
}: {
  list: {
    key: string;
    link: string;
  }[];
  open: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <nav className="fixed w-full h-dvh bg-stone-950 text-white flex justify-center items-center z-[90]">
      <ul className="justify-between items-center w-half flex flex-col">
        {open &&
          list.map((item, index) => (
            <motion.li
              key={`menu-${index}`}
              className="text-white text-xl mx-2 my-6"
              initial={{ x: "-255px", opacity: 0 }}
              animate={{ x: "0px", opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 25,
                delay: index * 0.1,
              }}
            >
              <Link
                to={item.link}
                className="hover:text-gray-400 transition duration-300 uppercase"
              >
                {t(item.key)}
              </Link>
            </motion.li>
          ))}
      </ul>
    </nav>
  );
};
