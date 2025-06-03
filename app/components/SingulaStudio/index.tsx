import { motion } from "framer-motion";
import { TeamMember } from "./TeamMember";
import { parseTextWithMainColor } from "../utils";

export const SingulaStudio = ({
  title,
  subtitle,
  text,
  members
}: {
  title: string;
  subtitle: string;
  text: string;
  members:  {
    id: string,
    image: string,
    name: string,
    role: string,
    text: string
  }[]
}) => {
  return (
    <section className="px-10 py-20 md:px-60 md:py-40">
      <motion.header
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
        viewport={{ amount: 0.3 }}
      >
        <h1 className="font-bold text-4xl md:text-7xl text-white uppercase pb-10">
          {parseTextWithMainColor(title)}
        </h1>
      </motion.header>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
        viewport={{ amount: 0.3 }}
        className="font-bold text-lg w-full md:text-2xl text-white"
      >
        {parseTextWithMainColor(subtitle)} <br/><br/>
        {parseTextWithMainColor(text)}
      </motion.p>
      <div className="flex flex-col w-full gap-4 py-20">
        {members.map(({ name, role, text, image }, index) => (
          <TeamMember
            key={`team-${index}`}
            image={image}
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
