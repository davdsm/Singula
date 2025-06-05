import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { UnifiedHoverItem } from "./UnifiedHoverItem";
import { Product } from "~/hooks/interfaces";
import { useState } from "react";
import { MaterialPopup } from "./MaterialPopup";
import { parseTextWithMainColor } from "../utils";

export const ProductInfoBoxes = ({ product }: { product: Product }) => {
  const { t } = useTranslation();

  const [modalContent, setModalContent] = useState<{
    title: string;
    img: string;
    text: string;
  } | null>(null);

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <>
      <section className="relative bg-white pt-12 md:pt-20 px-4 md:px-40 overflow-hidden">
        <div className="mx-auto relative z-10">
          <div className="hidden lg:flex gap-6 items-start mb-16">
            {product.Ficha_Tecnica &&
              product.Ficha_Tecnica.length > 0 &&
              product.Model_DWG &&
              product.Model_DWG.length > 0 && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                  viewport={{ amount: 0.3 }}
                  className="bg-black text-white p-8 rounded-2xl w-[300px] flex-shrink-0"
                >
                  <h3 className="text-2xl font-bold mb-8 uppercase tracking-wider text-white">
                    {t("product.download.title")}
                  </h3>

                  <div className="space-y-6">
                    {product.Ficha_Tecnica &&
                      product.Ficha_Tecnica?.length > 0 && (
                        <UnifiedHoverItem
                          key={`download-${product.name}`}
                          href={product.Ficha_Tecnica || ""}
                          download={true}
                        >
                          <div className="flex flex-col">
                            <span className="text-base text-white group-hover:text-red-400 transition-colors duration-300">
                              {t("product.downloads.techfile")}
                            </span>
                            <span className="text-xs text-gray-400">
                              PDF • Singula
                            </span>
                          </div>
                        </UnifiedHoverItem>
                      )}

                    {product.Model_DWG && product.Model_DWG.length > 0 && (
                      <UnifiedHoverItem
                        key={`download-${product.name}`}
                        href={product.Model_DWG || ""}
                        download={true}
                      >
                        <div className="flex flex-col">
                          <span className="text-base text-white group-hover:text-red-400 transition-colors duration-300">
                            {t("product.downloads.dwg")}
                          </span>
                          <span className="text-xs text-gray-400">
                            DWG • Singula
                          </span>
                        </div>
                      </UnifiedHoverItem>
                    )}
                  </div>
                </motion.div>
              )}

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
              viewport={{ amount: 0.3 }}
              className="border border-gray-300 p-8 rounded-2xl w-[380px] flex-shrink-0 bg-white"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold uppercase tracking-wider text-black inline">
                  {t("product.colors.title")}
                </h3>
                <span className="text-xs text-gray-500 ml-2 lowercase">
                  {t("product.colors.recommended")}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {product.cores_recomendado.map((color, index) => (
                  <div key={`color-${index}`} className="text-center">
                    <div
                      className="w-16 h-16 rounded-lg mx-auto mb-2 border"
                      style={{ background: `url(${color.image})` }}
                    ></div>
                    <p className="text-xs font-bold uppercase tracking-wide text-black">
                      {color.name}
                    </p>
                  </div>
                ))}
                {product.acabamentos_recomendado.map((acab) => (
                  <button
                    type="button"
                    onClick={() =>
                      setModalContent({
                        title: acab.name,
                        img: acab.image,
                        text: acab.text,
                      })
                    }
                    key={`acab-${acab.name}-${acab.image}`}
                    className="text-center focus:outline-none"
                    tabIndex={0}
                    aria-label={acab.name}
                  >
                    <div
                      className="w-16 h-16 rounded-lg mx-auto mb-2 border"
                      style={{ background: `url(${acab.image})` }}
                    ></div>
                    <p className="text-xs font-bold uppercase tracking-wide text-black">
                      {acab.name}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
              viewport={{ amount: 0.3 }}
              className="border border-gray-300 p-8 rounded-2xl flex-1 bg-white"
            >
              <div className="mb-2">
                <h3 className="text-2xl font-bold uppercase tracking-wider text-black inline">
                  {t("product.note.title")}
                </h3>
                <span className="text-xs text-gray-500 ml-2 lowercase">
                  {t("product.note.customization")}
                </span>
              </div>

              <div className="space-y-2 text-xl text-gray-700 leading-relaxed">
                <Trans>{parseTextWithMainColor(product.note)}</Trans>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {modalContent && (
        <MaterialPopup
          img={modalContent.img}
          text={modalContent.text}
          title={modalContent.title}
          close={closeModal}
        />
      )}
    </>
  );
};
