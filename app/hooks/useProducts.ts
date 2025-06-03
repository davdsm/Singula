import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const pocketBaseUrl = "http://localhost:8090";

export const useProducts = ({
  subcategoryIds,
  productSlug,
}: {
  subcategoryIds?: string[];
  productSlug?: string;
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [Ready, setReady] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${pocketBaseUrl}/api/collections/Produtos/records?expand=subcategory,materiais,cores_recomendado,acabamentos_recomendado${
            productSlug ? `filter=slug~${productSlug}` : ""
          }`
        );

        const data = await res.json();

        const filtered = subcategoryIds
          ? data.items.filter(
              (item: ApiProduct) =>
                item.expand?.subcategory?.slug !== undefined &&
                subcategoryIds.includes(item.expand.subcategory.slug)
            )
          : data.items;

        const formatted: Product[] = filtered.map((item: ApiProduct) => ({
          id: item.id,
          slug: item.slug,
          name: (item as any)[`name_${lang}`] || item.name_pt,
          subtitle: (item as any)[`subtitle_${lang}`] || item.subtitle_pt,
          text: (item as any)[`text_${lang}`] || item.text_pt,
          secondTitle:
            (item as any)[`secondTitle_${lang}`] || item.secondTitle_pt,
          secondText: (item as any)[`secondText_${lang}`] || item.secondText_pt,
          acabamento: (item as any)[`acabamento_${lang}`] || item.acabamento_pt,
          pesos: (item as any)[`pesos_${lang}`] || item.pesos_pt,
          note: (item as any)[`note_${lang}`] || item.note_pt,
          banner: item.banner
            ? `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${item.banner}`
            : null,
          ImagemPrincipal: item.ImagemPrincipal
            ? `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${item.ImagemPrincipal}`
            : null,
          PrimeiraImagem: item.PrimeiraImagem
            ? `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${item.PrimeiraImagem}`
            : null,
          ImagemMeio: item.ImagemMeio
            ? `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${item.ImagemMeio}`
            : null,
          ImagemBottom: item.ImagemBottom
            ? `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${item.ImagemBottom}`
            : null,
          Ficha_Tecnica: item.Ficha_Tecnica
            ? `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${item.Ficha_Tecnica}`
            : null,
          Model_DWG: item.Model_DWG
            ? `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${item.Model_DWG}`
            : null,
          subcategory: item.expand?.subcategory || null,
          materiais: item.expand?.materiais || [],
          cores_recomendado: item.expand?.cores_recomendado || [],
          acabamentos_recomendado: item.expand?.acabamentos_recomendado || [],
        }));

        setProducts(formatted);
        setReady(true);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!Ready) {
      fetchProducts();
    }
  }, [subcategoryIds, lang]);

  return { products, loading, error };
};
