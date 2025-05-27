import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const ProductGallery = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white pt-8 md:pt-12 px-4 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Layout Mobile - Stack vertical */}
        <div className="block md:hidden space-y-8">
          {/* Imagens empilhadas para mobile */}
          <div className="space-y-6">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
              viewport={{ amount: 0.2 }}
              className="w-full"
            >
              <img
                src="/media/products/products/nexo-bench/1.jpg"
                alt={t("product.gallery.image1.alt")}
                className="w-full h-auto object-contain rounded-xl"
              />
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              viewport={{ amount: 0.2 }}
              className="w-full"
            >
              <img
                src="/media/products/products/nexo-bench/2.jpg"
                alt={t("product.gallery.image2.alt")}
                className="w-full h-auto object-contain rounded-xl"
              />
            </motion.div>

            {/* Título e descrição entre a 2ª e 3ª imagem para mobile */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ amount: 0.3 }}
              className="text-center px-4"
            >
              <h2 className="text-2xl font-bold mb-4 text-black">
                {t("product.gallery.title")}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t("product.gallery.description")}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              viewport={{ amount: 0.2 }}
              className="w-full"
            >
              <img
                src="/media/products/products/nexo-bench/3.jpg"
                alt={t("product.gallery.image3.alt")}
                className="w-full h-auto object-contain rounded-xl"
              />
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              viewport={{ amount: 0.2 }}
              className="w-full"
            >
              <img
                src="/media/products/products/nexo-bench/4.jpg"
                alt={t("product.gallery.image4.alt")}
                className="w-full h-auto object-contain rounded-xl"
              />
            </motion.div>
          </div>

          {/* Texto final para mobile */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ amount: 0.3 }}
            className="text-center px-4"
          >
            <p className="text-base text-gray-800 font-semibold">
              {t("product.gallery.grouping.note")}
            </p>
          </motion.div>
        </div>

        {/* Layout Desktop - Mantém o layout original */}
        <div className="hidden md:block">
          {/* Primeira linha - layout assimétrico com texto no meio */}
          <div className="relative h-[350px] md:h-[450px] mb-8">
            {/* Primeira imagem - esquerda superior */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
              viewport={{ amount: 0.2 }}
              className="absolute left-8 md:left-24 top-0 w-80 md:w-[28rem]"
            >
              <img
                src="/media/products/products/nexo-bench/1.jpg"
                alt={t("product.gallery.image1.alt")}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Texto à esquerda no espaço entre as duas primeiras imagens */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ amount: 0.3 }}
              className="absolute left-8 md:left-24 top-1/2 mt-16 md:mt-20 transform -translate-y-1/2 text-left max-w-md z-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
                {t("product.gallery.title")}
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {t("product.gallery.description")}
              </p>
            </motion.div>

            {/* Segunda imagem - direita mais baixa */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              viewport={{ amount: 0.2 }}
              className="absolute right-8 md:right-24 top-20 md:top-32 w-80 md:w-[28rem]"
            >
              <img
                src="/media/products/products/nexo-bench/2.jpg"
                alt={t("product.gallery.image2.alt")}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>

          {/* Segunda linha - layout espelhado */}
          <div className="relative h-[350px] md:h-[450px] mb-6">
            {/* Terceira imagem - esquerda mais alta */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
              viewport={{ amount: 0.2 }}
              className="absolute left-8 md:left-24 top-0 w-80 md:w-[28rem]"
            >
              <img
                src="/media/products/products/nexo-bench/3.jpg"
                alt={t("product.gallery.image3.alt")}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Quarta imagem - direita mais baixa */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
              viewport={{ amount: 0.2 }}
              className="absolute right-8 md:right-24 top-20 md:top-32 w-80 md:w-[28rem]"
            >
              <img
                src="/media/products/products/nexo-bench/4.jpg"
                alt={t("product.gallery.image4.alt")}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>

          {/* Texto final - alinhado com o texto de cima */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            viewport={{ amount: 0.3 }}
            className="text-left pt-8 pl-8 md:pl-24"
          >
            <p className="text-lg md:text-xl text-gray-800 font-semibold">
              {t("product.gallery.grouping.note")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
