import { motion } from "framer-motion";
import { MainColor } from "../Elements/Colors/main";
import { MaterialsSlide } from "./MaterialsSlide";
import { useTranslation } from "react-i18next";

export const About = ({ setModalContent }: { setModalContent: Function }) => {
  const { t } = useTranslation();

  return (
    <section className="bg-black">
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        viewport={{ amount: 0.3 }}
        className="py-20 px-10 text-lg md:px-80 md:text-2xl text-center"
      >
        {t("about.materials.intro")}
        <MainColor> {t("about.materials.highlight")}</MainColor>.
      </motion.h2>
      <MaterialsSlide setModalContent={setModalContent} />
    </section>
  );
};
