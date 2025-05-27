import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MainColor } from "../Elements/Colors/main";

export const ProductHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white py-8 md:py-12 px-4 md:px-10 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          viewport={{ amount: 0.3 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 uppercase text-black leading-tight"
        >
          {t("product.hero.title.first")}{" "}
          <MainColor>{t("product.hero.title.second")}</MainColor>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
          viewport={{ amount: 0.3 }}
          className="text-base sm:text-lg md:text-xl font-semibold mb-3 md:mb-4 text-black px-2"
        >
          {t("product.hero.subtitle")}
        </motion.p>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
          viewport={{ amount: 0.3 }}
          className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-sm md:text-base px-2"
        >
          {t("product.hero.description")}
        </motion.p>
      </div>
    </section>
  );
};
