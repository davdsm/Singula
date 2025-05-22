import { motion } from "framer-motion";
import { Image } from "../Elements/Image";

export const ProductPageEntry = ({
  img,
  title,
  imgClassName,
  textClassName,
}: {
  img: string;
  title: string;
  imgClassName?: string;
  textClassName?: string;
}) => {
  return (
    <section className="relative w-full h-[30vh] md:h-[50vh] overflow-hidden">
      <Image
        className={`w-full h-full object-cover ${imgClassName}`}
        src={img}
        alt={title}
      />
      <motion.h1
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
        className={`px-20 absolute bottom-[-6px] md:bottom-[-10px] w-full text-center md:text-left text-5xl md:text-7xl text-black font-bold z-10 ${textClassName}`}
      >
        {title}
      </motion.h1>
    </section>
  );
};
