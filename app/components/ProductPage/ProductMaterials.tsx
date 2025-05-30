import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MaterialPopup } from "./MaterialPopup";
import { UnifiedHoverItem } from "./UnifiedHoverItem";

interface Material {
  name: string;
  color: string;
  description?: string;
  image?: string;
}

interface Finish {
  name: string;
  color: string;
  description?: string;
  image?: string;
}

interface Weight {
  description: string;
  color: string;
}

interface ProductData {
  images: {
    context: string;
  };
  materials: Material[];
  finishes: Finish[];
  weight: Weight[];
}

export const ProductMaterials = () => {
  const { t, i18n } = useTranslation();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [modalContent, setModalContent] = useState<{
    title: string;
    img: string;
    text: string;
  } | null>(null);

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

  const handleMaterialClick = (material: Material) => {
    setModalContent({
      title: material.name,
      text: material.description || t("product.materials.default.description"),
      img: material.image || "",
    });
  };

  const handleFinishClick = (finish: Finish) => {
    setModalContent({
      title: finish.name,
      text: finish.description || t("product.finishes.default.description"),
      img: finish.image || "",
    });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="relative bg-white pt-8 md:pt-12 px-4 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
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
                  {productData.materials.map((material, index) => (
                    <UnifiedHoverItem
                      key={`material-${index}`}
                      onClick={() => handleMaterialClick(material)}
                      isClickable={true}
                    >
                      <span>{material.name}</span>
                    </UnifiedHoverItem>
                  ))}
                </div>
              </div>

              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 uppercase tracking-wider">
                  {t("product.materials.finishes.title")}
                </h3>

                <div className="space-y-3 md:space-y-4">
                  {productData.finishes.map((finish, index) => (
                    <UnifiedHoverItem
                      key={`finish-${index}`}
                      onClick={() => handleFinishClick(finish)}
                      isClickable={true}
                    >
                      <span>{finish.name}</span>
                    </UnifiedHoverItem>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 uppercase tracking-wider">
                  {t("product.materials.weight.title")}
                </h3>

                <div className="space-y-3 md:space-y-4">
                  {productData.weight.map((weight, index) => (
                    <UnifiedHoverItem
                      key={`weight-${index}`}
                      isClickable={false}
                    >
                      <span>{weight.description}</span>
                    </UnifiedHoverItem>
                  ))}
                </div>
              </div>
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
                  src={productData.images.context}
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
