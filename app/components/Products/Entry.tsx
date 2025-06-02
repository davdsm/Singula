import { ReactElement } from "react";
import { motion } from "framer-motion";

export const Entry = ({
  text,
  className,
}: {
  text: ReactElement<any, any>;
  className?: string;
}) => {
  return (
    <section className={`bg-[#f5f5f5] ${className}`}>
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        viewport={{ amount: 0.3 }}
        className="pb-20 px-10 text-lg md:w-[50%] mx-auto md:text-2xl text-center text-black font-bold"
      >
        {text}
      </motion.h2>
    </section>
  );
};
