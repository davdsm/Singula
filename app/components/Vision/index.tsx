import { motion } from "framer-motion";
import { parseTextWithMainColor } from "../utils";
export const Vision = ({
  value1Title,
  value2Title,
  value3Title,
  value1Text,
  value2Text,
  value3Text,
}: {
  value1Title: string;
  value2Title: string;
  value3Title: string;
  value1Text: string;
  value2Text: string;
  value3Text: string;
}) => {
  return (
    <section className="px-10 pb-20 pt-10 md:pb-40 md:pt-0 md:px-40 flex flex-col md:flex-row justify-between items-baseline w-full gap-10">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
        viewport={{ amount: 0.3 }}
        className="w-full md:w-1/3"
      >
        <h4 className="text-xl md:text-3xl text-singula-main w-full">
          {parseTextWithMainColor(value1Title)}
        </h4>
        <p className="text-lg md:text-xl w-full ">{parseTextWithMainColor(value1Text)}</p>
      </motion.div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        viewport={{ amount: 0.3 }}
        className="w-full md:w-1/3"
      >
        <h4 className="text-xl md:text-3xl text-singula-main w-full">
          {parseTextWithMainColor(value2Title)}
        </h4>
        <p className="text-lg md:text-xl w-full ">{parseTextWithMainColor(value2Text)}</p>
      </motion.div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        viewport={{ amount: 0.3 }}
        className="w-full md:w-1/3"
      >
        <h4 className="text-xl md:text-3xl text-singula-main w-full">
          {parseTextWithMainColor(value3Title)}
        </h4>
        <p className="text-lg md:text-xl w-full ">{parseTextWithMainColor(value3Text)}</p>
      </motion.div>
    </section>
  );
};
