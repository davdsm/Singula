import { useTranslation } from "react-i18next";
import { MainColor } from "~/components/Elements/Colors/main";
import { ProductPageEntry } from "~/components/ProductPages/Entry";
import { Entry } from "~/components/Products/Entry";
import { ProductList } from "~/components/Products/List";

export const Products = () => {
  const { t } = useTranslation();
  return (
    <main className="bg-white">
      <ProductPageEntry
        textClassName="text-black md:text-white"
        imgClassName="object-[40%_80%] md:object-[50%_20%]"
        img="/media/products/banner.png"
        title="Products"
      />
      <Entry
        text={
          <>
            {t("entry.text.part1")}{" "}
            <MainColor>{t("entry.text.highlight")}</MainColor>.
            {t("entry.text.part2")}
          </>
        }
        className="py-20"
      />
      <ProductList />
    </main>
  );
};
export default Products;
