import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CarouselComponent } from "../Elements/Carousel";
import { Image } from "../Elements/Image";

import "./index.scss";
export const MaterialsSlide = () => {
  const [materials, setMaterials] = useState<
    { title: string; image: string }[]
  >([]);

  useEffect(() => {
    if (materials.length === 0)
      fetch("/api/pt/materials.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setMaterials(data));
  }, [materials]);

  return (
    <>
      {materials.length > 0 && (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
          viewport={{ amount: 0.3 }}
          id="material-slider"
          className="overflow-hidden pb-20"
        >
          <CarouselComponent
            itemClassName="w-[50px] basis-1/4 md:basis-1/6"
            className="w-full"
            loop={true}
            autoplay
            items={materials.map((item, index) => (
              <button
                key={`material-${index}`}
                type="button"
                className="text-center flex justify-center flex-col items-center w-full"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className="rounded-full w-[30px] h-[30px] md:w-[60px] md:h-[60px]"
                />
                <p className="text-md md:text-lg text-white py-2">
                  {item.title}
                </p>
              </button>
            ))}
          />
        </motion.div>
      )}
    </>
  );
};
