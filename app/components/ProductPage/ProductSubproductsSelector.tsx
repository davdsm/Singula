import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Subproduct } from "~/hooks/interfaces";
import { ConfiguratorOptionGrid } from "./ConfiguratorOptionGrid";

export const ProductSubproductsSelector = ({
  subproducts,
  selectedSubproductId,
  onSelect,
  title,
}: {
  subproducts: Subproduct[];
  selectedSubproductId: string | null;
  onSelect: (subproductId: string) => void;
  /** When set (e.g. numbered step label), replaces the default “choose subproduct” heading. */
  title?: ReactNode;
}) => {
  const { t } = useTranslation();

  if (subproducts.length === 0) return null;

  return (
    <ConfiguratorOptionGrid
      title={
        title ??
        t("product.variants.chooseSubproduct", {
          defaultValue: "Escolha o Produto",
        })
      }
      options={subproducts.map((s) => ({
        id: s.id,
        name: s.name,
        image: s.image,
        detail: s.reference ?? null,
      }))}
      selectedId={selectedSubproductId}
      onSelect={onSelect}
    />
  );
};
