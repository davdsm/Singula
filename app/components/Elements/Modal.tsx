import { motion } from "framer-motion";
import { Image } from "./Image";

export const Modal = ({
  img,
  text,
  title,
  close,
}: {
  img: string;
  text: string;
  title: string;
  close: () => void;
}) => {
  return (
    <section className="fixed top-0 left-0 w-full h-full z-20 flex justify-center items-center">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute top-0 left-0 w-full h-full z-10 bg-black opacity-60 cursor-default"
        onClick={() => close()}
        tabIndex={0}
        style={{ outline: "none", border: "none", padding: 0, margin: 0 }}
      ></button>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0 }}
        viewport={{ amount: 0.3 }}
        className="relative bg-white flex flex-col md:flex-row justify-between items-center w-[90%] md:w-2/3 h-auto md:h-[60%] rounded-[1rem] z-20"
      >
        <button
          className="absolute top-4 right-4 md:top-8 md:right-8 text-singula-garden"
          onClick={() => close()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        <Image
          src={img}
          alt={title}
          className="w-full h-40 md:w-[40%] md:h-full rounded-tl-[1rem] rounded-md md:rounded-bl-[1rem] object-cover"
        />

        <div className="w-full md:w-[55%] p-10 md:p-0">
          <h3 className="text-lg md:text-4xl text-black font-bold w-full text-left">
            {title}
          </h3>
          <p className="text-xs md:text-lg text-black w-[90%] pt-2 md:pt-8">
            {text}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
