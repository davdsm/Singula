import { motion } from "framer-motion";
import { Image } from "../Elements/Image";

export const AboutSingula = () => {
  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
      viewport={{ amount: 0.3 }}
      className="px-10 md:px-40 flex justify-center items-center gap-5 flex-col md:flex-row"
    >
      <div className="w-full md:w-1/3 flex justify-start">
        <Image
          src="/logo-icon.png"
          alt="Singula Icon"
          className="w-[30%] md:w-[18rem] h-auto"
        />
      </div>
      <div className="w-full py-10 md:py-0 md:w-2/3">
        <p className="text-lg md:text-2xl">
          A Singula é o ponto onde design e engenharia se encontram para
          reimaginar o mundo à nossa volta. Acreditamos que cada espaço —
          urbano, natural ou doméstico — merece ser emocionante, funcional e
          duradouro. Para nós, o metal não é só matéria-prima: é a nossa base.
          <br />
          <br />
          Fazemos histórias que se moldam ao tempo, criando um legado de
          inovação e autenticidade.
        </p>
      </div>
    </motion.section>
  );
};
