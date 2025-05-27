import { ProductHero } from "~/components/ProductPage/ProductHero";
import { ProductGallery } from "~/components/ProductPage/ProductGallery";
import { ProductMaterials } from "~/components/ProductPage/ProductMaterials";
import { ProductDownload } from "~/components/ProductPage/ProductDownload";

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

        {/* Seção Downloads e desenhos técnicos */}
        <ProductDownload />
      </div>
    </main>
  );
};

export default ProductPage;
