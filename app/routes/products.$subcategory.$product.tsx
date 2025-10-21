import { useParams } from "@remix-run/react";
import { ProductHero } from "~/components/ProductPage/ProductHero";
import { ProductGallery } from "~/components/ProductPage/ProductGallery";
import { ProductMaterials } from "~/components/ProductPage/ProductMaterials";
import { ProductInfoBoxes } from "~/components/ProductPage/ProductInfoBoxes";
import { ProductMaterialsSection } from "~/components/ProductPage/ProductMaterialsSection";
import { useProducts } from "~/hooks/useProducts";
import { useSubcategoriesBySlug } from "~/hooks/useProductSubCategories";
import { Loading } from "~/components/Elements/Loading";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { ApiProduct } from "~/hooks/interfaces";

interface ProdutoItem {
  slug: string;
  [key: string]: any;
}

interface ProdutosResponse {
  items: ProdutoItem[];
  [key: string]: any;
}

export const loader: LoaderFunction = async ({ params }) => {
  const productSlug = params.product;
  const pocketBaseUrl = "https://singula.pt/admin";

  const res = await fetch(
    `${pocketBaseUrl}/api/collections/Produtos/records?perPage=500&sort=order,id&expand=design,subcategory,materiais,cores_recomendado,acabamentos_recomendado,subcategory.category&slug~"${productSlug}"`
  );

  const data: ProdutosResponse = await res.json();
  const product: ProdutoItem | undefined = data.items.find(
    (item: ProdutoItem) => item.slug === productSlug
  );

  return product;
};

export const meta: MetaFunction = ({ data }) => {
  const product = data as ApiProduct;
  return [
    {
      title: `${
        product?.name_pt.replaceAll("<red>", "").replaceAll("</red>", "") ||
        "Produto"
      } - Singula`,
    },
    {
      name: "description",
      content: product?.subtitle_pt || "Veja nossos produtos",
    },

    { property: "og:image", content: product.ImagemPrincipal },
    {
      property: "og:title",
      content: `${
        product?.name_pt.replaceAll("<red>", "").replaceAll("</red>", "") ||
        "Produto"
      } - Singula`,
    },
    { property: "og:description", content: product?.subtitle_pt },
    { property: "og:type", content: "product" },

    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: `${
        product?.name_pt.replaceAll("<red>", "").replaceAll("</red>", "") ||
        "Produto"
      } - Singula`,
    },
    { name: "twitter:description", content: product?.subtitle_pt },
    { name: "twitter:image", content: product.ImagemPrincipal },
  ];
};

export const ProductPage = () => {
  const { subcategory, product } = useParams();

  const { products: productFinal, loading } = useProducts({
    productSlug: product,
  });

  const {
    subcategories,
    loading: LoadingSubcategories,
    error,
  } = useSubcategoriesBySlug(subcategory || "");

  const subcategoryTreated = subcategories.find(
    (subcat) => subcat.category.slug === subcategory
  );

  if (loading || !subcategoryTreated) return <Loading />;

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
