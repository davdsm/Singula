import { useParams } from "@remix-run/react";
import { ProductHero } from "~/components/ProductPage/ProductHero";
import { ProductGallery } from "~/components/ProductPage/ProductGallery";
import { ProductMaterials } from "~/components/ProductPage/ProductMaterials";
import { ProductInfoBoxes } from "~/components/ProductPage/ProductInfoBoxes";
import { ProductMaterialsSection } from "~/components/ProductPage/ProductMaterialsSection";
import { useProducts } from "~/hooks/useProducts";

export const ProductPage = () => {
  const { subcategory, product } = useParams();

  const { products: productFinal, loading } = useProducts({
    productSlug: product,
  });

  if (loading) return <>loading...</>;

  console.log("products..", productFinal);

  return (
    <main className="bg-white overflow-x-hidden">
      <div className="pt-32 md:pt-36">
        <ProductHero product={productFinal[0]} />

        <ProductGallery product={productFinal[0]} />

        <ProductMaterials />

        <ProductInfoBoxes />

        <ProductMaterialsSection />
      </div>
    </main>
  );
};

export default ProductPage;
