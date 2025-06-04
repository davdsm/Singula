import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { useTranslation } from "react-i18next";

const pb = new PocketBase("http://localhost:8090");

export type CoresRal = {
  id: string;
  slug: string;
  name: string;
  image: string;
};

const getLocalizedName = (item: any, lang: string): string => {
  return item[`name_${lang}`] || item.name_pt || item.slug;
};

export const useCoresRal = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] as "pt" | "en" | "es" | "fr" | "de";

  const [cores, setCores] = useState<CoresRal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCores = async () => {
      try {
        setLoading(true);
        const result = await pb.collection("Cores_Ral").getFullList({
          sort: `name_${lang}`,
        });

        const parsed = result.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          name: getLocalizedName(item, lang),
          image: pb.files.getUrl(item, item.image),
        }));

        setCores(parsed);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCores();
  }, [lang]);

  return { cores, loading, error };
};
