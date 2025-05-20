import { motion } from "framer-motion";
import { MainColor } from "../Elements/Colors/main";
import { Image } from "../Elements/Image";
import { Button } from "../Elements/Button";
import { useTranslation } from "react-i18next";

export const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ amount: 0.6 }} // 1 = full section must be in view
      className="relative w-full h-1/3 bg-black py-20 md:py-40 mx-auto flex items-center justify-center flex-col"
    >
      <h3 className="text-lg md:text-2xl text-white text-center font-bold w-4/5 md:w-3/5 inline-block md:max-w-[614px]">
        {t("about.home.words.in")} <MainColor>Singula</MainColor>,{" "}
        {t("about.home.text1")}{" "}
        <MainColor>{t("about.home.words.ousadia")}</MainColor>
        {t("about.home.text2")}
        <MainColor>{t("about.home.words.guiao")}</MainColor>
        {t("about.home.text3")}
      </h3>
      <Image
        src="/logo-icon.png"
        alt="Singula"
        className="absolute left-[-20%] w-3/5 md:w-1/2 md:h-[90%] h-full object-contain opacity-10"
      />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        viewport={{ amount: 0.1 }}
        className="mt-6"
      >
        <Button to="/about" firstText="Singula" secondText="Studio" />
      </motion.div>
    </motion.section>
  );
};
