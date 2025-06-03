import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import { faEnvelope, faPlaneCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { DelayedLink } from "~/components/Elements/Link";
import { Logo } from "~/components/Elements/Logo";
import { Image } from "~/components/Elements/Image";

export const Footer = () => {
  const { t } = useTranslation();
  const [Email, setEmail] = useState<string>("");
  const [Terms, setTerms] = useState<boolean>(false);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("form");
  };

  return (
    <footer className="flex-col gap-5 md:gap-0 md:flex-row relative bg-[#D8D7DD] flex justify-center md:justify-start md:items-start text-black px-10 pt-20 pb-10 md:pb-40 overflow-hidden md:px-20c">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
        viewport={{ amount: 0.5 }}
        className="text-center md:text-left w-full md:w-3/12 flex flex-col justify-center items-center md:justify-start md:items-start gap-7 z-30"
      >
        <Logo width={217} height={49} className="invert" />
        <ul className="p-0 list-none m-0">
          <li className="text-left md:text-left">
            <DelayedLink
              to="/"
              className="bg-black py-2 px-4 text-white w-auto rounded-t-md rounded-br-md text-xl transition-all ease-linear duration-200 hover:text-singula-main"
            >
              {t("footer.links.urban")}
            </DelayedLink>
          </li>
          <li className="text-left md:text-left">
            <DelayedLink
              to="/"
              className="bg-black py-2 px-4 text-white w-auto rounded-br-md rounded-t-md text-xl transition-all ease-linear duration-200 hover:text-singula-main"
            >
              {t("footer.links.garden")}
            </DelayedLink>
          </li>
          <li className="text-left md:text-left">
            <DelayedLink
              to="/"
              className="bg-black py-2 px-4 text-white w-auto rounded-br-md rounded-t-md text-xl transition-all ease-linear duration-200 hover:text-singula-main"
            >
              {t("footer.links.residential")}
            </DelayedLink>
          </li>
          <li className="text-left md:text-left">
            <DelayedLink
              to="/"
              className="bg-black py-2 px-4 text-white w-auto rounded-br-md rounded-t-md rounded-bl-md text-xl transition-all ease-linear duration-200 hover:text-singula-main"
            >
              {t("footer.links.materials")}
            </DelayedLink>
          </li>
        </ul>
        <p className="text-black text-base">{t("footer.copyright")}</p>
      </motion.div>
      <div className="w-1/12"></div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        viewport={{ amount: 0.5 }}
        className="w-full md:w-5/12 flex flex-col justify-center items-center md:justify-start md:items-start gap-4 z-30"
      >
        <span className="text-base text-black">Singula</span>
        <ul className="p-0 list-none m-0">
          <li className="text-center md:text-left">
            <DelayedLink
              to="/about"
              className="text-black font-bold text-xl transition-all ease-linear duration-200 hover:text-singula-main"
            >
              {t("footer.menu.about")}
            </DelayedLink>
          </li>
          <li className="text-center md:text-left">
            <DelayedLink
              to="/catalog"
              className="text-black font-bold text-xl transition-all ease-linear duration-200 hover:text-singula-main"
            >
              {t("footer.menu.catalog")}
            </DelayedLink>
          </li>
          <li className="text-center md:text-left">
            <DelayedLink
              to="/about#singula-studio"
              className="text-black font-bold text-xl transition-all ease-linear duration-200 hover:text-singula-main"
            >
              {t("footer.menu.studio")}
            </DelayedLink>
          </li>
          <li className="text-center md:text-left">
            <DelayedLink
              to="/contacts"
              className="text-black font-bold text-xl transition-all ease-linear duration-200 hover:text-singula-main"
            >
              {t("footer.menu.contacts")}
            </DelayedLink>
          </li>
        </ul>
        <span className="text-base text-black mt-10 md:mt-0">
          {t("footer.email.title")}
        </span>
        <ul className="p-0 m-0 list-none md:flex justify-start items-start gap-5">
          <li className="text-center md:text-left">
            <a
              className="text-black font-bold text-xl transition-all ease-linear duration-200 hover:text-singula-main"
              href="mailto:info@singula.pt"
            >
              info@singula.pt
            </a>
          </li>
          <li className="text-center md:text-left">
            <DelayedLink
              to="/privacy"
              className="text-black font-bold text-xl transition-all ease-linear duration-200 hover:text-singula-main"
            >
              {t("footer.legal.privacy")}
            </DelayedLink>
          </li>
          <li className="text-center md:text-left">
            <DelayedLink
              to="/terms"
              className="text-black font-bold text-xl transition-all ease-linear duration-200 hover:text-singula-main"
            >
              {t("footer.legal.terms")}
            </DelayedLink>
          </li>
          <li className="text-center md:text-left">
            <DelayedLink
              to="/quote"
              className="text-black font-extrabold text-xl transition-all ease-linear duration-200 hover:text-singula-main"
            >
              {t("footer.quote")}
            </DelayedLink>
          </li>
        </ul>
      </motion.div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        viewport={{ amount: 0.5 }}
        className="w-full md:w-3/12 mt-10 md:mt-0 flex flex-col items-start gap-4 z-30"
      >
        <form
          action=""
          className="w-full h-full flex justify-start items-start gap-1 bg-black rounded-xl p-10 flex-col pt-16 relative"
          onSubmit={submitForm}
        >
          <input
            value={Email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            type="text"
            placeholder={t("footer.newsletter.placeholder")}
            className="bg-black border-b w-[90%] focus:outline-none text-white"
            required
          />
          <label className="inline-flex items-center cursor-pointer mt-1">
            <input type="checkbox" className="peer hidden" required />
            <button type="submit" className="absolute right-10 top-16">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-white"
              />
            </button>
            <div className="w-3 h-3 border-2 border-white rounded-md flex items-center justify-center peer-checked:border-black peer-checked:bg-white transition-colors duration-200">
              <svg
                className="w-3 h-3 text-white hidden peer-checked:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white text-sm pl-2">
              {t("footer.newsletter.terms")}
            </span>
          </label>
        </form>
        <div className="social w-full">
          <div className="flex space-x-2 justify-center md:justify-end">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 text-xl flex items-center justify-center rounded-full text-black hover:text-singula-main transition-colors duration-300"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 text-xl  flex items-center justify-center rounded-full text-black hover:text-singula-main transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 text-xl flex items-center justify-center rounded-full text-black hover:text-singula-main transition-colors duration-300"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </motion.div>
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.7 }}
        viewport={{ amount: 0.1 }}
        className="hidden md:block absolute bottom-[-8vw] left-0 text-center whitespace-pre font-bold text-black w-full text-[13vw] z-20"
      >
        SINGULA THINK METAL
      </motion.h1>
      <Image
        width={800}
        height={800}
        className="absolute left-0 bottom-[-220px] md:left-[30%] md:bottom-[-90%] z-10"
        src="/media/footer/blur.png"
        alt="blur"
      />
    </footer>
  );
};
export default Footer;
