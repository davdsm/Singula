import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useCart } from "./useCart";

describe("useCart", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("adds items and merges same variation quantities", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(
        {
          productId: "p1",
          productSlug: "chair",
          subproductId: "s1",
          variationId: "v1",
          variationReference: "REF-1",
          selectedMaterialIds: ["m1"],
          selectedRalIds: ["r1"],
          unitPrice: 10,
          priceVisible: true,
          quantity: 2,
        },
        {
          productName: "Chair",
          subproductName: "Arm",
          variationImage: null,
        }
      );
    });

    act(() => {
      result.current.addItem(
        {
          productId: "p1",
          productSlug: "chair",
          subproductId: "s1",
          variationId: "v1",
          variationReference: "REF-1",
          selectedMaterialIds: ["m2"],
          selectedRalIds: ["r2"],
          unitPrice: 12,
          priceVisible: true,
          quantity: 1,
        },
        {
          productName: "Chair",
          subproductName: "Arm",
          variationImage: null,
        }
      );
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.totalUnits).toBe(3);
  });

  it("updates and removes items", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(
        {
          productId: "p2",
          productSlug: "table",
          subproductId: null,
          variationId: "v2",
          variationReference: "REF-2",
          selectedMaterialIds: [],
          selectedRalIds: [],
          unitPrice: null,
          priceVisible: false,
          quantity: 1,
        },
        {
          productName: "Table",
          variationImage: null,
        }
      );
    });

    const itemId = result.current.items[0].id;

    act(() => {
      result.current.updateQuantity(itemId, 5);
    });
    expect(result.current.totalUnits).toBe(5);

    act(() => {
      result.current.removeItem(itemId);
    });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalUnits).toBe(0);
  });
});
