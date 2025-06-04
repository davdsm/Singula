import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const POCKETBASE_URL = "http://192.168.1.135:8090";

type AcabamentoItem = {
  id: string;
  slug: string;
  name: string;
  text: string;
  image?: string;
};

export function useAcabamentos() {
  const { i18n } = useTranslation();
  const [items, setItems] = useState<AcabamentoItem[]>([]);
  const lang = i18n.language || "pt";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${POCKETBASE_URL}/api/collections/Acabamentos/records`
        );
        const data = await res.json();

        const processed = data.items.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          name: item[`name_${lang}`] || item.name_pt,
          text: item[`text_${lang}`] || item.text_pt,
          image: item.image
            ? `${POCKETBASE_URL}/api/files/${item.collectionId}/${item.id}/${item.image}`
            : undefined,
        }));

        setItems(processed);
      } catch (error) {
        console.error("Failed to fetch Acabamentos:", error);
      }
    };

    fetchData();
  }, [lang]);

  return items;
}
