import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { useTranslation } from "react-i18next";

const pb = new PocketBase("https://singula.pt/admin");

export type IContacts = {
  name: string;
  email: string;
  contact: string;
  address: string;
};

const getLocalizedName = (item: any, lang: string): string => {
  return item[`name_${lang}`] || item.name_pt || item.slug;
};

export const useContacts = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] as "pt" | "en" | "es" | "fr" | "de";

  const [contacts, setContacts] = useState<IContacts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const result = await pb.collection("Pagina_Contactos").getFullList({
          sort: `name_${lang}`
        });

        const parsed = result.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          name: getLocalizedName(item, lang),
          contact: item.contact,
          email: item.email,
          address: item[`address_${lang}`],
        }));

        setContacts(parsed);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [lang]);

  return { contacts, loading, error };
};
