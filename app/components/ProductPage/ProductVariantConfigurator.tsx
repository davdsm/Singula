import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AddToCartPayload, Product } from "~/hooks/interfaces";
import { useCart } from "~/hooks/useCart";
import { useProductVariants } from "~/hooks/useProductVariants";
import { ProductSubproductsSelector } from "./ProductSubproductsSelector";
import { ProductVariantsTable } from "./ProductVariantsTable";

export const ProductVariantConfigurator = ({
  product,
}: {
  product: Product;
}) => {
  const { t } = useTranslation();
  const {
    subproducts,
    directVariations,
    hasSubproducts,
    getVariationsBySubproduct,
    loading,
    error,
  } = useProductVariants(product.id);
  const { addItem } = useCart();

  const [selectedSubproductId, setSelectedSubproductId] = useState<string | null>(null);
  const [cartFeedback, setCartFeedback] = useState("");
  const sanitizedProductName = product.name
    .replaceAll("<red>", "")
    .replaceAll("</red>", "")
    .trim();

  const currentVariations = useMemo(() => {
    if (hasSubproducts) {
      if (!selectedSubproductId) return [];
      return getVariationsBySubproduct(selectedSubproductId);
    }
    return directVariations;
  }, [directVariations, getVariationsBySubproduct, hasSubproducts, selectedSubproductId]);

  const onSubproductSelect = (subproductId: string) => {
    setSelectedSubproductId(subproductId);
    setCartFeedback("");
  };

  const buildPayload = (
    variationId: string,
    quantity: number
  ): AddToCartPayload | null => {
    const selectedVariation = currentVariations.find((v) => v.id === variationId);
    if (!selectedVariation) return null;

    return {
      productId: product.id,
      productSlug: product.slug,
      subproductId: selectedSubproductId,
      variationId: selectedVariation.id,
      variationReference: selectedVariation.reference,
      selectedMaterialIds: selectedVariation.materials.map((m) => m.id),
      selectedRalIds: selectedVariation.ralColors.map((c) => c.id),
      unitPrice: selectedVariation.price,
      priceVisible: selectedVariation.priceVisible,
      quantity,
    };
  };

  const handleAddToCart = (variationId: string, quantity: number) => {
    const payload = buildPayload(variationId, quantity);
    if (!payload) return;

    const selectedVariation = currentVariations.find((v) => v.id === variationId);
    const selectedSubproduct = subproducts.find((sub) => sub.id === selectedSubproductId);
    addItem(payload, {
      productName: sanitizedProductName,
      subproductName: selectedSubproduct?.name ?? null,
      variationImage: selectedVariation?.image ?? null,
    });

    setCartFeedback(
      t("product.variants.added", {
        defaultValue: "Versão adicionada ao carrinho.",
      })
    );
  };

  if (loading) {
    return (
      <section className="w-full mt-12">
        <p className="text-gray-500">
          {t("product.variants.loading", { defaultValue: "A carregar versões..." })}
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full mt-12">
        <p className="text-rose-500">
          {t("product.variants.error", { defaultValue: "Erro ao carregar variações." })}
        </p>
      </section>
    );
  }

  if (!hasSubproducts && directVariations.length === 0) {
    return (
      <section className="w-full mt-12 mb-12">
        <p className="text-gray-500 text-center">
          {t("product.variants.none", {
            defaultValue: "Este produto ainda não tem versões disponíveis.",
          })}
        </p>
      </section>
    );
  }

  return (
    <section className="w-full mt-12">
      <h2 className="text-black text-2xl md:text-3xl font-bold mb-6 uppercase">
        {t("product.variants.title", { defaultValue: "Subprodutos e variações" })}
      </h2>

      {hasSubproducts && (
        <ProductSubproductsSelector
          subproducts={subproducts}
          selectedSubproductId={selectedSubproductId}
          onSelect={onSubproductSelect}
        />
      )}

      {hasSubproducts && !selectedSubproductId ? (
        <p className="text-gray-500 text-sm md:text-base mb-6">
          {t("product.variants.selectSubproductFirst", {
            defaultValue: "Selecione primeiro um subproduto para ver as variações.",
          })}
        </p>
      ) : (
        <ProductVariantsTable
          variants={currentVariations}
          onAddToCart={(variationId, qty) => {
            setCartFeedback("");
            handleAddToCart(variationId, qty);
          }}
        />
      )}

      {cartFeedback && <p className="text-green-600 mt-3">{cartFeedback}</p>}
    </section>
  );
};
