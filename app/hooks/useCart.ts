import { useCallback, useEffect, useMemo, useState } from "react";
import { AddToCartPayload, CartItem } from "./interfaces";

const CART_STORAGE_KEY = "singula:cart";
const CART_UPDATED_EVENT = "singula:cart-updated";

type CartDisplayData = {
  productName: string;
  subproductName?: string | null;
  variationImage?: string | null;
  /** e.g. `Oak — RAL 9010`; shown in quote emails. */
  materialRalLabel?: string | null;
};

const canUseWindow = () => typeof window !== "undefined";
const sanitizeProductName = (value: string) =>
  value.replaceAll("<red>", "").replaceAll("</red>", "").trim();

const buildCartItemId = (payload: AddToCartPayload) => {
  const matSeg =
    [...payload.selectedMaterialIds].sort().join("|") || "none";
  const ralSeg = [...payload.selectedRalIds].sort().join("|") || "none";
  return [
    payload.productId,
    payload.subproductId ?? "none",
    payload.variationId ?? "none",
    matSeg,
    ralSeg,
  ].join(":");
};

const readCartFromStorage = (): CartItem[] => {
  if (!canUseWindow()) return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeCartToStorage = (items: CartItem[]) => {
  if (!canUseWindow()) return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
};

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const syncFromStorage = useCallback(() => {
    setItems(readCartFromStorage());
  }, []);

  useEffect(() => {
    syncFromStorage();
  }, [syncFromStorage]);

  useEffect(() => {
    if (!canUseWindow()) return;

    const onStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) syncFromStorage();
    };
    const onCartUpdated = () => syncFromStorage();

    window.addEventListener("storage", onStorage);
    window.addEventListener(CART_UPDATED_EVENT, onCartUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CART_UPDATED_EVENT, onCartUpdated);
    };
  }, [syncFromStorage]);

  const addItem = useCallback(
    (payload: AddToCartPayload, displayData: CartDisplayData) => {
      const nextId = buildCartItemId(payload);
      const current = readCartFromStorage();
      const existing = current.find((item) => item.id === nextId);

      const nextItems = existing
        ? current.map((item) =>
            item.id === nextId
              ? {
                  ...item,
                  quantity: item.quantity + payload.quantity,
                  selectedMaterialIds: payload.selectedMaterialIds,
                  selectedRalIds: payload.selectedRalIds,
                  unitPrice: payload.unitPrice,
                  priceVisible: payload.priceVisible,
                  materialRalLabel:
                    displayData.materialRalLabel ?? item.materialRalLabel ?? null,
                }
              : item
          )
        : [
            ...current,
            {
              ...payload,
              id: nextId,
              productName: sanitizeProductName(displayData.productName),
              subproductName: displayData.subproductName ?? null,
              variationImage: displayData.variationImage ?? null,
              materialRalLabel: displayData.materialRalLabel ?? null,
              addedAt: Date.now(),
            },
          ];

      writeCartToStorage(nextItems);
    },
    []
  );

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    const safeQty = Math.max(1, quantity || 1);
    const nextItems = readCartFromStorage().map((item) =>
      item.id === itemId ? { ...item, quantity: safeQty } : item
    );
    writeCartToStorage(nextItems);
  }, []);

  const removeItem = useCallback((itemId: string) => {
    const nextItems = readCartFromStorage().filter((item) => item.id !== itemId);
    writeCartToStorage(nextItems);
  }, []);

  const clearCart = useCallback(() => {
    writeCartToStorage([]);
  }, []);

  const totalUnits = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  return {
    items,
    totalUnits,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };
};

export default useCart;
