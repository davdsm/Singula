import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MainColor } from "../Elements/Colors/main";

interface ProductData {
  images: {
    hero: string;
  };
}

export const ProductHero = () => {
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

  return (
    <section className="relative bg-white py-8 md:py-12 px-4 md:px-10 overflow-hidden">
      {productData?.images.hero && (
        <div className="absolute">
          <img
            src={productData.images.hero}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          viewport={{ amount: 0.3 }}
          className="text-5xl font-bold uppercase text-black"
        >
          {t("product.hero.title.first")}{" "}
          <MainColor>{t("product.hero.title.second")}</MainColor>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
          viewport={{ amount: 0.3 }}
          className="text-black font-black text-2xl py-4"
        >
          {t("product.hero.subtitle")}
        </motion.p>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
          viewport={{ amount: 0.3 }}
          className="text-gray-700 max-w-3xl mx-auto text-xl"
        >
          {t("product.hero.description")}
        </motion.p>
      </div>
    </section>
  );
};
