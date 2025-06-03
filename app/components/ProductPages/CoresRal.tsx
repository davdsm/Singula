import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { parseTextWithMainColor } from "../utils";
import { Image } from "../Elements/Image";

export const CoresRal = ({
  title,
  text,
  colors,
}: {
  title: string;
  text: string;
  colors: { image: string; name: string; slug: string }[];
}) => {
  const { t } = useTranslation();
  return (
    <section className="bg-white w-[90%] m-auto py-20 md:px-40 md:pt-40 md:w-full">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        viewport={{ amount: 0.1 }}
      >
        <header>
          <h3 className="text-4xl md:text-6xl font-bold text-black text-center">
            {parseTextWithMainColor(title)}
            <span className="text-lg md:text-2xl">{t("ral.subtitle")}</span>
          </h3>
          <p className="text-md mx-auto md:text-lg text-black py-10 md:w-2/3">
            <Trans>{parseTextWithMainColor(text)}</Trans>
          </p>
        </header>
        <ul className="list-none p-0 m-0 flex flex-row justify-between align-start flex-wrap w-full">
          {colors.map((color, index) => (
            <li key={index} className="w-[23%] md:w-[18%] pb-8">
              <Image
                src={color.image}
                alt={color.name}
                className="w-full h-[5rem] md:h-[10rem] block rounded-2xl"
              />

              <p className="text-black text-md md:text-xl w-full text-center py-4">
                {color.name}
              </p>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};
