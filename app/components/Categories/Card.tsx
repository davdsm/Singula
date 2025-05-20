import { motion } from "framer-motion";
import { CategoryIcon } from "./Icon";
import { Image } from "../Elements/Image";
import { DelayedLink } from "../Elements/Link";

export const CategoryCard = ({
  title,
  design,
  link,
  image,
  index,
  hidden,
}: {
  title: string;
  design: "Garden" | "Home" | "Street";
  link?: string;
  image: string;
  index?: number;
  hidden?: boolean;
}) => {
  if(hidden) return <div></div>;
  return (
    <DelayedLink to={link || "#"}>
      <motion.div
        initial={{ y: 30, opacity: 0, transform: "translateY(30px)" }}
        whileInView={{ y: 0, opacity: 1, transform: "translateY(0)" }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          delay: index ? index / 10 : 0,
        }}
        viewport={{ amount: 0.1 }}
        className="w-full md:w-full bg-white p-10 rounded-tl-[1rem] rounded-br-[1rem] rounded-tr-[3rem] rounded-bl-[3rem] md:rounded-tl-3xl md:rounded-tr-[5rem] md:rounded-bl-[5rem] md:rounded-br-3xl"
      >
        <div className="flex justify-between items-center w-full">
          <h5 className="text-xl md:text-3xl text-black font-extrabold">{title}</h5>
          <CategoryIcon
            category={design.toLowerCase() as "garden" | "home" | "street"}
          />
        </div>
        <Image
          src={image}
          alt={title}
          className="w-full h-[10rem] md:h-[20rem] object-contain"
        />
        <span className="text-black font-bold w-full text-center block text-lg">
          {design} Design
        </span>
      </motion.div>
    </DelayedLink>
  );
};
