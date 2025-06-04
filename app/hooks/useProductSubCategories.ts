import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const pocketBaseUrl = "http://192.168.1.135:8090";

type Subcategory = {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: {
    title: string;
    text: string;
    slug: string;
    image: string;
    banner: string;
  };
};

export const useSubcategoriesBySlug = (categorySlug: string | null) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "pt";

  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!categorySlug) return;

    const fetchSubcategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${pocketBaseUrl}/api/collections/Subcategorias/records?expand=category&perPage=200`
        );
        const data = await res.json();

        const filtered = data.items.filter(
          (item: any) => item.expand?.category?.slug === categorySlug
        );

        const parsed = filtered.map((item: any) => {
          const category = item.expand.category;

          return {
            id: item.id,
            title: item[`title_${lang}`] || item.title_pt,
            slug: item.slug,
            image: `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${item.image}`,
            category: {
              title: category[`title_${lang}`] || category.title_pt,
              text: category[`text_${lang}`] || category.text_pt,
              slug: category.slug,
              image: `${pocketBaseUrl}/api/files/${category.collectionId}/${category.id}/${category.image}`,
              banner: `${pocketBaseUrl}/api/files/${category.collectionId}/${category.id}/${category.banner}`,
            },
          };
        });

        setSubcategories(parsed);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categorySlug, lang]);

  return { subcategories, loading, error };
};
