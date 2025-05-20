import { motion } from "framer-motion";
import { MainColor } from "../Elements/Colors/main";
import { TeamMember } from "./TeamMember";
import { useEffect, useState } from "react";

export const SingulaStudio = () => {
  const [members, setMembers] = useState<
    { name: string; role: string; text: string; img: string }[]
  >([]);

  useEffect(() => {
    if (members.length === 0)
      fetch("/api/pt/members.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setMembers(data));
  }, [members]);

  return (
    <section className="px-10 py-20 md:px-60 md:py-40">
      <motion.header
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
        viewport={{ amount: 0.3 }}
      >
        <h1 className="font-bold text-4xl md:text-7xl text-white uppercase pb-10">
          Singula <MainColor>Studio</MainColor>
        </h1>
      </motion.header>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
        viewport={{ amount: 0.3 }}
        className="font-bold text-lg w-full md:text-2xl text-white"
      >
        Onde o design provoca. E a engenharia não pede desculpa. <br /> <br />
        Tudo começa com a visão irreverente de{" "}
        <MainColor>André Vieira</MainColor>, Designer de Produto que prefere
        rasgar o manual a segui-lo. Cada peça nasce com um objetivo claro: ser
        tudo menos comum — visual, funcional e emocional. Depois entra a dupla
        de precisão cirúrgica: <MainColor>Hugo Silva</MainColor> e{" "}
        <MainColor>Pedro Fernandes</MainColor>. Engenheiros de formação.
        Inconformados por vocação. São eles que transformam ideias arrojadas em
        estruturas sérias. E sim, usam a régua.
      </motion.p>
      <div className="flex flex-col w-full gap-4 py-20">
        {members.map(({ name, role, text, img }, index) => (
          <TeamMember
            key={`team-${index}`}
            image={img}
            name={name}
            role={role}
            text={text}
            index={index}
            inverted={index === 1}
          />
        ))}
      </div>
    </section>
  );
};
