import { motion } from "framer-motion";
import { MainColor } from "../Elements/Colors/main";
import { MaterialsSlide } from "./MaterialsSlide";

export const About = ({ setModalContent }: { setModalContent: Function }) => {
  return (
    <section className="bg-black">
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        viewport={{ amount: 0.3 }}
        className="py-20 px-10 text-lg md:px-80 md:text-2xl text-center"
      >
        Na Singula, os materiais não são apenas materiais — são os protagonistas
        da história! Temos metal que não teme nada, a cortiça que é tão natural
        que até pede licença para entrar, o corian que brilha mais que um
        influencer, e o compacto HPL que é resistente e chique ao mesmo tempo. A
        madeira? Vem clássica, mas sai moderna. As cores RAL, claro, para dar
        aquele impacto final. E isso é só o começo — porque a cidade merece mais
        do que o básico, merece <MainColor> design com personalidade</MainColor>
        .
      </motion.h2>
      <MaterialsSlide setModalContent={setModalContent} />
    </section>
  );
};
