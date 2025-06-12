import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { DelayedLink } from "./Link";

export const Button = ({
  firstText,
  secondText,
  to,
  className,
  target,
  onClick,
}: {
  firstText: string;
  secondText: string;
  to: string;
  className?: string;
  target?: string;
  onClick?: () => void;
}) => {
  return (
    <DelayedLink
      to={to}
      onClick={onClick}
      target={target}
      className={`group hover:bg-singula-main hover:translate-y-[-2px] transition-all transition duration-700 inline-block bg-singula-black p-2 rounded-3xl pr-4 flex items-center ${
        className ?? ""
      }`}
    >
      <span className="bg-singula-mainDarker text-white font-bold p-2 uppercase rounded-3xl text-md">
        {firstText}
      </span>
      <span className="transition-colors duration-300 group-hover:text-white text-singula-main text-lg mx-4">
        {secondText}
      </span>
      <FontAwesomeIcon
        icon={faArrowRight}
        className="w-4 h-4 text-singula-main transition-colors group-hover:text-white duration-300"
      />
    </DelayedLink>
  );
};
