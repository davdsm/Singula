import { motion } from "framer-motion";
import { parseTextWithMainColor } from "../utils";
import { Image } from "../Elements/Image";
import { Product } from "~/hooks/interfaces";

export const ProductGallery = ({ product }: { product: Product }) => {
  return (
    <section className="relative bg-white pt-8 md:pt-12 px-4 md:px-40 overflow-hidden">
      <div className="flex justify-center items-baseline">
        <motion.span
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
          viewport={{ amount: 0.3 }}
          className="w-full md:w-4/5"
        >
          <Image
            className="w-full"
            src={product.PrimeiraImagem || ""}
            alt={product.name}
          />
        </motion.span>
      </div>

      <div className="w-full md:w-1/2 py-10">
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.2 }}
          viewport={{ amount: 0.3 }}
          className="text-black font-black text-xl md:text-2xl py-2 w-full text-center md:text-left"
        >
          {parseTextWithMainColor(product.secondTitle)}
        </motion.p>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.3 }}
          viewport={{ amount: 0.3 }}
          className="text-gray-700 max-w-3xl  text-md md:text-xl w-full font-bold text-center md:text-left"
        >
          {parseTextWithMainColor(product.secondText)}
        </motion.p>
      </div>

      <div className="flex flex-col justify-center items-baseline md:h-[20vw] mx-auto w-full">
        <motion.span
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.6 }}
          viewport={{ amount: 0.3 }}
          className="block"
        >
          <Image
            className="w-full"
            src={product.ImagemMeio || ""}
            alt={product.name}
          />
        </motion.span>
      </div>

      <p className="text-gray-700 max-w-3xl text-black  text-md md:text-xl w-full font-bold text-center md:text-left pt-8">
        {parseTextWithMainColor(product.special)}
      </p>
    </section>
  );
};
