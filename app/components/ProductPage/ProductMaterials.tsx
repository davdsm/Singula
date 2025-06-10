import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MaterialPopup } from "./MaterialPopup";
import { UnifiedHoverItem } from "./UnifiedHoverItem";
import { MaterialFormatted, Product } from "~/hooks/interfaces";

export const ProductMaterials = ({ product }: { product: Product }) => {
  const { t } = useTranslation();
  const [modalContent, setModalContent] = useState<{
    title: string;
    img: string;
    text: string;
  } | null>(null);

  const handleMaterialClick = (material: MaterialFormatted) => {
    setModalContent({
      title: material.name,
      text: material.text,
      img: material.image || "",
    });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <>
      <section className="relative bg-white pt-8 md:pt-12 px-4 md:px-40 overflow-hidden">
        <div className="mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              viewport={{ amount: 0.3 }}
              className="bg-black text-white p-6 md:p-8 lg:p-10 rounded-2xl w-full lg:w-[30%] flex-shrink-0 flex flex-col justify-center order-1"
            >
              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 uppercase tracking-wider">
                  {t("product.materials.title")}
                </h3>

                <div className="space-y-3 md:space-y-4">
                  {product.materiais.map(
                    (material: MaterialFormatted, index: number) => (
                      <UnifiedHoverItem
                        key={`material-${index}`}
                        onClick={() => handleMaterialClick(material)}
                        isClickable={true}
                      >
                        <span>{material.name}</span>
                      </UnifiedHoverItem>
                    )
                  )}
                </div>
              </div>

              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 uppercase tracking-wider">
                  {t("product.materials.finishes.title")}
                </h3>

                <div className="space-y-3 md:space-y-4">
                  {product.acabamento
                    .split(",")
                    .map((acab: string, index: number) => (
                      <UnifiedHoverItem key={`finish-${index}`}>
                        <span>{acab}</span>
                      </UnifiedHoverItem>
                    ))}
                </div>
              </div>

              {/* {product.pesos.length > 0 && (
                <div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 uppercase tracking-wider">
                    {t("product.materials.weight.title")}
                  </h3>

                  <div className="space-y-3 md:space-y-4">
                    {product.pesos.split(",").map((peso, index) => (
                      <UnifiedHoverItem key={`finish-${index}`}>
                        <span>{peso}</span>
                      </UnifiedHoverItem>
                    ))}
                  </div>
                </div>
              )} */}
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              viewport={{ amount: 0.2 }}
              className="flex items-center flex-1 order-2"
            >
              <div className="w-full h-full">
                <img
                  src={product.banner || ""}
                  alt={t("product.materials.context.alt")}
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-full object-cover rounded-2xl"
                />
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
