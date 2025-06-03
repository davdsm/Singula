import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const POCKETBASE_URL = "http://localhost:8090";

type CompactoHPLItem = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string; // Optional image if added
};

export function useCompactoHPL() {
  const { i18n } = useTranslation();
  const [items, setItems] = useState<CompactoHPLItem[]>([]);
  const lang = i18n.language || "pt";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${POCKETBASE_URL}/api/collections/Compacto_HPL/records`
        );
        const data = await res.json();

        const processed = data.items.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          name: item[`name_${lang}`] || item.name_pt,
          description: item[`description_${lang}`] || item.description_pt,
          image: item.image
            ? `${POCKETBASE_URL}/api/files/${item.collectionId}/${item.id}/${item.image}`
            : undefined,
        }));

        setItems(processed);
      } catch (error) {
        console.error("Failed to fetch Compacto_HPL items:", error);
      }
    };

    fetchData();
  }, [lang]);

  return items;
}
