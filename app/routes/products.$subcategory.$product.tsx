import { useParams } from "@remix-run/react";
import { ProductHero } from "~/components/ProductPage/ProductHero";
import { ProductGallery } from "~/components/ProductPage/ProductGallery";
import { ProductMaterials } from "~/components/ProductPage/ProductMaterials";
import { ProductInfoBoxes } from "~/components/ProductPage/ProductInfoBoxes";
import { ProductMaterialsSection } from "~/components/ProductPage/ProductMaterialsSection";

export const ProductPage = () => {
  const { subcategory, product } = useParams();

  console.log("subcategpry...", subcategory);
  console.log("product...", product);

  return (
    <main className="bg-white">
      <div className="pt-32 md:pt-36">
        <ProductHero />

        <ProductGallery />

        <ProductMaterials />

        <ProductInfoBoxes />

        <ProductMaterialsSection />
      </div>
    </main>
  );
};

export default ProductPage;
