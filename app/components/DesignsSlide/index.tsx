import { motion } from "framer-motion";
import { CarouselComponent } from "../Elements/Carousel";

export const DesignsSlide = () => {
  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
      viewport={{ amount: 0.3 }}
    >
      <CarouselComponent
        itemClassName="w-full"
        className="w-full py-20"
        loop={true}
        autoplay
        autoplayInterval={4}
        items={[
          <img
            src="/media/designs/garden.png"
            alt="Singula Garden Design"
            className="w-full h-[20rem] md:h-[40rem] object-cover position-center"
          />,
          <img
            src="/media/designs/home.png"
            alt="Singula Home Design"
            className="w-full h-[20rem] md:h-[40rem] object-cover "
          />,
          <img
            src="/media/designs/street.png"
            alt="Singula Street Design"
            className="w-full h-[20rem] md:h-[40rem] object-cover"
          />,
        ]}
      />
    </motion.section>
  );
};
