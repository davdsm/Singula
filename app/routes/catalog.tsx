import { MetaFunction } from "@remix-run/node";
import { CatalogComponent } from "~/components/Catalog";
import { usePageContent } from "~/hooks/usePageContent";

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
  const { data, loading } = usePageContent("Pagina_Catalogo");

  if (loading) return <p>Loading...</p>;
  if (Object.keys(data).length === 0) return <p>Loading...</p>;

  return (
    <main className="overflow-x-hidden">
      <CatalogComponent
        subtitle={data["catalog-subtitle"] as string}
        title={data["catalog-title"] as string}
        text={data["catalog-text"] as string}
        img={data["catalog-img"][0] as string}
        file={data["catalog-file"][0] as string}
      />
    </main>
  );
};

export default Catalog;
