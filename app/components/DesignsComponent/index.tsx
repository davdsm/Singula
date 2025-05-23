import { motion } from "framer-motion";
import { Image } from "../Elements/Image";
import { useTranslation } from "react-i18next"; // Adicionar importação

export const DesignsComponent = () => {
  const { t } = useTranslation(); // Adicionar hook

  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
      viewport={{ amount: 0.3 }}
      className="py-10 md:py-40 pl-10 md:pl-40 flex justify-center gap-5 flex-col md:flex-row"
    >
      <div className="w-full py-10 md:py-0 md:w-1/3 flex-col">
        <div className="text-left py-2">
          <h3 className="font-black text-white text-2xl md:text-6xl text-left">
            {t("designs.street.title")}
          </h3>
          <p className="py-2 md:py-4 text-lg md:text-2xl font-regular text-white text-left">
            {t("designs.street.description")}
          </p>
        </div>
        <div className="text-left py-2">
          <h3 className="font-black text-white text-2xl md:text-6xl text-left">
            {t("designs.garden.title")}
          </h3>
          <p className="py-2 md:py-4 text-lg md:text-2xl font-regular text-white text-left">
            {t("designs.garden.description")}
          </p>
        </div>
        <div className="text-left py-2">
          <h3 className="font-black text-white text-2xl md:text-6xl text-left">
            {t("designs.home.title")}
          </h3>
          <p className="py-2 md:py-4 text-lg md:text-2xl font-regular text-white text-left">
            {t("designs.home.description")}
          </p>
        </div>
      </div>

      <div className="w-full md:w-2/3 flex justify-start">
        <Image
          src="/media/designs/all.png"
          className="w-full h-[15rem] md:h-full object-cover rounded-tl-[2rem] rounded-bl-[2rem] md:rounded-tl-[3.2rem] md:rounded-bl-[3.2rem]"
          alt={t("designs.image.alt")}
        />
      </div>
    </motion.section>
  );
};
