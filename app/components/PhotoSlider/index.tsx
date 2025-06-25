import { motion } from "framer-motion";
import { CarouselComponent } from "~/components/Elements/Carousel";
import { Image } from "../Elements/Image";

import "./index.scss";

export const PhotoSlider = ({ imgs }: { imgs: string[] }) => {
  return (
    <motion.section
      id="photo-slider"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
      viewport={{ amount: 0.3 }}
      className="w-full overflow-x-hidden"
    >
        <CarouselComponent
          className="w-full md:w-[150%] translation-none md:-translate-x-[50%]"
          loop={true}
          autoplay
          autoplayInterval={2}
          itemClassName="basis-4/5 md:basis-1/2 lg:basis-1/3 rounded"
          items={imgs.map((img, i) => (
            <Image
              key={`img-${i}`}
              src={img}
              alt="Hero Image"
              className="!overflow-hidden w-full h-[20rem] md:h-[30rem] object-cover rounded-3xl"
            />
          ))}
        />
    </motion.section>
  );
};
