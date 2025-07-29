import { motion } from "framer-motion";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { MouseEventHandler } from "react";
export const CookieConsent = ({
  open,
  close,
}: {
  open: boolean;
  close: Function;
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        y: open ? 0 : 20,
        opacity: open ? 1 : 0,
      }}
      transition={{
        duration: 0.2,
        delay: 2,
      }}
      className={`border border-gray-900 text-white bg-black font-bold p-8 rounded-xl fixed bottom-20 md:bottom-8 right-2 z-50 w-[96%] md:w-[600px] m-0 flex-col ${
        open ? "flex" : "hidden"
      }`}
    >
      <h2 className="w-full text-xl mb-2"> {t("cookies.title")} 🍪</h2>
      <p className="text-gray-400 mb-8 font-regular text-md w-full md:w-4/5">
        {t("cookies.text")}
      </p>
      <div className="flex justify-between w-full items-center flex-col md:flex-row">
        <Link to="/privacy" className="underline" target="_blank">
          {t("footer.legal.privacy")}
        </Link>
        <div className="pt-8 md:pt-0">
          <button
            className="uppercase mx-4"
            onClick={close as MouseEventHandler<HTMLButtonElement>}
          >
            {" "}
            {t("cookies.deny")}
          </button>
          <button
            className="bg-gray-800 py-2 px-4 uppercase rounded"
            onClick={close as MouseEventHandler<HTMLButtonElement>}
          >
            {t("cookies.accept")}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CookieConsent;
