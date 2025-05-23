import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const Vision = () => {
  const { t } = useTranslation();

  return (
    <section className="px-10 pb-20 pt-10 md:pb-40 md:pt-0 md:px-40 flex flex-col md:flex-row justify-between items-baseline w-full gap-10">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
        viewport={{ amount: 0.3 }}
        className="w-full md:w-1/3"
      >
        <h4 className="text-xl md:text-3xl text-singula-main w-full">
          {t("vision.innovationTitle")}
        </h4>
        <p className="text-lg md:text-xl w-full ">
          {t("vision.innovationText")}
        </p>
      </motion.div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        viewport={{ amount: 0.3 }}
        className="w-full md:w-1/3"
      >
        <h4 className="text-xl md:text-3xl text-singula-main w-full">
          {t("vision.qualityTitle")}
        </h4>
        <p className="text-lg md:text-xl w-full ">{t("vision.qualityText")}</p>
      </motion.div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        viewport={{ amount: 0.3 }}
        className="w-full md:w-1/3"
      >
        <h4 className="text-xl md:text-3xl text-singula-main w-full">
          {t("vision.sustainabilityTitle")}
        </h4>
        <p className="text-lg md:text-xl w-full ">
          {t("vision.sustainabilityText")}
        </p>
      </motion.div>
    </section>
  );
};
