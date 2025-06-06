import { motion } from "framer-motion";
import { parseTextWithMainColor } from "../utils";
import { Image } from "../Elements/Image";
import { Product } from "~/hooks/interfaces";
import { Trans } from "react-i18next";

export const ProductGallery = ({ product }: { product: Product }) => {
  console.log("imagens...", product);

  return (
    <section className="relative bg-white pt-8 md:pt-12 px-4 md:px-40 overflow-hidden">
      <div className="flex justify-center items-baseline">
        <motion.span
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          viewport={{ amount: 0.1 }}
          className="w-full md:w-4/5 flex justify-center items-start flex-col md:flex-row"
        >
          {product.PrimeiraImagem?.map((imagem: string) => (
            <Image
              key={`imagem-${imagem}`}
              className={`w-full object-contain ${
                product.PrimeiraImagem!.length > 1 && "aspect-square"
              } w-full ${
                product.PrimeiraImagem?.length === 1
                  ? "md:max-h-[60vw]"
                  : "md:max-h-[30vw]"
              }`}
              src={imagem || ""}
              alt={product.name}
            />
          ))}
        </motion.span>
      </div>

      {product.secondTitle && product.secondText && (
        <div className="w-full md:w-1/2 py-10">
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            viewport={{ amount: 0.1 }}
            className="text-black font-black text-xl md:text-2xl py-2 w-full text-center md:text-left"
          >
            <Trans>{parseTextWithMainColor(product.secondTitle)}</Trans>
          </motion.p>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            viewport={{ amount: 0.1 }}
            className="text-gray-700 max-w-3xl  text-md md:text-xl w-full font-bold text-center md:text-left"
          >
            <Trans>{parseTextWithMainColor(product.secondText)}</Trans>
          </motion.p>
        </div>
      )}

      <div className="flex flex-col justify-center items-baseline mx-auto w-full">
        <motion.span
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          viewport={{ amount: 0.1 }}
          className="mx-auto flex justify-center items-start flex-col md:flex-row"
        >
          {product.ImagemMeio?.map((imagem: string) => (
            <Image
              key={`imagem-${imagem}`}
              className={`w-full object-contain ${
                product.PrimeiraImagem!.length > 1 && "aspect-square"
              } w-full ${
                product.ImagemMeio?.length === 1
                  ? "md:max-h-[60vw]"
                  : "md:max-h-[30vw]"
              }`}
              src={imagem || ""}
              alt={product.name}
            />
          ))}
        </motion.span>
      </div>
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        viewport={{ amount: 0.1 }}
        className="text-gray-700 max-w-3xl text-black  text-md md:text-xl w-full font-bold text-center md:text-left pt-8"
      >
        {parseTextWithMainColor(product.special)}
      </motion.p>
    </section>
  );
};
