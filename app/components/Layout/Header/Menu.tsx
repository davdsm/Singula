import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export const Menu = ({
  list,
}: {
  list: {
    key: string;
    link: string;
  }[];
}) => {
  const { t } = useTranslation();
  return (
    <nav className="hidden md:flex">
      <ul className="ml-40 justify-between items-center w-half flex">
        {list.map((item) => (
          <li key={item.key} className="text-white text-lg mx-2">
            <Link
              to={item.link}
              className="hover:text-gray-400 transition duration-300 uppercase"
            >
              {t(item.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
