import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import QuotePage from "~/routes/quote";

const mockUseCart = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { defaultValue?: string; count?: number }) =>
      options?.defaultValue ??
      (typeof options?.count === "number" ? `${options.count} items in cart` : key),
    i18n: { language: "en" },
  }),
}));

vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock("~/hooks/useAnalytics", () => ({
  trackGoogleAdsConversion: vi.fn(),
}));

vi.mock("~/hooks/useCountries", () => ({
  default: () => ({
    Countries: ["Portugal"],
    Loading: false,
  }),
}));

vi.mock("~/hooks/useEmail", () => ({
  useSendMail: () => ({
    sendMail: vi.fn().mockResolvedValue(true),
    Sent: false,
    setSent: vi.fn(),
    Loading: false,
  }),
}));

vi.mock("~/hooks/useDB", () => ({
  default: () => ({
    addData: vi.fn(),
  }),
}));

vi.mock("~/hooks/useCart", () => ({
  useCart: () => mockUseCart(),
}));

vi.mock("~/components/Elements/Link", () => ({
  DelayedLink: ({ to, className, children }: any) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

describe("QuotePage cart checkout UI", () => {
  it("shows empty-state with select products CTA", () => {
    mockUseCart.mockReturnValue({
      items: [],
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
    });

    render(<QuotePage />);

    expect(
      screen.getByText("O carrinho está vazio. Selecione produtos para continuar.")
    ).toBeInTheDocument();
    expect(screen.getByText("Selecionar produtos")).toBeInTheDocument();
    expect(screen.getByText("Selecionar produtos").closest("a")).toHaveAttribute(
      "href",
      "/search?look=all"
    );
  });

  it("shows composite configuration text when variationId is null but line is configured", () => {
    mockUseCart.mockReturnValue({
      items: [
        {
          id: "p1:s1:none:m1:r1",
          productId: "p1",
          productSlug: "bench",
          subproductId: "s1",
          variationId: null,
          variationReference: "B-100 · Oak · RAL 9010",
          selectedMaterialIds: ["m1"],
          selectedRalIds: ["r1"],
          unitPrice: null,
          priceVisible: false,
          quantity: 1,
          productName: "Bench",
          subproductName: "Type A",
          variationImage: null,
          addedAt: Date.now(),
        },
      ],
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
    });

    render(<QuotePage />);

    expect(screen.getByText("B-100 · Oak · RAL 9010")).toBeInTheDocument();
    expect(screen.queryByText("Sem versão")).not.toBeInTheDocument();
  });

  it("renders cart item row and responsive classes", () => {
    mockUseCart.mockReturnValue({
      items: [
        {
          id: "p1:none:v1:none:none",
          productId: "p1",
          productSlug: "chair",
          subproductId: null,
          variationId: "v1",
          variationReference: "REF-1",
          selectedMaterialIds: [],
          selectedRalIds: [],
          unitPrice: null,
          priceVisible: false,
          quantity: 2,
          productName: "Chair",
          subproductName: null,
          variationImage: null,
          addedAt: Date.now(),
        },
      ],
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
    });

    render(<QuotePage />);

    expect(screen.getByText("Chair")).toBeInTheDocument();
    expect(screen.getByText("REF-1")).toBeInTheDocument();
    const responsiveSection = screen.getByText("quote.title").closest("section");
    expect(responsiveSection?.className).toContain("md:flex-row");
  });
});
