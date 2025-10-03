import { motion } from "framer-motion";
import { LoaderFunction } from "@remix-run/node";
import { MetaFunction, useSearchParams } from "@remix-run/react";
import { useSearch } from "~/hooks/useSearch";
import { useEffect } from "react";
import { ProductCategoryList } from "~/components/CategoriesList/categoryListProducts";
import { Image } from "~/components/Elements/Image";
import { useTranslation } from "react-i18next";
import { parseTextWithMainColor } from "~/components/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const look = url.searchParams.get("look");
  const design = url.searchParams.get("design");

  return { look, design };
};

export const meta: MetaFunction<{ look?: string; design?: string }> = ({
  data = {},
}) => {
  const typedData = data as { look?: string; design?: string };
  const look = typedData.look ?? "";
  const design = typedData.design ?? "";
  const title = `Singula ${look[0].toUpperCase() + look.slice(1)} Design`;

  return [
    {
      title: design ? title : `Resultados para '${look}'`,
    },
    {
      name: "description",
      content:
        "A Singula é o ponto onde design e engenharia se encontram para reimaginar o mundo à nossa volta. Acreditamos que cada espaço — urbano, natural ou doméstico — merece ser emocionante, funcional e duradouro. Para nós, o metal não é só matéria-prima: é a nossa base.",
    },
  ];
};

export const Search = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const searchString = searchParams.get("look");
  const isDesign = searchParams.get("design");

  const { products, searchProducts, loading } = useSearch({
    searchString: searchString ?? "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    searchProducts(searchString ?? "");
  }, [searchString]);

  return (
    <main className="bg-[#f5f5f5] py-20 overflow-x-hidden md:min-h-[100vh] flex flex-col justify-center items-center gap-20">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <svg
            className="w-24 h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
          >
            <circle
              fill="#000000"
              stroke="#000000"
              strokeWidth="15"
              r="15"
              cx="40"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle
              fill="#000000"
              stroke="#000000"
              strokeWidth="15"
              r="15"
              cx="100"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle
              fill="#000000"
              stroke="#000000"
              strokeWidth="15"
              r="15"
              cx="160"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
        </div>
      )}
      {!loading && (
        <>
          {!isDesign && (
            <motion.section
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="max-w-4xl pt-20 mx-auto text-gray-800 flex items-center justify-center flex-col md:flex-row px-4 md:px-0"
            >
              {searchString !== "all" && (
                <h1 className="font-bold text-3xl md:text-5xl">
                  {t("search.results.title")}{" "}
                  <span className="font-extrabold">"{parseTextWithMainColor(searchString ?? "")}"</span>{" "}
                </h1>
              )}
            </motion.section>
          )}

          {isDesign && (
            <motion.section
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="max-w-4xl pt-20 mx-auto text-gray-800 flex items-center justify-center flex-col md:flex-row px-4 md:px-0"
            >
              <span className="w-20 h-20 bg-singula-main p-4 flex justify-center items-center rounded-full">
                <Image
                  className="w-4/5 h-4/5 object-contain"
                  src={`/media/categories/${searchString}Design.png`}
                  alt={`SINGULA ${searchString?.toUpperCase()} Design`}
                />
              </span>
            </motion.section>
          )}

          {products.length > 0 && (
            <ProductCategoryList
              list={products.map((product) => ({
                name: product.name,
                slug: product.slug,
                img: product.ImagemPrincipal || "",
                link: product.link,
              }))}
            />
          )}
        </>
      )}
      {!loading && products.length === 0 && (
        <motion.section
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="max-w-4xl mx-auto text-gray-400 flex items-center justify-center flex-col md:flex-row px-4 md:px-0"
        >
          <h1 className="text-md md:text-2xl">
            {t("search.results.no-results")}
          </h1>
        </motion.section>
      )}
    </main>
  );
};

export default Search;
