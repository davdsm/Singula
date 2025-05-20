import { motion } from "framer-motion";

export const TitleEntry = () => {
  return (
    <section className="w-full flex justify-center items-center h-[60vh] md:h-[90vh] flex-col gap-2">
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
        viewport={{ amount: 0.3 }}
        className="uppercase text-2xl md:text-5xl"
      >
        Somos Design & Engenharia
      </motion.h1>
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1.3 }}
        viewport={{ amount: 0.3 }}
        className="uppercase text-2xl md:text-5xl text-singula-main"
      >
        Somos a história nunca contada.
      </motion.h1>
    </section>
  );
};
