import { motion } from "framer-motion";

export const Vision = () => {
  return (
    <section className="px-10 pb-20 pt-10 md:pb-40 md:pt-0 md:px-40 flex flex-col md:flex-row justify-between items-baseline w-full gap-10">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
        viewport={{ amount: 0.3 }}
        className="w-full md:w-1/3"
      >
        <h4 className="text-xl md:text-3xl text-singula-main w-full">
          Inovação & Originalidade
        </h4>
        <p className="text-lg md:text-xl w-full ">
          Desafiamos o convencional com soluções e design para o espaço urbano
          num cenário de constante reinvenção e personalidade.
        </p>
      </motion.div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        viewport={{ amount: 0.3 }}
        className="w-full md:w-1/3"
      >
        <h4 className="text-xl md:text-3xl text-singula-main w-full">
          Qualidade
        </h4>
        <p className="text-lg md:text-xl w-full ">
          Criamos peças que não apenas impressionam, mas que resistem ao tempo,
          construídas com materiais de excelência e acabamentos refinados.
        </p>
      </motion.div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        viewport={{ amount: 0.3 }}
        className="w-full md:w-1/3"
      >
        <h4 className="text-xl md:text-3xl text-singula-main w-full">
          Sustentabilidade
        </h4>
        <p className="text-lg md:text-xl w-full ">
          Escolhemos práticas e materiais que garantem um impacto mínimo no meio
          ambiente, pensando num futuro mais verde e duradouro.
        </p>
      </motion.div>
    </section>
  );
};
