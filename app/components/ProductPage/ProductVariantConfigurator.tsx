import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { AddToCartPayload, Product } from "~/hooks/interfaces";
import { useCart } from "~/hooks/useCart";
import { useProductSubproducts } from "~/hooks/useProductVariants";
import { ConfiguratorOptionGrid } from "./ConfiguratorOptionGrid";
import { ProductSubproductsSelector } from "./ProductSubproductsSelector";

const toCardOptions = (
  items: Array<{ id: string; name: string; image: string }>
) =>
  items.map((x) => ({
    id: x.id,
    name: x.name,
    image: x.image || null,
    detail: null as string | null,
  }));

export const ProductVariantConfigurator = ({
  product,
}: {
  product: Product;
}) => {
  const { t } = useTranslation();
  const { subproducts, hasSubproducts, loading, error } = useProductSubproducts(
    product.id
  );
  const { addItem } = useCart();

  const [selectedSubproductId, setSelectedSubproductId] = useState<string | null>(
    null
  );
  const [selectedMaterialId, setSelectedMaterialId] = useState("");
  const [selectedRalId, setSelectedRalId] = useState("");
  const [simpleAdded, setSimpleAdded] = useState(false);
  const [configuredAdded, setConfiguredAdded] = useState(false);
  const [showViewCartCta, setShowViewCartCta] = useState(false);
  const viewCartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const revealViewCartCta = useCallback(() => {
    if (viewCartTimeoutRef.current) clearTimeout(viewCartTimeoutRef.current);
    setShowViewCartCta(true);
    viewCartTimeoutRef.current = setTimeout(() => {
      setShowViewCartCta(false);
      viewCartTimeoutRef.current = null;
    }, 8000);
  }, []);

  useEffect(
    () => () => {
      if (viewCartTimeoutRef.current) clearTimeout(viewCartTimeoutRef.current);
    },
    []
  );

  const sanitizedProductName = product.name
    .replaceAll("<red>", "")
    .replaceAll("</red>", "")
    .trim();
  const productPath = product.subcategory?.slug
    ? `/products/${product.subcategory.slug}/${product.slug}`
    : `/products/${product.slug}`;

  const materiaisOpts = useMemo(
    () => toCardOptions(product.materiaisDisponiveis),
    [product.materiaisDisponiveis]
  );
  const ralOpts = useMemo(
    () => toCardOptions(product.ralDisponiveis),
    [product.ralDisponiveis]
  );

  const hasMaterialList = materiaisOpts.length > 0;
  const hasRalList = ralOpts.length > 0;
  const hasConfiguratorLists = hasMaterialList || hasRalList;

  const resolvedSubproductId = useMemo(() => {
    if (!hasSubproducts) return null;
    if (subproducts.length === 1) return subproducts[0].id;
    return selectedSubproductId;
  }, [hasSubproducts, subproducts, selectedSubproductId]);

  useLayoutEffect(() => {
    if (materiaisOpts.length === 1) {
      setSelectedMaterialId(materiaisOpts[0].id);
    } else if (materiaisOpts.length === 0) {
      setSelectedMaterialId("");
    } else {
      setSelectedMaterialId((p) =>
        p && materiaisOpts.some((o) => o.id === p) ? p : ""
      );
    }
  }, [materiaisOpts]);

  useLayoutEffect(() => {
    if (ralOpts.length === 1) {
      setSelectedRalId(ralOpts[0].id);
    } else if (ralOpts.length === 0) {
      setSelectedRalId("");
    } else {
      setSelectedRalId((p) => (p && ralOpts.some((o) => o.id === p) ? p : ""));
    }
  }, [ralOpts]);

  const selectedSubproduct = subproducts.find(
    (s) => s.id === resolvedSubproductId
  );

  const buildMaterialRalLabel = (): string | null => {
    const mat = product.materiaisDisponiveis.find(
      (m) => m.id === selectedMaterialId
    );
    const ral = product.ralDisponiveis.find((c) => c.id === selectedRalId);
    if (mat && ral) return `${mat.name} - ${ral.name}`;
    if (mat) return `${mat.name} -`;
    if (ral) return `- ${ral.name}`;
    return null;
  };

  const buildVariationReference = (): string => {
    const parts: string[] = [];
    if (selectedSubproduct) {
      parts.push(
        (selectedSubproduct.reference || selectedSubproduct.name || "").trim()
      );
    }
    const mat = product.materiaisDisponiveis.find(
      (m) => m.id === selectedMaterialId
    );
    if (mat) parts.push(mat.name);
    const ral = product.ralDisponiveis.find((c) => c.id === selectedRalId);
    if (ral) parts.push(ral.name);
    const s = parts.filter(Boolean).join(" · ");
    return s || product.slug;
  };

  const selectionComplete = (() => {
    if (hasSubproducts && subproducts.length > 1 && !resolvedSubproductId) {
      return false;
    }
    if (hasMaterialList && !selectedMaterialId) return false;
    if (hasRalList && !selectedRalId) return false;
    return true;
  })();

  const onSubproductSelect = (subproductId: string) => {
    setSelectedSubproductId(subproductId);
    setSelectedMaterialId("");
    setSelectedRalId("");
    setConfiguredAdded(false);
  };

  const handleAddConfiguredToQuote = () => {
    if (!selectionComplete) return;

    const payload: AddToCartPayload = {
      productId: product.id,
      productSlug: product.slug,
      subproductId: resolvedSubproductId,
      variationId: null,
      variationReference: buildVariationReference(),
      selectedMaterialIds: selectedMaterialId ? [selectedMaterialId] : [],
      selectedRalIds: selectedRalId ? [selectedRalId] : [],
      unitPrice: null,
      priceVisible: false,
      quantity: 1,
    };

    addItem(payload, {
      productName: sanitizedProductName,
      productPath,
      subproductName: selectedSubproduct?.name ?? null,
      variationImage:
        selectedSubproduct?.image ?? product.ImagemPrincipal ?? null,
      materialRalLabel: buildMaterialRalLabel(),
    });

    setConfiguredAdded(true);
    revealViewCartCta();
    window.setTimeout(() => setConfiguredAdded(false), 1500);
  };

  const handleAddSimpleProductToQuote = () => {
    const payload: AddToCartPayload = {
      productId: product.id,
      productSlug: product.slug,
      subproductId: null,
      variationId: null,
      variationReference: product.slug,
      selectedMaterialIds: [],
      selectedRalIds: [],
      unitPrice: null,
      priceVisible: false,
      quantity: 1,
    };
    addItem(payload, {
      productName: sanitizedProductName,
      productPath,
      subproductName: null,
      variationImage: product.ImagemPrincipal,
    });
    setSimpleAdded(true);
    revealViewCartCta();
    window.setTimeout(() => setSimpleAdded(false), 1500);
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

  if (!hasSubproducts && !hasConfiguratorLists) {
    return (
      <section className="w-full mt-12 mb-12 flex flex-col items-center text-center gap-6">
        <p className="text-gray-500 max-w-xl">
          {t("product.variants.none", {
            defaultValue: "Este produto pode ser pedido por cotação sem escolha de versão.",
          })}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleAddSimpleProductToQuote}
            className={`relative min-w-[300px] px-6 py-3 rounded-full border text-sm uppercase font-semibold transition-[background-color,border-color,box-shadow,transform] duration-500 ease-out ${
              simpleAdded
                ? "bg-black border-black text-white scale-[1.01] shadow-md"
                : "bg-singula-main text-white border-singula-main hover:bg-singula-mainDarker"
            }`}
          >
            <span
              className={`block transition-opacity duration-300 ${
                simpleAdded ? "opacity-0" : "opacity-100"
              }`}
            >
              {t("product.variants.addToQuote", {
                defaultValue: "Adicionar ao pedido de cotação",
              })}
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                simpleAdded ? "opacity-100" : "opacity-0"
              }`}
            >
              {t("product.variants.added", { defaultValue: "Adicionado" })}
            </span>
          </button>
          {showViewCartCta ? (
            <Link
              to="/quote"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border text-sm uppercase font-semibold border-black text-black hover:bg-black hover:text-white transition-colors"
            >
              {t("product.variants.viewCart", { defaultValue: "Ver cotação" })}
            </Link>
          ) : null}
        </div>
      </section>
    );
  }

  const showSubproductPicker = hasSubproducts && subproducts.length > 1;
  const waitingSubproduct =
    hasSubproducts && subproducts.length > 1 && !resolvedSubproductId;

  const subproductStepDone = !waitingSubproduct;

  const materialStepDone = !hasMaterialList || !!selectedMaterialId;
  const showMaterialStep = subproductStepDone && hasMaterialList;
  const showRalStep = subproductStepDone && materialStepDone && hasRalList;

  const stepCount =
    (showSubproductPicker ? 1 : 0) +
    (hasMaterialList ? 1 : 0) +
    (hasRalList ? 1 : 0);

  const formatStepTitle = (stepIndex: number, label: string) => {
    if (stepCount <= 1) return label;
    return `${stepIndex}. ${label}`;
  };

  const materialTitleIndex = showSubproductPicker ? 2 : 1;
  const ralTitleIndex = materialTitleIndex + (hasMaterialList ? 1 : 0);

  return (
    <section className="w-full mt-12">
      <h2 className="text-black text-2xl md:text-3xl font-bold mb-2 uppercase">
        {t("product.variants.title", { defaultValue: "Configurar produto" })}
      </h2>
      {stepCount > 1 && (
        <p className="text-gray-500 text-sm md:text-base mb-8">
          {t("product.variants.stepsHint", {
            defaultValue: "Siga os passos por ordem: versão, material e cor.",
          })}
        </p>
      )}

      {showSubproductPicker && (
        <ProductSubproductsSelector
          title={formatStepTitle(
            1,
            t("product.variants.chooseSubproduct", {
              defaultValue: "Escolha o Produto",
            })
          )}
          subproducts={subproducts}
          selectedSubproductId={selectedSubproductId}
          onSelect={onSubproductSelect}
        />
      )}

      {waitingSubproduct ? (
        <p className="text-gray-500 text-sm md:text-base mb-6">
          {t("product.variants.selectSubproductFirst", {
            defaultValue: "Selecione primeiro um subproduto para continuar.",
          })}
        </p>
      ) : (
        <>
          {showMaterialStep && (
            <ConfiguratorOptionGrid
              title={formatStepTitle(
                materialTitleIndex,
                t("product.variants.stepMaterial", { defaultValue: "Material" })
              )}
              options={materiaisOpts}
              selectedId={selectedMaterialId || null}
              onSelect={(id) => {
                setSelectedMaterialId(id);
                setSelectedRalId("");
                setConfiguredAdded(false);
              }}
            />
          )}

          {showMaterialStep && hasRalList && !selectedMaterialId && (
            <p className="text-gray-500 text-sm md:text-base mb-6 -mt-2">
              {t("product.variants.selectMaterialFirst", {
                defaultValue: "Escolha um material para ver as cores disponíveis.",
              })}
            </p>
          )}

          {showRalStep && (
            <ConfiguratorOptionGrid
              density="compact"
              imageFit="cover"
              title={formatStepTitle(
                ralTitleIndex,
                t("product.variants.stepRal", { defaultValue: "Cor" })
              )}
              options={ralOpts}
              selectedId={selectedRalId || null}
              onSelect={(id) => {
                setSelectedRalId(id);
                setConfiguredAdded(false);
              }}
            />
          )}

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <button
              type="button"
              disabled={!selectionComplete}
              onClick={() => handleAddConfiguredToQuote()}
              className={`relative min-w-[300px] px-6 py-3 rounded-full border text-sm uppercase font-semibold transition-[background-color,border-color,box-shadow,transform] duration-500 ease-out disabled:opacity-40 disabled:cursor-not-allowed ${
                configuredAdded
                  ? "bg-black border-black text-white scale-[1.01] shadow-md"
                  : "bg-singula-main text-white border-singula-main hover:bg-singula-mainDarker"
              }`}
            >
              <span
                className={`block transition-opacity duration-300 ${
                  configuredAdded ? "opacity-0" : "opacity-100"
                }`}
              >
                {t("product.variants.addToQuote", {
                  defaultValue: "Adicionar ao pedido de cotação",
                })}
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  configuredAdded ? "opacity-100" : "opacity-0"
                }`}
              >
                {t("product.variants.added", { defaultValue: "Adicionado" })}
              </span>
            </button>
            {showViewCartCta ? (
              <Link
                to="/quote"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border text-sm uppercase font-semibold border-black text-black hover:bg-black hover:text-white transition-colors"
              >
                {t("product.variants.viewCart", { defaultValue: "Ver cotação" })}
              </Link>
            ) : null}
          </div>
        </>
      )}
    </section>
  );
};
