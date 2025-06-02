import { motion } from "framer-motion";
import { CarouselComponent } from "~/components/Elements/Carousel";
import { Image } from "../Elements/Image";

import "./index.scss";

export const PhotoSlider = () => {
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
        className="w-[150%] px-10 md:translate-x-[-15%]"
        loop={true}
        autoplay
        autoplayInterval={2}
        items={[
          <Image
            src="/media/home/1.jpg"
            alt="Hero Image"
            className="w-full h-[20rem] md:h-[30rem] object-cover rounded-3xl"
          />,

          <Image
            src="/media/home/2.jpg"
            alt="Hero Image"
            className="w-full h-[20rem] md:h-[30rem] object-cover rounded-3xl"
          />,

          <Image
            src="/media/home/3.jpg"
            alt="Hero Image"
            className="w-full h-[20rem] md:h-[30rem] object-cover rounded-3xl"
          />,

          <Image
            src="/media/home/1.jpg"
            alt="Hero Image"
            className="w-full h-[20rem] md:h-[30rem] object-cover rounded-3xl"
          />,
        ]}
      />
    </motion.section>
  );
};
