import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

export const Filters = ({
  filtersList,
  selectedSlug,
  clearFilters,
}: {
  filtersList: {
    title: string;
    slug: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }[];
  selectedSlug: string;
  clearFilters: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
      viewport={{ amount: 0.1 }}
      className="pb-10 text-center flex justify-center items-center"
    >
      <ul className="flex justify-center items-center">
        <li>
          <button
            onClick={clearFilters}
            className={`${
              selectedSlug === ""
                ? "text-white bg-black"
                : "text-black bg-transparent"
            } font-bold p-2 px-4 border border-black rounded-full mx-2 text-lg`}
          >
            Todos
          </button>
        </li>
        {filtersList.map(
          (filter: {
            title: string;
            slug: string;
            onClick: MouseEventHandler<HTMLButtonElement>;
          }) => (
            <li>
              <button
                onClick={filter.onClick}
                className={`${
                  selectedSlug === filter.slug
                    ? "text-white bg-black"
                    : "text-black bg-transparent"
                } font-bold p-2 px-4 border border-black rounded-full mx-2 text-lg`}
              >
                {filter.title}
              </button>
            </li>
          )
        )}
      </ul>
    </motion.section>
  );
};
