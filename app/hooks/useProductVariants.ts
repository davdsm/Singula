import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Subproduct, VariationOption } from "./interfaces";

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

type ApiVariation = {
  id: string;
  collectionId?: string;
  product: string;
  subproduct?: string | null;
  image?: string | string[];
  img?: string | string[];
  reference: string;
  ref?: string;
  price?: number | null;
  price_visible?: boolean;
  order?: number;
  active?: boolean;
  expand?: {
    materials?: Array<{ id: string; [key: string]: any }>;
    ral?: Array<{ id: string; [key: string]: any }>;
    ral_colors?: Array<{ id: string; [key: string]: any }>;
  };
  ral?: string[];
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

export const useProductVariants = (productId?: string) => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || "pt").toLowerCase();

  const [subproducts, setSubproducts] = useState<Subproduct[]>([]);
  const [variations, setVariations] = useState<VariationOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setSubproducts([]);
      setVariations([]);
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const [subRes, varRes] = await Promise.all([
          fetch(
            `${pocketBaseUrl}/api/collections/Subprodutos/records?perPage=200&sort=order,id`
          ),
          fetch(
            `${pocketBaseUrl}/api/collections/Variacoes/records?perPage=500&sort=order,id&expand=materials,ral,ral_colors&filter=(product='${productId}')&&active=true`
          ),
        ]);

        const [subData, varData] = await Promise.all([subRes.json(), varRes.json()]);

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

        const normalizedVariations: VariationOption[] = (varData?.items ?? []).map(
          (item: ApiVariation) => ({
            id: item.id,
            productId: item.product,
            subproductId: item.subproduct ?? null,
            image: buildFileUrl(
              item.collectionId,
              item.id,
              item.image ?? item.img
            ),
            reference: item.reference ?? item.ref ?? "",
            price: item.price ?? null,
            priceVisible: Boolean(item.price_visible),
            materials: (item.expand?.materials ?? []).map((mat) => ({
              id: mat.id,
              name: getLocalizedValue(mat, lang, "name"),
            })),
            ralColors: (item.expand?.ral_colors ?? item.expand?.ral ?? []).map(
              (color) => ({
                id: color.id,
                name: getLocalizedValue(color, lang, "name"),
              })
            ),
            order: item.order ?? 0,
            active: item.active ?? true,
          })
        );

        setSubproducts(normalizedSubproducts);
        setVariations(normalizedVariations);
      } catch (e) {
        console.error(e);
        setError("Failed to load product variants");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [lang, productId]);

  const hasSubproducts = subproducts.length > 0;

  const directVariations = useMemo(
    () => variations.filter((v) => !v.subproductId),
    [variations]
  );

  const getVariationsBySubproduct = (subproductId: string) =>
    variations.filter((v) => v.subproductId === subproductId);

  return {
    subproducts,
    variations,
    directVariations,
    hasSubproducts,
    getVariationsBySubproduct,
    loading,
    error,
  };
};
