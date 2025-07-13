import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const useCountries = () => {
  const [Countries, setCountries] = useState([]);
  const [Loading, setLoading] = useState(true);

  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] as "pt" | "en" | "es" | "fr" | "de";

  useEffect(() => {
    if (Countries.length > 0) return;

    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/locales/${lang}/countries.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data.countries || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [lang]);

  return { Countries: Object.values(Countries), Loading };
};

export default useCountries;
