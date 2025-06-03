import { motion } from "framer-motion";
import { MainColor } from "../Elements/Colors/main";
import { useEffect, useRef, useState } from "react";
import { Image } from "../Elements/Image";
import { useTranslation } from "react-i18next";
import { parseTextWithMainColor } from "../utils";

export const Finishings = ({
  list,
}: {
  list: { name: string; text: string; img: string }[];
}) => {
  const { t, i18n } = useTranslation();

  const [currentImg, setCurrentImg] = useState<string | null>(null);
  const refs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!list.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setCurrentImg(list[index]?.img);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px", // 👈 triggers earlier as it scrolls up
        threshold: 0.1,
      }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [list]);

  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ amount: 0.1, once: true }}
    >
      <header className="text-lg py-4 md:py-10 md:my-10 text-center text-black md:text-4xl bg-singula-lightGray">
        {t("product.materials.finishes.title")} <MainColor>/</MainColor>{" "}
        {t("product.materials.finishes.metal")}
      </header>

      <div className="flex px-10 md:px-40 py-20 gap-8 md:gap-16 md:min-h-[200vh]">
        <div className="hidden md:block w-1/2">
          <div className="sticky top-40">
            {currentImg && (
              <Image
                src={currentImg}
                alt="Acabamento Singula"
                className="w-full h-[10rem] md:h-[30rem] object-cover rounded-3xl transition-all duration-500"
              />
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-20">
          {list.map((item, index) => (
            <div
              key={index}
              data-index={index}
              ref={(el) => {
                if (el) refs.current[index] = el;
              }}
              className="finishing-section"
            >
              <h6 className="text-black text-md md:text-4xl font-bold pb-4">
                {parseTextWithMainColor(item.name)}
              </h6>
              <p className="text-black text-sm md:text-2xl">
                {parseTextWithMainColor(item.text)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
