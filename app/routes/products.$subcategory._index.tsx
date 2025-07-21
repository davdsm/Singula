import { useParams } from "@remix-run/react";
import { useState } from "react";
import { CategoriesList } from "~/components/CategoriesList";
import { ProductCategoryList } from "~/components/CategoriesList/categoryListProducts";
import { Filters } from "~/components/CategoriesList/filters";
import { Loading } from "~/components/Elements/Loading";
import { ProductPageEntry } from "~/components/ProductPages/Entry";
import { Entry } from "~/components/Products/Entry";
import { useCategories } from "~/hooks/useProductCategories";
import { useProducts } from "~/hooks/useProducts";
import { useSubcategoriesBySlug } from "~/hooks/useProductSubCategories";
import { LoaderFunction, MetaFunction } from "@remix-run/node";

type Category = {
  title_pt?: string;
  text_pt?: string;
  title?: string;
  text?: string;
  slug?: string;
  banner?: string;
  image?: string;
  design?: { slug?: string };
};

export const loader: LoaderFunction = async ({ params }) => {
  const subcategorySlug = params.subcategory;
  const pocketBaseUrl = "https://singula.pt/admin";

  const res = await fetch(
    `${pocketBaseUrl}/api/collections/Categorias/records?expand=design&sort=order,id`
  );
  const data = await res.json();
  const category: Category = data.items.find(
    (item: any) => item.slug === subcategorySlug
  );

  return category;
};

export const meta: MetaFunction = ({ data }) => {
  const category = data as Category;
  return [
    { title: `${category?.title_pt || "Produtos"} - Singula` },
    {
      name: "description",
      content: category?.text_pt || "Veja nossos produtos",
    },

    { property: "og:image", content: category.image },
    {
      property: "og:title",
      content: `${
        category.title?.replaceAll("<red>", "").replaceAll("</red>", "") ||
        "Produto"
      } - Singula`,
    },
    { property: "og:description", content: category.title },
    { property: "og:type", content: "category" },

    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: `${
        category.title?.replaceAll("<red>", "").replaceAll("</red>", "") ||
        "Categoria"
      } - Singula`,
    },
    { name: "twitter:description", content: category.text },
    { name: "twitter:image", content: category.image },
  ];
};

export const Subcategory = () => {
  const { subcategory } = useParams();
  const [SelectedSubCat, setSelectedSubCat] = useState("");

  // Hooks must be called unconditionally
  const { subcategories, loading, error } = useSubcategoriesBySlug(
    subcategory || ""
  );
  const { categories, loading: loadingCategories } = useCategories();
  const { products, loading: loadingProduct } = useProducts({
    subcategoryIds: subcategories.map((subcat) => subcat.slug),
  });

  if (!subcategory || loading || loadingProduct || loadingCategories)
    return <Loading />;
  if (error || subcategories.length === 0) return <h1>Error or no data</h1>;

  const filteredProducts = products.filter((product) =>
    product.subcategory?.slug.includes(SelectedSubCat)
  );

  return (
    <main className="bg-[#f5f5f5] overflow-x-hidden">
      <ProductPageEntry
        textClassName="text-white md:white"
        imgClassName="object-center md:object-[50%_20%]"
        img={subcategories[0].category.banner}
        title={subcategories[0].category.title}
      />
      <CategoriesList
        categories={categories.map((cat) => ({
          title: cat.title,
          slug: cat.slug,
          design: cat?.design?.slug || "",
          img: cat.image || "",
          banner: cat.banner || "",
          text: cat.text,
        }))}
      />
      <Entry text={subcategories[0].category.text} />

      <Filters
        filtersList={subcategories.map((subcat) => ({
          title: subcat.title,
          slug: subcat.slug,
          onClick: () => setSelectedSubCat(subcat.slug),
        }))}
        selectedSlug={SelectedSubCat}
        clearFilters={() => setSelectedSubCat("")}
      />

      <ProductCategoryList
        list={filteredProducts.map((product) => ({
          name: product.name,
          slug: product.slug,
          img: product.ImagemPrincipal || "",
        }))}
        subcategory={subcategory}
      />
    </main>
  );
};

export default Subcategory;
