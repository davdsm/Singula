import { useCallback, useEffect, useState } from "react";
import { Product } from "./interfaces";
import { useTranslation } from "react-i18next";
import { formatApiProductsIntoProducts } from "./useProducts";

const pocketBaseUrl = "https://singula.pt/admin";

export const useSearch = ({ searchString }: { searchString: string }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [ApiError, setApiError] = useState<string | null>(null);

  const buildSearchUrl = useCallback(
    (searchString: string): string => {
      const baseUrl = `${pocketBaseUrl}/api/collections/Produtos/records`;

      const cleanSearchString = searchString.trim();
      if (!cleanSearchString) return baseUrl;

      const escapedTerm = cleanSearchString.replace(/['"\\]/g, "\\$&");

      const productFields = [
        "name",
        "subtitle",
        "text",
        "NotaEspecial",
        "acabamento",
        "note",
      ];

      const languages = ["pt", "en", "es", "fr", "de"];

      const productRefsFields = [
        "ref_primeiras_imagens",
        "ref_imagens_meio",
        "ref_segunda_imagem_meio",
      ];

      const productFieldConditions = productFields.flatMap((field) =>
        languages.map((lang) => `${field}_${lang} ~ "${escapedTerm}"`)
      );

      const productRefConditions = productRefsFields.flatMap((field) =>
        languages.map((lang) => `${field} ~ "${escapedTerm}"`)
      );

      productFieldConditions.push(`slug ~ "${escapedTerm}"`);

      const designFieldConditions = [
        `design.name ~ "${escapedTerm}"`,
        `design.slug ~ "${escapedTerm}"`,
      ];

      const allConditions = [
        ...productFieldConditions,
        ...designFieldConditions,
        ...productRefConditions
      ];
      const filter = `(${allConditions.join(" || ")})`;

      const params = new URLSearchParams({
        expand: "design,subcategory,subcategory.category",
        filter: filter,
        sort: "-featured,order,name_pt",
      });

      return `${baseUrl}?${params.toString()}`;
    },
    [pocketBaseUrl]
  );

  const searchProducts = useCallback(
    async (searchString: string): Promise<void> => {
      if (!searchString.trim()) {
        setProducts([]);
        setApiError(null);
        return;
      }

      try {
        setLoading(true);
        setApiError(null);

        const url = buildSearchUrl(searchString);

        const response = await fetch(url);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error Response:", errorText);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        const formattedProducts = formatApiProductsIntoProducts(
          lang,
          data.items
        );
        setProducts(formattedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setApiError(
          err instanceof Error
            ? err.message
            : "An error occurred while searching"
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [buildSearchUrl, lang, formatApiProductsIntoProducts]
  );

  const clearSearch = useCallback(() => {
    setProducts([]);
    setApiError(null);
  }, []);

  return {
    products,
    loading,
    ApiError,
    searchProducts,
    clearSearch,
  };
};
