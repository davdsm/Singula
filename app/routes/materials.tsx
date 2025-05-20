import { About } from "~/components/ProductPages/About";
import { BannerText } from "~/components/ProductPages/BannerText";
import { CoresRal } from "~/components/ProductPages/CoresRal";
import { ProductPageEntry } from "~/components/ProductPages/Entry";
import { Finishings } from "~/components/ProductPages/Finishings";
import { HPL } from "~/components/ProductPages/HPL";

export const Materials = () => {
  return (
    <main className="bg-white">
      <ProductPageEntry img="/media/materials/entry.png" title="Materials" />
      <About />
      <BannerText />
      <CoresRal />
      <HPL />
      <Finishings />
    </main>
  );
};

export default Materials;
