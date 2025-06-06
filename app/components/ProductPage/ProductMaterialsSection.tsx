import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "../Elements/Button";
import { Product } from "../../hooks/interfaces";
import { Image } from "../Elements/Image";

export const ProductMaterialsSection = ({ product }: { product: Product }) => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white pb-12 md:pb-20 px-4 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className="mb-12 md:mb-16"
        >
          <div className="px-8 md:px-16 flex flex-col items-center justify-center">
            {product.ImagemBottom && (
              <div
                className="w-full max-w-4xl flex justify-center mb-8 flex-col"
              >
                {product.ImagemBottom?.map((imagem: string) => (
                  <Image
                    key={`imagem-${imagem}`}
                    className={`w-full object-contain ${
                      product.ImagemBottom?.length === 1
                        ? "md:max-h-[60vw]"
                        : "md:max-h-[30vw]"
                    }`}
                    src={imagem || ""}
                    alt={product.name}
                  />
                ))}
              </div>
            )}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
              viewport={{ amount: 0.1 }}
              className="flex items-center justify-center"
            >
              <Button
                to="/about"
                firstText={t("product.materials.button")}
                secondText={t("product.materials.finishes")}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
