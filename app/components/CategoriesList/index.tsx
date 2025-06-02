import { motion } from "framer-motion";
import { Image } from "../Elements/Image";
import { DelayedLink } from "../Elements/Link";

export const CategoriesList = ({
  categories,
}: {
  categories: {
    title: string;
    slug: string;
    design: string;
    img: string;
    banner: string;
    text: string;
  }[];
}) => {
  return (
    <section className="w-[90%] m-auto md:px-40 md:mt-10 md:w-auto overflow-auto no-scrollbar">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        viewport={{ amount: 0.1 }}
      >
        <ul className="list-none py-20 m-0 flex flex-nowrap overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar gap-6">
          {categories.map((category, index) => (
            <DelayedLink
              to={`/products/${category.slug}/`}
              className="w-24 h-24 bg-white text-black rounded-full flex justify-center items-center shrink-0"
            >
              <Image src={category.img} alt={category.title} className="w-20 h-20 object-contain" />
            </DelayedLink>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};
