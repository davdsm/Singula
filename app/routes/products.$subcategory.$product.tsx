import { useParams } from "@remix-run/react";
import { ProductHero } from "~/components/ProductPage/ProductHero";
import { ProductGallery } from "~/components/ProductPage/ProductGallery";
import { ProductMaterials } from "~/components/ProductPage/ProductMaterials";
import { ProductInfoBoxes } from "~/components/ProductPage/ProductInfoBoxes";
import { ProductMaterialsSection } from "~/components/ProductPage/ProductMaterialsSection";
import { useProducts } from "~/hooks/useProducts";
import { useSubcategoriesBySlug } from "~/hooks/useProductSubCategories";

export const ProductPage = () => {
  const { subcategory, product } = useParams();

  const { products: productFinal, loading } = useProducts({
    productSlug: product,
  });

  // Hooks must be called unconditionally
  const {
    subcategories,
    loading: LoadingSubcategories,
    error,
  } = useSubcategoriesBySlug(subcategory || "");

  const subcategoryTreated = subcategories.find(
    (subcat) => subcat.category.slug === subcategory
  );

  if (loading || !subcategoryTreated) return <>loading...</>;

  return (
    <main className="bg-white overflow-x-hidden">
      <div className="pt-32 md:pt-36">
        <ProductHero
          product={productFinal[0]}
          subcategory={subcategoryTreated!}
        />

        <ProductGallery product={productFinal[0]} />

        <ProductMaterials product={productFinal[0]} />

        <ProductInfoBoxes product={productFinal[0]} />

        <ProductMaterialsSection product={productFinal[0]} />
      </div>
    </main>
  );
};

export default ProductPage;
