import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ProductData {
  images: {
    gallery: string[];
  };
}

export const ProductGallery = () => {
  const { t, i18n } = useTranslation();
  const [productData, setProductData] = useState<ProductData | null>(null);

  useEffect(() => {
    const lang = i18n.language || "pt";

    fetch(`/api/${lang}/product-nexo-bench.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error("Error loading product data:", error));
  }, [i18n.language]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative bg-white pt-8 md:pt-12 px-4 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="block md:hidden space-y-8">
          <div className="space-y-6">
            {productData.images.gallery.map((image, index) => (
              <motion.div
                key={`mobile-image-${index}`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.1 + index * 0.1,
                }}
                viewport={{ amount: 0.2 }}
                className="w-full"
              >
                <img
                  src={image}
                  alt={t(`product.gallery.image${index + 1}.alt`)}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </motion.div>
            ))}

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
          </div>

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

        <div className="hidden md:block">
          <div className="relative h-[350px] md:h-[450px] mb-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
              viewport={{ amount: 0.2 }}
              className="absolute left-8 md:left-24 top-0 w-80 md:w-[28rem]"
            >
              <img
                src={productData.images.gallery[0]}
                alt={t("product.gallery.image1.alt")}
                className="w-full h-auto object-contain"
              />
            </motion.div>

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

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              viewport={{ amount: 0.2 }}
              className="absolute right-8 md:right-24 top-20 md:top-32 w-80 md:w-[28rem]"
            >
              <img
                src={productData.images.gallery[1]}
                alt={t("product.gallery.image2.alt")}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>

          <div className="relative h-[350px] md:h-[450px] mb-6">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
              viewport={{ amount: 0.2 }}
              className="absolute left-8 md:left-24 top-0 w-80 md:w-[28rem]"
            >
              <img
                src={productData.images.gallery[2]}
                alt={t("product.gallery.image3.alt")}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
              viewport={{ amount: 0.2 }}
              className="absolute right-8 md:right-24 top-20 md:top-32 w-80 md:w-[28rem]"
            >
              <img
                src={productData.images.gallery[3]}
                alt={t("product.gallery.image4.alt")}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>

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
