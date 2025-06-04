import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const pocketBaseUrl = "http://192.168.1.135:8090"; // Use your actual URL in production

export type Design = {
  id: string;
  [key: string]: any; // Extend based on your Desings structure
};

export type Category = {
  id: string;
  title: string;
  slug: string;
  text: string;
  image?: string;
  banner?: string;
  design?: Design | null;
};

export function useCategories() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);

        const res = await fetch(
          `${pocketBaseUrl}/api/collections/Categorias/records?expand=design`
        );
        const data = await res.json();

        const items = (data.items ?? []).map((item: any): Category => {
          const title = item[`title_${lang}`] || item.title_pt || "";
          const text = item[`text_${lang}`] || item.text_pt || "";

          const fileUrl = (filename: string | undefined) =>
            filename
              ? `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${filename}`
              : undefined;

          return {
            id: item.id,
            title,
            slug: item.slug,
            text,
            image: fileUrl(item.image),
            banner: fileUrl(item.banner),
            design: item.expand?.design ?? null,
          };
        });

        setCategories(items);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [lang]);

  return { categories, loading, error };
}
