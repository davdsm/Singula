import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Image } from "../Elements/Image";
import { DelayedLink } from "../Elements/Link";

export const ProductCategoryList = ({
  list,
  subcategory,
}: {
  list: {
    name: string;
    slug: string;
    img: string;
  }[];
  subcategory: string;
}) => {
  return (
    <>
      {list && (
        <section className="bg-[#f5f5f5] pb-40">
          <ul className="flex flex-flow justify-start items-start flex-wrap w-[90%] md:w-[70%] mx-auto gap-4">
            {list.map(
              (
                item: {
                  name: string;
                  slug: string;
                  img: string;
                },
                index
              ) => (
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
                  className="transition-bg text-black bg-white border border-white w-[47%] md:w-[32%] rounded-3xl h-[60vw] md:h-[25vw] p-4 md:p-10 relative flex justify-center items-center hover:mix-blend-darken transition-600 hover:text-singula-main hover:border-[#D2D2D2]"
                >
                  <DelayedLink
                    to={`/products/${subcategory}/${item.slug}`}
                    className="w-full h-full"
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-contain pb-14"
                    />
                    <p className="transition-bg transition-600 text-md md:text-3xl font-bold absolute bottom-6 md:bottom-10 w-full text-center left-0">
                      {item.name}
                    </p>
                  </DelayedLink>
                </motion.li>
              )
            )}
          </ul>
        </section>
      )}
    </>
  );
};
