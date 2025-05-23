import { motion } from "framer-motion";
import { MainColor } from "../Elements/Colors/main";
import { TeamMember } from "./TeamMember";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const SingulaStudio = () => {
  const { t, i18n } = useTranslation(); // Usar o idioma atual para buscar o arquivo JSON correto
  const [members, setMembers] = useState<
    { name: string; role: string; text: string; img: string }[]
  >([]);

  useEffect(() => {
    if (members.length === 0) {
      const lang = i18n.language || "pt"; // Adicionar i18n.language como dependência
      fetch(`/api/${lang}/members.json`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setMembers(data));
    }
  }, [members, i18n.language]); // Adicionar i18n.language como dependência

  return (
    <section className="px-10 py-20 md:px-60 md:py-40">
      <motion.header
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
        viewport={{ amount: 0.3 }}
      >
        <h1 className="font-bold text-4xl md:text-7xl text-white uppercase pb-10">
          {t("studio.title.first")}{" "}
          <MainColor>{t("studio.title.second")}</MainColor>
        </h1>
      </motion.header>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
        viewport={{ amount: 0.3 }}
        className="font-bold text-lg w-full md:text-2xl text-white"
      >
        {t("studio.description.paragraph1")} <br /> <br />
        {t("studio.description.paragraph2")}{" "}
        <MainColor>{t("studio.description.designer")}</MainColor>
        {t("studio.description.paragraph3")}{" "}
        <MainColor>{t("studio.description.engineer1")}</MainColor>{" "}
        {t("studio.description.and")}{" "}
        <MainColor>{t("studio.description.engineer2")}</MainColor>
        {t("studio.description.paragraph4")}
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
