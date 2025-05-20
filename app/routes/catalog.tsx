import { MetaFunction } from "@remix-run/node";
import { CatalogComponent } from "~/components/Catalog";

export const meta: MetaFunction = () => {
  return [
    { title: "Catálogo - Singula" },
    {
      name: "description",
      content:
        "É aço com alma, traço com intenção, forma que fala antes da função.",
    },
  ];
};

export const Catalog = () => {
  return (
    <main>
      <CatalogComponent />
    </main>
  );
};

export default Catalog;
