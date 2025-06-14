import { useTranslation } from "react-i18next";
import { MainColor } from "~/components/Elements/Colors/main";
import { Loading } from "~/components/Elements/Loading";
import { ProductPageEntry } from "~/components/ProductPages/Entry";
import { Entry } from "~/components/Products/Entry";
import { ProductList } from "~/components/Products/List";
import { parseTextWithMainColor } from "~/components/utils";
import { usePageContent } from "~/hooks/usePageContent";

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
        className="py-20"
      />
      <ProductList />
    </main>
  );
};
export default Products;
