import { motion } from "framer-motion";
import { Image } from "../Elements/Image";
import { useHeader } from "~/context/HeaderContext";
import { useEffect } from "react";

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
  const { showHeader, setShowHeader, setDelayMenu } = useHeader();

  return (
    <section
      className="relative w-full max-h-[140px] md:max-h-[400px] h-[30vh] md:h-[50vh] overflow-hidden"
      role="button"
      tabIndex={0}
      onClick={() => {
        setShowHeader(!showHeader);
        setDelayMenu(false);
      }}
      onBlur={() => setShowHeader(true)}
    >
      <Image
        className={`w-full h-full object-cover ${imgClassName}`}
        src={img}
        alt={title}
      />
      <motion.h1
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
        className={`hidden md:block px-20 absolute bottom-[-6px] md:bottom-[-10px] w-full text-center md:text-left text-5xl md:text-7xl text-black font-bold z-10 ${textClassName}`}
      >
        {title}
      </motion.h1>
    </section>
  );
};
