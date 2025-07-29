import { ReactElement } from "react";
import { motion } from "framer-motion";
import { parseTextWithMainColor } from "../utils";
import { DelayedLink } from "../Elements/Link";
import { useTranslation } from "react-i18next";

export const Entry = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const { t } = useTranslation();

  return (
    <section className={`bg-[#f5f5f5] ${className}`}>
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        viewport={{ amount: 0.3 }}
        className="px-10 text-lg md:w-[50%] mx-auto md:text-2xl text-center text-black font-bold"
      >
        {parseTextWithMainColor(text)}
      </motion.h2>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.7 }}
        viewport={{ amount: 0.3 }}
        className="flex justify-center pb-12 pt-8"
      >
        <DelayedLink to="/search?look=all" className="mx-auto inline-block">
          <button className="font-bold p-2 px-4 border border-black rounded-full text-lg bg-black text-white">
            {t("products.all")}
          </button>
        </DelayedLink>
      </motion.div>
    </section>
  );
};
