import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import pb from "~/lib/pocketbase"; // make sure this is your configured PocketBase instance

export interface ICatalog {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  file: string;
  image: string;
}

const pocketBaseUrl = "https://singula.pt/admin";

export const useCatalogs = () => {
  const { i18n } = useTranslation();

  const lang = i18n.language && i18n.language.includes("-")
    ? (i18n.language.split("-")[0] as "pt" | "en" | "es" | "fr" | "de")
    : i18n.language;

  const [catalogs, setCatalogs] = useState<ICatalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        setLoading(true);
        const response = await pb.collection("Catalogos").getFullList();

        const parsed: ICatalog[] = response.map((item: any) => ({
          id: item.id,
          title: item[`title_${lang}`],
          subtitle: item[`subtitle_${lang}`],
          text: item[`text_${lang}`],
          file: `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${
            item[`file_${lang}`]
          }`,
          image: `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${
            item[`image_${lang}`]
          }`,
        }));

        setCatalogs(parsed);
      } catch (err: any) {
        setError(err.message || "Failed to fetch catalogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogs();
  }, [lang]);

  return { catalogs, loading, error };
};
