import { motion } from "framer-motion";
import { CategoryIcon } from "./Icon";
import { Image } from "../Elements/Image";
import { DelayedLink } from "../Elements/Link";
import { parseTextWithMainColor } from "../utils";

export const CategoryCard = ({
  title,
  design,
  link,
  image,
  index,
  hidden,
}: {
  title: string;
  design: string;
  link?: string;
  image: string;
  index?: number;
  hidden?: boolean;
}) => {
  if(hidden) return <div></div>;
  return (
    <DelayedLink to={link || "#"}>
      <div
       /*  initial={{ y: 30, opacity: 0, transform: "translateY(30px)" }}
        whileInView={{ y: 0, opacity: 1, transform: "translateY(0)" }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          delay: index ? index / 10 : 0,
        }}
        viewport={{ amount: 0.1, once: true }} */
        className="w-full md:w-full bg-white p-10 rounded-tl-[1rem] rounded-br-[1rem] rounded-tr-[3rem] rounded-bl-[3rem] md:rounded-tl-3xl md:rounded-tr-[5rem] md:rounded-bl-[5rem] md:rounded-br-3xl"
      >
        <div className="flex justify-between items-start w-full">
          <h5 className="leading-none h-12 text-xl md:text-3xl text-black font-extrabold">{parseTextWithMainColor(title)}</h5>
          <CategoryIcon
            category={design.toLowerCase() as "garden" | "home" | "street"}
          />
        </div>
       <Image
          src={image}
          alt={title}
          className="w-full md:h-[20vw] h-[30vw] object-contain"
        />
        <span className="capitalize text-black font-bold w-full text-center block text-lg">
          {design} Design
        </span>
      </div>
    </DelayedLink>
  );
};
