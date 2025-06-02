import { useParams } from "@remix-run/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { CategoriesList } from "~/components/CategoriesList";
import { ProductCategoryList } from "~/components/CategoriesList/categoryListProducts";
import { Filters } from "~/components/CategoriesList/filters";
import { ProductPageEntry } from "~/components/ProductPages/Entry";
import { Entry } from "~/components/Products/Entry";

export const Subcategory = () => {
  const [Categories, setCategories] = useState<
    {
      title: string;
      slug: string;
      design: string;
      img: string;
      banner: string;
      text: string;
    }[]
  >([]);

  const [SubCategories, setSubCategories] = useState<
    {
      category: string;
      name: string;
      slug: string;
      img: string;
    }[]
  >([]);

  const [Products, setProducts] = useState<
    {
      name: string;
      slug: string;
      subcategory: string;
      title1: string;
      text1: string;
      title2: string;
      text2: string;
      imgs: string[];
    }[]
  >([]);

  const [SelectedSlug, setSelectedSlug] = useState<string>("");

  const { subcategory } = useParams();

  useEffect(() => {
    if (subcategory && Categories.length === 0)
      fetch("/api/pt/categories.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setCategories(data));

    if (subcategory && SubCategories.length === 0)
      fetch("/api/pt/subcategories.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (
            data: {
              category: string;
              name: string;
              slug: string;
              img: string;
            }[]
          ) =>
            setSubCategories(
              data.filter((subCat) => subCat.category === subcategory)
            )
        );

    const subCategoriesSlugs = SubCategories.map((subcat) => subcat.slug);

    if (subcategory && Products.length === 0)
      fetch("/api/pt/products.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (
            data: {
              name: string;
              slug: string;
              subcategory: string;
              title1: string;
              text1: string;
              title2: string;
              text2: string;
              imgs: string[];
            }[]
          ) =>
            setProducts(
              data.filter((product) =>
                subCategoriesSlugs.includes(product.subcategory)
              )
            )
        );
  }, [Categories]);

  const category = Categories.find((cat) => cat.slug === subcategory)!;
  const subCategoriesList: {
    title: string;
    slug: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }[] = [];

  SubCategories.forEach((subcat) =>
    subCategoriesList.push({
      title: subcat.name,
      slug: subcat.slug,
      onClick: () => setSelectedSlug(subcat.slug),
    })
  );

  const productList: {
    name: string;
    slug: string;
    img: string;
  }[] = [];

  Products.forEach((product) => {
    if (SelectedSlug === "" || product.subcategory === SelectedSlug) {
      productList.push({
        name: product.name,
        slug: product.slug,
        img: product.imgs[0],
      });
    }
  });

  return (
    <>
      {category &&
        subcategory &&
        Categories.length > 0 &&
        SubCategories.length > 0 && (
          <main className="bg-[#f5f5f5]">
            <ProductPageEntry
              textClassName="text-white md:white"
              imgClassName="object-[40%_80%] md:object-[50%_20%]"
              img={category.banner}
              title={category.title}
            />
            <CategoriesList categories={Categories} />
            <Entry text={<>{category.text}</>} />
            <Filters
              filtersList={subCategoriesList}
              selectedSlug={SelectedSlug}
              clearFilters={() => setSelectedSlug("")}
            />

            <ProductCategoryList list={productList} subcategory={subcategory} />
          </main>
        )}
    </>
  );
};

export default Subcategory;
