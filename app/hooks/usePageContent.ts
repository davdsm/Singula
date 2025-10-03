import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import pb from "~/lib/pocketbase";
import { ApiProduct } from "./interfaces";

type PageData = Record<string, string | string[]>;

// Set your PocketBase base URL here
const pocketBaseUrl = "https://singula.pt/admin";

export function usePageContent(collection: string) {
  const [data, setData] = useState<PageData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const records = await pb.collection(collection).getFullList<any>({
          expand: "products_on_slide",
        });

        const lang = i18n.language?.toLowerCase() || "en";
        const langKey = `value_${lang}`;

        const mapped: PageData = {};

        for (const item of records) {
          const value = item[langKey];
          const image = item.image;

          if (item.image_fr && item.image_fr.length > 0) {
            const img = `${pocketBaseUrl}/api/files/${item.collectionId}/${
              item.id
            }/${item[`image_${lang}`]}`;
            mapped[item.section_id] = img;
          } else if (value) {
            mapped[item.section_id] = value;
          } else if (Array.isArray(image) && image.length > 0) {
            // Build full URLs for each image
            const imageUrls = image.map(
              (fileName: string) =>
                `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${fileName}`
            );
            mapped[item.section_id] = imageUrls;
          }

          if (
            item.hasOwnProperty("products_on_slide") &&
            item["products_on_slide"].length > 0
          ) {
            const productsLinks = item.expand.products_on_slide.map(
              (product: ApiProduct) => `/search?look=${product.name_en}`
            );
            mapped["productLinks"] = productsLinks;
          }
        }

        setData(mapped);
      } catch (err: any) {
        setError(err.message || "Error fetching page content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collection, i18n.language]);

  return { data, loading, error };
}
