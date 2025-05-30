import { motion } from "framer-motion";
import { MainColor } from "../Elements/Colors/main";
import { useTranslation } from "react-i18next";

export const Entry = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-[#f5f5f5]">
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        viewport={{ amount: 0.3 }}
        className="py-20 px-10 text-lg md:w-[60%] mx-auto md:text-2xl text-center text-black font-bold"
      >
        {t("entry.text.part1")}{" "}
        <MainColor>{t("entry.text.highlight")}</MainColor>.
        {t("entry.text.part2")}
      </motion.h2>
    </section>
  );
};
