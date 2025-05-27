import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const ProductMaterialsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white pb-12 md:pb-20 px-4 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
          viewport={{ amount: 0.2 }}
          className="mb-12 md:mb-16"
        >
          <div className="px-8 md:px-16 flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
              viewport={{ amount: 0.3 }}
              className="w-full max-w-4xl flex justify-center mb-8 -m-5 -mt-24"
            >
              <img
                src="/media/products/products/nexo-bench/5.png"
                alt={t("product.technical.side.alt")}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
              viewport={{ amount: 0.3 }}
              className="flex items-center justify-center"
            >
              <button className="bg-black rounded-full font-bold text-sm md:text-base transition-colors uppercase tracking-wider shadow-lg inline-flex items-center p-1">
                <span className="bg-red-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full uppercase font-bold">
                  {t("product.materials.button")}
                </span>
                <span className="px-4 py-2 md:px-6 md:py-3 text-red-500 uppercase font-bold">
                  {t("product.materials.finishes")}
                </span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
