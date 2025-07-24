import { MetaFunction } from "@remix-run/node";
import { CatalogComponent } from "~/components/Catalog";
import { Loading } from "~/components/Elements/Loading";
import { useCatalogs } from "~/hooks/useCatalog";

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
  const { catalogs, loading } = useCatalogs();

  if (loading) return <Loading />;
  if (catalogs.length === 0) return <Loading />;

  return (
    <main className="overflow-x-hidden pb-40">
      {catalogs.map((catalog, index) => (
        <CatalogComponent
        key={`catalog-${catalog.id}`}
          subtitle={catalog.subtitle}
          title={catalog.title}
          text={catalog.text}
          img={catalog.image}
          file={catalog.file}
          inverted={index % 2 !== 0}
        />
      ))}
    </main>
  );
};

export default Catalog;
