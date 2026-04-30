import { motion } from "framer-motion";
import { parseTextWithMainColor } from "../utils";
import { Image } from "../Elements/Image";
import { CarouselComponent } from "../Elements/Carousel";
import { Product } from "~/hooks/interfaces";
import { Trans } from "react-i18next";

export const ProductGallery = ({ product }: { product: Product }) => {
  const firstRefs: string[] | undefined =
    product.RefPrimeiraImagem?.trim().split(",");
  const secondRefs: string[] | undefined =
    product.RefImagemMeio?.trim().split(",");
  const thirdRefs: string[] | undefined =
    product.RefSegundaMeio?.trim().split(",");
  const segundaMeioPairs: string[][] = product.SegundaMeio
    ? product.SegundaMeio.map((_img: string, idx: number) => {
        const nextIdx = (idx + 1) % product.SegundaMeio!.length;
        return [product.SegundaMeio![idx], product.SegundaMeio![nextIdx]];
      })
    : [];

  return (
    <section className="relative bg-white pt-8 md:pt-12 px-4 md:px-20 overflow-x-visible overflow-y-visible">
      <div className="mx-auto flex justify-center items-center w-full md:w-4/5 flex justify-center items-start flex-col md:flex-row gap-[20px] md:gap-[100px]">
        {product.PrimeiraImagem?.map((imagem: string, index: number) => (
          <motion.span
            key={`primeira-imagem-span-${index}`}
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: index / 2 }}
            viewport={{ amount: 0.1 }}
            className="relative"
          >
            <Image
              key={`imagem-${imagem}`}
              className={`rounded-lg w-full object-contain ${
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
              ${
                product.PrimeiraImagem?.length === 1 && "-bottom-6 md:-bottom-2"
              }
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

      {product.SegundaMeio && product.SegundaMeio.length > 0 && (
        <div className="mt-10 md:mt-16 mx-auto w-full max-w-screen">
          {product.SegundaMeio.length === 1 ? (
            <div className="flex flex-col justify-center items-baseline mx-auto w-full md:flex-row gap-[100px]">
              <motion.span
                key="segunda-meio-single"
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
                viewport={{ amount: 0.1 }}
                className="relative w-full"
              >
                <Image
                  className="rounded-2xl w-full object-contain md:max-h-[60vw]"
                  src={product.SegundaMeio[0] || ""}
                  alt={product.name}
                />
                <span className="block pt-2 w-full text-center text-black font-bold text-lg opacity-25 -bottom-6 md:-bottom-2">
                  {thirdRefs?.[0] ?? ""}
                </span>
              </motion.span>
            </div>
          ) : (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              viewport={{ amount: 0.15 }}
              className="relative w-screen overflow-hidden"
              style={{ left: "50%", marginLeft: "-50vw" }}
            >
              <CarouselComponent
                loop
                autoplay
                autoplayInterval={5}
                arrows
                arrowsInset
                viewportClassName="overflow-hidden"
                className="w-full min-w-0"
                emblaOpts={{
                  align: "center",
                  loop: true,
                  containScroll: false,
                  slidesToScroll: 1,
                  skipSnaps: false,
                }}
                itemClassName="min-w-0 shrink-0 grow-0 pl-2 md:pl-3 basis-[90%] md:basis-[82%] lg:basis-[76%]"
                items={segundaMeioPairs.map((pair: string[], slideIdx: number) => (
                  <div
                    key={`segunda-meio-slide-${slideIdx}`}
                    className="relative w-full h-[40vh] flex flex-col items-center pr-2 md:pr-3"
                  >
                    <div className="min-h-0 flex-1 w-full grid grid-cols-2 gap-3">
                      {pair.map((imagem: string, offset: number) => {
                        const imageIdx = (slideIdx + offset) % product.SegundaMeio!.length;
                        return (
                          <div
                            key={`segunda-meio-img-${slideIdx}-${offset}`}
                            className="min-h-0 h-full flex flex-col"
                          >
                            <div className="min-h-0 flex-1 w-full relative">
                              <Image
                                className="rounded-2xl border border-[#d9d9d9] absolute inset-0 h-full w-full object-contain"
                                src={imagem || ""}
                                alt={`${product.name} — ${imageIdx + 1}`}
                              />
                            </div>
                            <span className="shrink-0 block pt-2 w-full text-center text-black font-bold text-lg opacity-25">
                              {thirdRefs?.[imageIdx] ?? ""}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              />
            </motion.div>
          )}
        </div>
      )}

      <div className="flex flex-col justify-center items-baseline mx-auto w-full mx-auto flex justify-center items-start flex-col md:flex-row gap-[20px] md:gap-[100px]">
        {product.ImagemMeio?.map((imagem: string, index: number) => (
          <motion.span
            key={`imagem-meio-span-${index}`}
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: index / 2 }}
            viewport={{ amount: 0.1 }}
            className="relative"
          >
            <Image
              key={`imagem-${imagem}`}
              className={`rounded-lg w-full object-contain ${
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
