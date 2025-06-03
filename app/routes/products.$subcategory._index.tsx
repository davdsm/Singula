import { useParams } from "@remix-run/react";
import { useState } from "react";
import { CategoriesList } from "~/components/CategoriesList";
import { Filters } from "~/components/CategoriesList/filters";
import { ProductPageEntry } from "~/components/ProductPages/Entry";
import { Entry } from "~/components/Products/Entry";
import { useCategories } from "~/hooks/useProductCategories";
import { useSubcategoriesBySlug } from "~/hooks/useProductSubCategories";

export const Subcategory = () => {
  const { subcategory } = useParams();
  const [SelectedSubCat, setSelectedSubCat] = useState("");

  // Hooks must be called unconditionally
  const { subcategories, loading, error } = useSubcategoriesBySlug(
    subcategory || ""
  );
  const { categories } = useCategories();

  if (!subcategory || loading) return <h1>Loading...</h1>;
  if (error || subcategories.length === 0) return <h1>Error or no data</h1>;

  return (
    <main className="bg-[#f5f5f5]">
      <ProductPageEntry
        textClassName="text-white md:white"
        imgClassName="object-[40%_80%] md:object-[50%_20%]"
        img={subcategories[0].category.banner}
        title={subcategories[0].category.title}
      />
      0
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
      {
        <Filters
          filtersList={subcategories.map((subcat) => ({
            title: subcat.title,
            slug: subcat.slug,
            onClick: () => setSelectedSubCat(subcat.slug),
          }))}
          selectedSlug={SelectedSubCat}
          clearFilters={() => setSelectedSubCat("")}
        />

        /*   <ProductCategoryList list={productList} subcategory={subcategory} /> */
      }
    </main>
  );
};

export default Subcategory;
