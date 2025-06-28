import { motion } from "framer-motion";
import { parseTextWithMainColor } from "../utils";
import { Image } from "../Elements/Image";
import { Product } from "~/hooks/interfaces";
import { Trans } from "react-i18next";

export const ProductGallery = ({ product }: { product: Product }) => {
  const firstRefs: string[] | undefined =
    product.RefPrimeiraImagem?.trim().split(",");
  const secondRefs: string[] | undefined =
    product.RefImagemMeio?.trim().split(",");

  return (
    <section className="relative bg-white pt-8 md:pt-12 px-4 md:px-20 overflow-hidden">
      <div className="mx-auto flex justify-center items-center w-full md:w-4/5 flex justify-center items-start flex-col md:flex-row gap-[20px] md:gap-[100px]">
        {product.PrimeiraImagem?.map((imagem: string, index: number) => (
          <motion.span
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: index / 2 }}
            viewport={{ amount: 0.1 }}
            className="relative"
          >
            <Image
              key={`imagem-${imagem}`}
              className={`w-full object-contain ${
                product.PrimeiraImagem!.length > 1 && "aspect-square"
              } w-full ${
                product.PrimeiraImagem?.length === 1
                  ? "md:max-h-[60vw]"
                  : "md:max-h-[50vw]"
              }`}
              src={imagem || ""}
              alt={product.name}
            />
            <span
              className={`block pt-2 w-full text-center text-black font-bold text-lg opacity-25
              ${product.PrimeiraImagem?.length === 1 && "-bottom-6 md:-bottom-2"}
              ${product.PrimeiraImagem?.length === 2 && "-bottom-2"}
              ${
                product.PrimeiraImagem &&
                product.PrimeiraImagem.length >= 3 &&
                "-bottom-8"
              }
              `}
            >
              {firstRefs?.[index] ?? ""}
            </span>
          </motion.span>
        ))}
      </div>

      {product.secondTitle && product.secondText && (
        <div className="max-w-4xl py-10 mx-auto px-8 md:px-0">
          <motion.h3
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            viewport={{ amount: 0.1 }}
            className="text-black font-black text-xl md:text-2xl py-2 w-full text-center"
          >
            <Trans>{parseTextWithMainColor(product.secondTitle)}</Trans>
          </motion.h3>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            viewport={{ amount: 0.1 }}
            className="text-gray-700 text-md md:text-xl w-full font-bold text-center"
          >
            <Trans>{parseTextWithMainColor(product.secondText)}</Trans>
          </motion.p>
        </div>
      )}

      <div className="flex flex-col justify-center items-baseline mx-auto w-full mx-auto flex justify-center items-start flex-col md:flex-row gap-[100px]">
        {product.ImagemMeio?.map((imagem: string, index: number) => (
          <motion.span
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: index / 2 }}
            viewport={{ amount: 0.1 }}
            className="relative"
          >
            <Image
              key={`imagem-${imagem}`}
              className={`w-full object-contain ${
                product.ImagemMeio!.length > 1 && "aspect-square"
              } w-full ${
                product.ImagemMeio?.length === 1
                  ? "md:max-h-[60vw]"
                  : "md:max-h-[50vw]"
              }`}
              src={imagem || ""}
              alt={product.name}
            />
            <span
              className={`block pt-2 w-full text-center text-black font-bold text-lg opacity-25
              ${product.ImagemMeio?.length === 1 && "-bottom-6 md:-bottom-2"}
              ${product.ImagemMeio?.length === 2 && "-bottom-2"}
              ${
                product.ImagemMeio &&
                product.ImagemMeio.length >= 3 &&
                "-bottom-8"
              }
              `}
            >
              {secondRefs?.[index] ?? ""}
            </span>
          </motion.span>
        ))}
      </div>
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        viewport={{ amount: 0.1 }}
        className="text-gray-700 max-w-3xl text-black  text-md md:text-xl w-full font-bold text-center mx-auto pt-8"
      >
        <Trans>{parseTextWithMainColor(product.special)}</Trans>
      </motion.p>
    </section>
  );
};
