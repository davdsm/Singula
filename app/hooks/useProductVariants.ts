import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Subproduct } from "./interfaces";

const pocketBaseUrl = "https://singula.pt/admin";

type ApiSubproduct = {
  id: string;
  collectionId?: string;
  product?: string;
  products?: string;
  image?: string | string[];
  img?: string | string[];
  reference?: string;
  ref?: string;
  order?: number;
  active?: boolean;
  [key: string]: any;
};

const getLocalizedValue = (item: any, lang: string, baseKey: string) =>
  item?.[`${baseKey}_${lang}`] ??
  item?.[`${baseKey}_pt`] ??
  item?.[`${baseKey}_en`] ??
  "";

const buildFileUrl = (
  collectionId: string | undefined,
  recordId: string,
  file: string | string[] | undefined
) => {
  if (!collectionId || !file) return null;
  const fileName = Array.isArray(file) ? file[0] : file;
  if (!fileName) return null;
  return `${pocketBaseUrl}/api/files/${collectionId}/${recordId}/${fileName}`;
};

/** Subproducts only for PDP configurator (no Variacoes fetch). */
export const useProductSubproducts = (productId?: string) => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || "pt").toLowerCase();

  const [subproducts, setSubproducts] = useState<Subproduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setSubproducts([]);
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const subRes = await fetch(
          `${pocketBaseUrl}/api/collections/Subprodutos/records?perPage=200&sort=order,id`
        );
        const subData = await subRes.json();

        const normalizedSubproducts: Subproduct[] = (subData?.items ?? [])
          .map((item: ApiSubproduct) => ({
            id: item.id,
            productId: item.product ?? item.products ?? "",
            name: getLocalizedValue(item, lang, "name"),
            image: buildFileUrl(
              item.collectionId,
              item.id,
              item.image ?? item.img
            ),
            reference: item.reference ?? item.ref ?? null,
            order: item.order ?? 0,
            active: item.active ?? true,
          }))
          .filter(
            (item: Subproduct) => item.productId === productId && item.active
          );

        setSubproducts(normalizedSubproducts);
      } catch (e) {
        console.error(e);
        setError("Failed to load subproducts");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [lang, productId]);

  const hasSubproducts = subproducts.length > 0;

  return {
    subproducts,
    hasSubproducts,
    loading,
    error,
  };
};

/** @deprecated Use useProductSubproducts — kept alias for gradual migration. */
export const useProductVariants = useProductSubproducts;
