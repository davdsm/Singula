import { useState } from "react";
import { useTranslation } from "react-i18next";
import { VariationOption } from "~/hooks/interfaces";
import { Image } from "../Elements/Image";

const formatPrice = (value: number, locale: string) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);

export const ProductVariantsTable = ({
  variants,
  onAddToCart,
}: {
  variants: VariationOption[];
  onAddToCart: (variationId: string, quantity: number) => void;
}) => {
  const { t, i18n } = useTranslation();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [justAddedVariationId, setJustAddedVariationId] = useState<string | null>(null);

  if (!variants.length) {
    return (
      <p className="text-gray-500 text-sm md:text-base">
        {t("product.variants.empty", {
          defaultValue: "Sem variações disponíveis para esta seleção.",
        })}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border border-[#E5E5E5] rounded-2xl">
      <table className="w-full text-left text-black min-w-[720px]">
        <thead className="bg-[#FAFAFA] text-black">
          <tr>
            <th className="px-4 py-3 text-sm uppercase">
              {t("product.variants.image", { defaultValue: "Imagem" })}
            </th>
            <th className="px-4 py-3 text-sm uppercase">
              {t("product.variants.reference", { defaultValue: "Referência" })}
            </th>
            <th className="px-4 py-3 text-sm uppercase">
              {t("product.variants.materials", { defaultValue: "Materiais" })}
            </th>
            <th className="px-4 py-3 text-sm uppercase">
              {t("product.variants.ral", { defaultValue: "RAL" })}
            </th>
            <th className="px-4 py-3 text-sm uppercase">
              {t("product.variants.price", { defaultValue: "Preço" })}
            </th>
            <th className="px-4 py-3 text-sm uppercase">
              {t("product.variants.quantity", { defaultValue: "Quantidade" })}
            </th>
            <th className="px-4 py-3 text-sm uppercase">
              {t("product.variants.addToCart", { defaultValue: "Adicionar ao carrinho" })}
            </th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variation) => {
            const currentQty = quantities[variation.id] ?? 1;
            return (
              <tr key={variation.id} className="border-t border-[#EFEFEF]">
                <td className="px-4 py-4">
                  {variation.image ? (
                    <Image
                      src={variation.image}
                      alt={variation.reference}
                      className="w-14 h-14 rounded-md object-cover border border-[#E5E5E5]"
                    />
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-4 font-semibold">{variation.reference}</td>
                <td className="px-4 py-4">
                  {variation.materials.map((m) => m.name).join(", ") || "-"}
                </td>
                <td className="px-4 py-4">
                  {variation.ralColors.map((c) => c.name).join(", ") || "-"}
                </td>
                <td className="px-4 py-4">
                  {variation.priceVisible && variation.price !== null
                    ? formatPrice(variation.price, i18n.language || "pt-PT")
                    : t("product.variants.onRequest", {
                        defaultValue: "Sob consulta",
                      })}
                </td>
                <td className="px-4 py-4">
                  <input
                    min={1}
                    type="number"
                    value={currentQty}
                    onChange={(e) =>
                      setQuantities((prev) => ({
                        ...prev,
                        [variation.id]: Math.max(1, Number(e.target.value) || 1),
                      }))
                    }
                    className="w-20 border border-[#D2D2D2] rounded-md px-2 py-1 text-black"
                  />
                </td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(variation.id, currentQty);
                      setJustAddedVariationId(variation.id);
                      window.setTimeout(() => {
                        setJustAddedVariationId((current) =>
                          current === variation.id ? null : current
                        );
                      }, 1100);
                    }}
                    className={`px-4 py-2 rounded-full border text-sm uppercase transition-all duration-300 ${
                      justAddedVariationId === variation.id
                        ? "bg-green-600 border-green-600 text-white scale-105"
                        : "bg-singula-main text-white border-singula-main hover:bg-singula-mainDarker"
                    }`}
                  >
                    {justAddedVariationId === variation.id
                      ? t("product.variants.added", {
                          defaultValue: "Adicionado",
                        })
                      : t("product.variants.addToCart", {
                          defaultValue: "Adicionar ao carrinho",
                        })}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
