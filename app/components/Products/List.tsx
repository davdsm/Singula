import { motion } from "framer-motion";
import { Image } from "../Elements/Image";
import { DelayedLink } from "../Elements/Link";
import { useCategories } from "~/hooks/useProductCategories";

export const ProductList = ({}) => {
  const { categories, loading, error } = useCategories();

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {categories && (
        <section className="bg-[#f5f5f5] pb-40">
          <ul className="flex flex-flow justify-between items-start flex-wrap w-[90%] md:w-[70%] mx-auto gap-4">
            {categories.map((category, index) => (
              <motion.li
                key={`prod-cat-${index + 1}`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: index / 10,
                }}
                viewport={{ amount: 0.2 }}
                className="transition-bg text-black bg-white border border-white w-[47%] md:w-[32%] rounded-3xl h-[60vw] md:h-[25vw] relative flex justify-center items-center hover:mix-blend-darken transition-600 hover:text-singula-main hover:border-[#D2D2D2]"
              >
                <DelayedLink
                  to={`/products/${category.slug}`}
                  className="w-full h-full p-4 md:p-10"
                >
                  <Image
                    src={category.image as string}
                    alt={category.title}
                    className="w-full h-full object-contain pb-14"
                  />
                  <h3 className="transition-bg transition-600 text-md md:text-3xl font-bold absolute bottom-6 md:bottom-10 w-full text-center left-0">
                    {category.title}
                  </h3>
                </DelayedLink>
              </motion.li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};
