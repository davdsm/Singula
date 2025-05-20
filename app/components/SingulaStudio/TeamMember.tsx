import { motion } from "framer-motion";
import { Image } from "../Elements/Image";

export const TeamMember = ({
  image,
  name,
  role,
  text,
  index,
  inverted,
}: {
  image: string;
  name: string;
  role: string;
  text: string;
  index: number;
  inverted?: boolean;
}) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: index / 10 }}
      viewport={{ amount: 0.3 }}
      className={`${
        inverted ? "md:flex-row-reverse" : ""
      } flex-col flex md:flex-row justify-between items-start md:items-center py-10 gap-4 md:gap-20 w-full`}
    >
      <Image
        src={image}
        alt={name}
        className="object-cover w-[203px] h-[288px]  md:w-[303px] md:h-[388px] rounded-tl-[1rem] rounded-br-[1rem] rounded-tr-[3rem] rounded-bl-[3rem] md:rounded-tl-xl md:rounded-tr-[6rem] md:rounded-bl-xl md:rounded-br-xl"
      />
      <div>
        <h4 className="text-2xl md:text-5xl text-white font-bold">{name}</h4>
        <h6 className="text-lg md:text-2xl text-singula-main py-4">{role}</h6>
        <p className="text-lg md:text-2xl text-white">{text}</p>
      </div>
    </motion.div>
  );
};
