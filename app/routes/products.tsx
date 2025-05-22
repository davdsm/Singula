import { ProductPageEntry } from "~/components/ProductPages/Entry";
import { Entry } from "~/components/Products/Entry";
import { ProductList } from "~/components/Products/List";

export const Products = () => {
  return (
    <main className="bg-white">
      <ProductPageEntry
        textClassName="text-black md:white"
        imgClassName="object-[40%_80%] md:object-[50%_20%]"
        img="/media/products/banner.png"
        title="Products"
      />
      <Entry />
      <ProductList />
    </main>
  );
};
export default Products;
