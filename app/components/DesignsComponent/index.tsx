import { motion } from "framer-motion";
import { Image } from "../Elements/Image";
import { parseTextWithMainColor } from "../utils";

export const DesignsComponent = ({
  firstTitle,
  secondTitle,
  thirdTitle,
  firstText,
  secondText,
  thirdText,
  img,
}: {
  firstTitle: string;
  secondTitle: string;
  thirdTitle: string;
  firstText: string;
  secondText: string;
  thirdText: string;
  img: string;
}) => {
  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
      viewport={{ amount: 0.3 }}
      className="py-10 md:py-40 pl-10 md:pl-40 flex justify-center gap-5 flex-col md:flex-row"
    >
      <div className="w-full pr-40 md:pr-0 py-10 md:py-0 md:w-1/3 flex-col">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
          viewport={{ amount: 0.3 }}
          className="text-left py-2"
        >
          <h3 className="font-black text-white text-2xl md:text-6xl text-left">
            {parseTextWithMainColor(firstTitle)}
          </h3>
          <p className="py-2 md:py-4 text-lg md:text-2xl font-regular text-white text-left">
            {parseTextWithMainColor(firstText)}
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
          viewport={{ amount: 0.3 }}
          className="text-left py-2"
        >
          <h3 className="font-black text-white text-2xl md:text-6xl text-left">
            {parseTextWithMainColor(secondTitle)}
          </h3>
          <p className="py-2 md:py-4 text-lg md:text-2xl font-regular text-white text-left">
            {parseTextWithMainColor(secondText)}
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
          viewport={{ amount: 0.3 }}
          className="text-left py-2"
        >
          <h3 className="font-black text-white text-2xl md:text-6xl text-left">
            {parseTextWithMainColor(thirdTitle)}
          </h3>
          <p className="py-2 md:py-4 text-lg md:text-2xl font-regular text-white text-left">
            {parseTextWithMainColor(thirdText)}
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
        viewport={{ amount: 0.3 }}
        className="w-full md:w-2/3 flex justify-start"
      >
        <Image
          src={img}
          className="w-full h-[15rem] md:h-full object-cover rounded-tl-[2rem] rounded-bl-[2rem] md:rounded-tl-[3.2rem] md:rounded-bl-[3.2rem]"
          alt="Singula Designs Systems"
        />
      </motion.div>
    </motion.section>
  );
};
