import { MetaFunction } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { Loading } from "~/components/Elements/Loading";
import { ProductPageEntry } from "~/components/ProductPages/Entry";
import { Entry } from "~/components/Products/Entry";
import { ProductList } from "~/components/Products/List";
import { usePageContent } from "~/hooks/usePageContent";

export const meta: MetaFunction = () => {
  return [
    { title: "Produtos - Singula" },
    {
      name: "description",
      content: "Na Singula não desenhamos só formas. Criamos personalidade. Seja num banco, numa floreira, numa divisória ou numa peça decorativa - cada detalhe conta. Porque o nosso design vive nas ruas, respira nos jardins e arruma-se com rigor em casa. Street, Garden ou Home - o cenário muda, mas a atitude é a mesma.",
    },
  ];
};

export const Products = () => {
  const { t } = useTranslation();

  const { data, loading } = usePageContent("Pagina_Produtos");

  if (loading) return <Loading />;
  if (Object.keys(data).length === 0) return <Loading />;

  return (
    <main className="bg-white overflow-x-hidden">
      <ProductPageEntry
        textClassName="text-black md:text-white"
        imgClassName="object-[40%_80%] md:object-[50%_20%]"
        img={data["product-entry-img"][0]}
        title="Products"
      />
      <Entry
        text={data["product-entry-text"] as string}
        className="pt-20 md:py-20"
      />
      <ProductList />
    </main>
  );
};
export default Products;
