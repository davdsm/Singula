import { motion } from "framer-motion";

import { Image } from "../Elements/Image";

export const Banner = ({
  url,
  className,
}: {
  url: string;
  className?: string;
}) => {
  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
      viewport={{ amount: 0.3 }}
    >
      <Image src={url} alt="singula" className={className} />
    </motion.section>
  );
};
