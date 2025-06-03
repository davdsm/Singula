import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MainColor } from "../Elements/Colors/main";
import { parseTextWithMainColor } from "../utils";

export const ProductHero = ({ product }: { product: Product }) => {
  return (
    <section className="relative bg-white py-8 md:py-12 px-4 md:px-10 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          viewport={{ amount: 0.3 }}
          className="text-5xl font-bold uppercase text-black"
        >
          {parseTextWithMainColor(product.name)}
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
          viewport={{ amount: 0.3 }}
          className="text-black font-black text-2xl py-4"
        >
          {parseTextWithMainColor(product.subtitle)}
        </motion.p>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
          viewport={{ amount: 0.3 }}
          className="font-bold text-gray-700 max-w-3xl mx-auto text-xl"
        >
         {parseTextWithMainColor(product.text)}
        </motion.p>
      </div>
    </section>
  );
};
