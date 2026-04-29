import { motion } from "framer-motion";
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
      className="pb-20 px-6 md:px-20"
    >
      <ul className="list-none p-0 m-0 grid grid-cols-4 md:grid-cols-5 gap-x-[2.66%] md:gap-x-[2.5%] w-full">
        {list.map((item, index) => (
          <li key={`material-${index}`} className="pb-8">
          <button
            type="button"
            className="text-center flex justify-center flex-col items-center w-full transition-colors"
            onClick={() => handleMaterialButton(item)}
          >
            <div className="w-full h-[5rem] md:h-[10rem] rounded-2xl overflow-hidden">
              <Image
                src={item.image || ""}
                alt={item.name}
                className="w-full h-full block object-cover"
              />
            </div>
            <p className="text-md md:text-xl text-black w-full text-center py-4">
              {item.name}
            </p>
          </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
