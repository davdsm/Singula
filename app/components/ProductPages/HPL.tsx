import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { parseTextWithMainColor } from "../utils";

export const HPL = ({
  setModalContent,
  title,
  text,
  img,
  list,
}: {
  setModalContent: Function;
  title: string;
  text: string;
  img: string;
  list: {
    name: string;
    img: string;
    description: string;
  }[];
}) => {
  const { t } = useTranslation();

  return (
    <section className="bg-white" id="hpl-colors">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
        viewport={{ amount: 0.1 }}
      >
        <header
          className={`relative py-20 px-10 md:px-40 md:py-40 bg-cover `}
          style={{ background: `url(${img})`, backgroundSize: "cover" }}
        >
          <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
          <h3 className="relative text-4xl md:text-6xl font-bold text-white text-center z-20">
            {parseTextWithMainColor(title)}
            <span className="text-lg md:text-2xl">{t("hpl.subtitle")}</span>
          </h3>
          <p className="relative text-md mx-auto md:text-lg text-white py-10 md:w-2/3 z-20">
            <Trans>{parseTextWithMainColor(text)}</Trans>
          </p>
        </header>
        <ul className="px-10 md:px-40 list-none p-0 m-0 flex flex-row justify-between align-start flex-wrap w-full mt-20 md:mt-40">
          {list.map((item, index) => (
            <li key={index} className="w-[23%] md:w-[18%] pb-8">
              <span
                onClick={() =>
                  item.description &&
                  setModalContent({
                    title: item.name,
                    img: item.img,
                    text: item.description,
                  })
                }
                style={{ backgroundImage: `url('${item.img}')` }}
                className="border cursor-pointer w-full h-[5rem] md:h-[10rem] block rounded-2xl bg-cover bg-center"
              ></span>

              <p className="text-black text-md md:text-xl w-full text-center py-4">
                {item.name}
              </p>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};
