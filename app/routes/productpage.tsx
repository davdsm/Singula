import { ProductHero } from "~/components/ProductPage/ProductHero";
import { ProductGallery } from "~/components/ProductPage/ProductGallery";
import { ProductMaterials } from "~/components/ProductPage/ProductMaterials";
import { ProductInfoBoxes } from "~/components/ProductPage/ProductInfoBoxes";
import { ProductMaterialsSection } from "~/components/ProductPage/ProductMaterialsSection";

export const ProductPage = () => {
  return (
    <main className="bg-white">
      {/* Padding-top para não sobrepor o menu fixo */}
      <div className="pt-32 md:pt-36">
        {/* Seção Hero do produto */}
        <ProductHero />

        {/* Seção Galeria de imagens */}
        <ProductGallery />

        {/* Seção Materiais e especificações */}
        <ProductMaterials />

        {/* Seção com as 3 caixas (Downloads, Cores e Notas) */}
        <ProductInfoBoxes />

        {/* Seção com imagem e botão de materiais */}
        <ProductMaterialsSection />
      </div>
    </main>
  );
};

export default ProductPage;
