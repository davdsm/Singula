import { motion } from "framer-motion";
import { CarouselComponent } from "../Elements/Carousel";

export const DesignsSlide = ({ imgs }: { imgs: string[] }) => {
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
        items={imgs.map((img, index) => (
          <img
            key={`img-slide-design-${index}`}
            src={img}
            alt="Singula Design"
            className="w-full h-[20rem] md:h-[40rem] object-cover position-center"
          />
        ))}
      />
    </motion.section>
  );
};
