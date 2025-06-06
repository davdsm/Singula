import { motion } from "framer-motion";
import { CarouselComponent } from "../Elements/Carousel";
import { Image } from "../Elements/Image";

import "./index.scss";
import { useNavigate } from "@remix-run/react";
export const MaterialsSlide = ({
  setModalContent,
  list,
}: {
  setModalContent: (content: {
    title: string;
    img?: string;
    text: string;
  }) => void;
  list: {
    slug: string;
    name: string;
    text: string;
    image?: string;
  }[];
}) => {
  const navigate = useNavigate();

  const handleMaterialButton = (item: {
    slug: string;
    name: string;
    text: string;
    image?: string;
  }) => {
    if (item.text.includes("#")) {
      navigate(item.text);
      return;
    }

    item.text &&
      setModalContent({
        title: item.name,
        img: item.image,
        text: item.text,
      });
  };

  return (
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
        items={list.map((item, index) => (
          <button
            key={`material-${index}`}
            type="button"
            className="text-center flex justify-center flex-col items-center w-full"
            onClick={() => handleMaterialButton(item)}
          >
            <Image
              src={item.image || ""}
              alt={item.name}
              className="rounded-full w-[30px] h-[30px] md:w-[60px] md:h-[60px]"
            />
            <p className="text-md md:text-lg text-white py-2">{item.name}</p>
          </button>
        ))}
      />
    </motion.div>
  );
};
