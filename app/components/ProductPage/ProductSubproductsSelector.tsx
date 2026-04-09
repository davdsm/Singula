import { useTranslation } from "react-i18next";
import { Subproduct } from "~/hooks/interfaces";
import { Image } from "../Elements/Image";

export const ProductSubproductsSelector = ({
  subproducts,
  selectedSubproductId,
  onSelect,
}: {
  subproducts: Subproduct[];
  selectedSubproductId: string | null;
  onSelect: (subproductId: string) => void;
}) => {
  const { t } = useTranslation();

  if (subproducts.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-black text-xl md:text-2xl font-bold mb-4">
        {t("product.variants.chooseSubproduct", {
          defaultValue: "Escolha o subproduto",
        })}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {subproducts.map((subproduct) => {
          const selected = selectedSubproductId === subproduct.id;
          return (
            <button
              key={subproduct.id}
              type="button"
              onClick={() => onSelect(subproduct.id)}
              className={`text-left rounded-2xl border overflow-hidden transition-all ${
                selected
                  ? "border-singula-main ring-2 ring-singula-main/30"
                  : "bg-white text-black border-[#D2D2D2] hover:border-black"
              }`}
            >
              <div className="w-full h-full bg-white">
                {subproduct.image ? (
                  <Image
                    src={subproduct.image}
                    alt={subproduct.name}
                    className="w-full h-32 md:h-44 object-cover"
                  />
                ) : (
                  <div className="w-full h-32 md:h-44 bg-[#F5F5F5]" />
                )}
                <div className="p-3 md:p-4">
                  <p className="text-black text-sm md:text-base font-bold uppercase">
                    {subproduct.name}
                  </p>
                  {subproduct.reference && (
                    <p className="text-gray-500 text-xs md:text-sm mt-1 uppercase">
                      {subproduct.reference}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
