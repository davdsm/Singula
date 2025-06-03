import { motion } from "framer-motion";
import { Image } from "../Elements/Image";
import { Trans } from "react-i18next";
import { parseTextWithMainColor } from "../utils";

export const Title = ({ text }: { text: string }) => {
  const element = parseTextWithMainColor(text);

  return (
    <header className="py-10 md:py-20 px-10 md:px-60 flex align-center justify-between w-full h-full">
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
        viewport={{ amount: 0.3 }}
        className="text-2xl md:text-5xl font-black text-left text-white w-full md:w-3/5"
      >
        <Trans>{element}</Trans>
      </motion.h1>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        viewport={{ amount: 0.3 }}
        className="w-2/5 hidden md:flex justify-end items-center flex-col"
      >
        <Image
          src="/media/home/icons.png"
          alt="Singula Designs"
          className="md:w-3/5"
        />
        <h3 className="text-2xl md:text-5xl font-black text-left text-white md:w-3/5">
          Singula
        </h3>
      </motion.div>
    </header>
  );
};
