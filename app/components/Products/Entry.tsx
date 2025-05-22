import { motion } from "framer-motion";
import { MainColor } from "../Elements/Colors/main";

export const Entry = () => {
  return (
    <section className="bg-[#f5f5f5]">
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        viewport={{ amount: 0.3 }}
        className="py-20 px-10 text-lg md:w-[60%] mx-auto md:text-2xl text-center text-black font-bold"
      >
        Na Singula não desenhamos só formas.{" "}
        <MainColor>Criamos personalidade</MainColor>.
        Seja num banco, numa floreira, numa divisória ou numa peça decorativa -
        cada detalhe conta. Porque o nosso design viva as ruas, respira nos
        jardins e arruma-se com rigor em casa. Street, Garden ou Home - o
        cenrário muda, mas a atitude é a mesma. .
      </motion.h2>
    </section>
  );
};
