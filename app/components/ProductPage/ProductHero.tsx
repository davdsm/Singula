import { motion } from "framer-motion";
import { parseTextWithMainColor } from "../utils";
import { Product } from "~/hooks/interfaces";
import { Trans } from "react-i18next";

export const ProductHero = ({ product }: { product: Product }) => {
  return (
    <section className="relative bg-white py-8 md:py-12 px-4 md:px-10 overflow-hidden">
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

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
          viewport={{ amount: 0.3 }}
          className="text-black font-black text-xl md:text-2xl py-2 md:py-4"
        >
          <Trans>{parseTextWithMainColor(product.subtitle)}</Trans>
        </motion.p>

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
