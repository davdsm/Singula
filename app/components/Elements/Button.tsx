import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { DelayedLink } from "./Link";

export const Button = ({
  firstText,
  secondText,
  to,
  className,
}: {
  firstText: string;
  secondText: string;
  to: string;
  className?: string;
}) => {
  return (
    <DelayedLink
      to={to}
      className={`inline-block bg-singula-black p-2 rounded-3xl pr-4 ${className}`}
    >
      <span className="bg-singula-main text-white font-bold p-2 uppercase rounded-3xl text-md">
        {firstText}
      </span>
      <span className="text-singula-main text-lg mx-4">{secondText}</span>
      <FontAwesomeIcon icon={faArrowRight} className="text-singula-main" />
    </DelayedLink>
  );
};
