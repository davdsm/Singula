import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const ProductMaterials = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white pt-8 md:pt-12 px-4 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">
          {/* Caixa preta com especificações */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ amount: 0.3 }}
            className="bg-black text-white p-6 md:p-8 lg:p-10 rounded-2xl w-full lg:w-[30%] flex-shrink-0 flex flex-col justify-center order-1"
          >
            {/* MATERIAIS */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 uppercase tracking-wider">
                {t("product.materials.title")}
              </h3>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3 md:mr-4 flex-shrink-0"></div>
                  <span className="text-sm md:text-base lg:text-lg">
                    {t("product.materials.steel")}
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3 md:mr-4 flex-shrink-0"></div>
                  <span className="text-sm md:text-base lg:text-lg">
                    {t("product.materials.hpl")}
                  </span>
                </div>
              </div>
            </div>

            {/* ACABAMENTOS */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 uppercase tracking-wider">
                {t("product.materials.finishes.title")}
              </h3>

              <div className="flex items-center">
                <div className="w-3 h-3 bg-white rounded-full mr-3 md:mr-4 flex-shrink-0"></div>
                <span className="text-sm md:text-base lg:text-lg">
                  {t("product.materials.finish.antislip")}
                </span>
              </div>
            </div>

            {/* PESO */}
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 uppercase tracking-wider">
                {t("product.materials.weight.title")}
              </h3>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3 md:mr-4 flex-shrink-0"></div>
                  <span className="text-sm md:text-base lg:text-lg">
                    {t("product.materials.weight.person")}
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3 md:mr-4 flex-shrink-0"></div>
                  <span className="text-sm md:text-base lg:text-lg">
                    {t("product.materials.weight.planter")}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Imagem grande do contexto */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ amount: 0.2 }}
            className="flex items-center flex-1 order-2"
          >
            <div className="w-full h-full">
              <img
                src="/media/home/hero.jpg"
                alt={t("product.materials.context.alt")}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-full object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
