import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from "@remix-run/react";

export const WhatsApp = () => {
  return (
    <Link
      to="https://wa.me/+351924009275"
      aria-label="Contact on WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-400 transition duration-300 mx-4"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
    </Link>
  );
};
