import { motion } from "framer-motion";
import { MainColor } from "../Elements/Colors/main";
import { useTranslation } from "react-i18next";
import { parseTextWithMainColor } from "../utils";

export const BannerText = ({ text }: { text: string }) => {
  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
      viewport={{ amount: 0.3 }}
      className="w-full py-10 bg-singula-lightGray px-10 md:px-80"
    >
      <h3 className="text-black text-md md:text-2xl font-bold text-center">
        {parseTextWithMainColor(text)}
      </h3>
    </motion.section>
  );
};
