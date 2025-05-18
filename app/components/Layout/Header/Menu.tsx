import { useTranslation } from "react-i18next";
import { DelayedLink } from "~/components/Elements/Link";

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
            <DelayedLink
              to={item.link}
              className="hover:text-gray-400 transition duration-300 uppercase"
            >
              {t(item.key)}
            </DelayedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
