import { motion } from "framer-motion";
import { parseTextWithMainColor } from "../utils";
import { Product } from "~/hooks/interfaces";
import { Trans } from "react-i18next";
import { Subcategory } from "~/hooks/useProductSubCategories";
import { Breadcrumbs } from "./Breadcrumps";

export const ProductHero = ({
  product,
  subcategory,
}: {
  product: Product;
  subcategory: Subcategory;
}) => {
  return (
    <section className="relative bg-white py-8 md:py-12 px-4 md:px-10 overflow-hidden">
      <Breadcrumbs
        category={subcategory.category.title}
        subcategory={subcategory}
        product={product}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          viewport={{ amount: 0.3 }}
          className="text-3xl md:text-5xl font-bold uppercase text-black"
        >
          {parseTextWithMainColor(product.name)}
        </motion.h1>

        <motion.h3
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
          viewport={{ amount: 0.3 }}
          className="text-black font-black text-xl md:text-2xl py-2 md:py-4"
        >
          <Trans>{parseTextWithMainColor(product.subtitle)}</Trans>
        </motion.h3>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
          viewport={{ amount: 0.3 }}
          className="font-bold text-gray-700 max-w-3xl mx-auto text-md md:text-xl"
        >
          <Trans>{parseTextWithMainColor(product.text)}</Trans>
        </motion.p>
      </div>
    </section>
  );
};
