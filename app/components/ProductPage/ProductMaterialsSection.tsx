import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "../Elements/Button";
import { Product } from "../../hooks/interfaces";
import { Image } from "../Elements/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { Quote } from "../Layout/Footer/quote";
import { useState } from "react";

export const ProductMaterialsSection = ({ product }: { product: Product }) => {
  const { t } = useTranslation();
  const [QuoteModal, setQuoteModal] = useState(false);

  return (
    <>
      <section className="relative bg-white pb-12 md:pb-20 px-4 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12 md:mb-16">
            <div className="px-8 md:px-16 flex flex-col items-center justify-center">
              {product.ImagemBottom && (
                <div className="w-full max-w-4xl flex justify-center mb-8 flex-col">
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
                  to="/materials"
                  firstText={t("product.materials.button")}
                  secondText={t("product.materials.finishes")}
                />
              </motion.div>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                viewport={{ amount: 0.1 }}
                className="mt-10 flex justify-center items-center"
              >
                <button
                  type="submit"
                  className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-singula-main"
                >
                  <div className="text-xl uppercase text-white font-bold inline-flex h-12 translate-y-0 items-center justify-center px-12 py-4 text-white transition duration-500 group-hover:-translate-y-[150%]">
                    {t("contact.quote.button")}
                    <FontAwesomeIcon icon={faFile} className="w-6 h-6 ml-4" />
                  </div>
                  <div className="flex absolute inline-flex h-12 w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
                    <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-singula-mainDarker transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
                    <span className="z-10 text-2xl font-bold flex items-center">
                      {t("contact.quote.button")}
                    </span>
                  </div>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {QuoteModal && <Quote close={() => setQuoteModal(false)} />}
    </>
  );
};
