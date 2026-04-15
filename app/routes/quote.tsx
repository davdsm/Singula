import { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { trackGoogleAdsConversion } from "~/hooks/useAnalytics";
import { Image } from "~/components/Elements/Image";
import { MetaFunction } from "@remix-run/react";
import useCountries from "~/hooks/useCountries";
import { useSendMail } from "~/hooks/useEmail";
import useDB from "~/hooks/useDB";
import { DelayedLink } from "~/components/Elements/Link";
import { useCart } from "~/hooks/useCart";
import type { CartItem } from "~/hooks/interfaces";

const isPlainBaseQuoteLine = (item: CartItem) =>
  item.variationId == null &&
  item.subproductId == null &&
  item.selectedMaterialIds.length === 0 &&
  item.selectedRalIds.length === 0;

const matRalSummaryPlain = (item: CartItem) => {
  if (item.variationId == null) {
    // Composite lines encode material/RAL labels in variationReference; plain base has no extras.
    return "";
  }
  const bits: string[] = [];
  if (item.selectedMaterialIds.length) {
    bits.push(`Material: ${item.selectedMaterialIds.join(", ")}`);
  }
  if (item.selectedRalIds.length) {
    bits.push(`RAL: ${item.selectedRalIds.join(", ")}`);
  }
  return bits.join(" · ");
};

/** One line for emails: subproduct + material/colour (and legacy variation extras). */
const formatEmailCartConfigurationPlain = (item: CartItem): string => {
  const sub = (item.subproductName || "").trim();
  const matRal = (item.materialRalLabel || "").trim();
  let tail = matRal;
  if (!tail) {
    if (item.variationId != null) {
      tail = (item.variationReference || "").trim();
      const extra = matRalSummaryPlain(item);
      if (extra) tail = tail ? `${tail} · ${extra}` : extra;
    } else if (!isPlainBaseQuoteLine(item)) {
      tail = (item.variationReference || "").trim();
    }
  }
  if (sub && tail) return `${sub} — ${tail}`;
  if (sub) return sub;
  if (tail) return tail;
  return "—";
};

/** Prefix order reference before the configuration line in quote emails (admin + user). */
const formatEmailCartConfigurationWithOrderRef = (
  orderRef: string | undefined,
  item: CartItem
): string => {
  const r = (orderRef ?? "").trim();
  const base = formatEmailCartConfigurationPlain(item);
  if (!r || base === "—") return base;
  return `${r} - ${base}`;
};

const formatEmailSubproductWithOrderRef = (
  orderRef: string | undefined,
  item: CartItem
): string => {
  const sub = (item.subproductName || "-").trim() || "-";
  const r = (orderRef ?? "").trim();
  return r ? `${r} - ${sub}` : sub;
};

interface FormData {
  name: string;
  email: string;
  contact: string;
  country: string;
  company: string;
  entity: string;
  message: string;
  file?: File;
  terms: boolean;
}

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    lintrk?: (...args: any[]) => void;
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: "Pedido de Cotação - Singula" },
    {
      name: "description",
      content:
        "Aqui não desenhamos só produtos, desenhamos personagens. E como toda boa personagem, têm histórias para contar, piadas na manga e zero vontade de serem aborrecidas. Pensa Metal. Pensa Singula.",
    },
  ];
};

const QuotePage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contact: "",
    country: "",
    file: undefined,
    company: "",
    entity: "",
    message: "",
    terms: false,
  });

  const [Error, setError] = useState<boolean>(false);
  const [cartError, setCartError] = useState<boolean>(false);
  const { Countries, Loading } = useCountries();
  const { t } = useTranslation();
  const { sendMail, Sent, setSent, Loading: EmailLoading } = useSendMail();
  const db = useDB();
  const { i18n } = useTranslation();
  const { items: cartItems, removeItem, updateQuantity, clearCart } = useCart();
  const quoteLang = i18n.language as "pt" | "en" | "es" | "fr" | "de";

  useEffect(() => {
    // Keep top of form visible when navigating to checkout.
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const escapeHtml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  const sanitizeProductName = (value: string) =>
    value.replaceAll("<red>", "").replaceAll("</red>", "").trim();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat(i18n.language || "pt-PT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(value);

  const quoteEmailImageSrc = (url: string | null) => {
    const u = (url || "").trim();
    if (!u) return "";
    if (u.startsWith("http://") || u.startsWith("https://")) return u;
    if (u.startsWith("//")) return `https:${u}`;
    return u.startsWith("/") ? `https://singula.pt${u}` : `https://singula.pt/${u}`;
  };

  const buildQuoteTableHtml = (orderRef: string) => {
    const headers = {
      pt: {
        image: "Imagem",
        product: "Produto",
        subproduct: "Subproduto",
        variation: "Variação",
        unitPrice: "Preço unit.",
        qty: "Qtd.",
        total: "Total",
        onRequest: "Sob consulta",
      },
      en: {
        image: "Image",
        product: "Product",
        subproduct: "Subproduct",
        variation: "Variation",
        unitPrice: "Unit price",
        qty: "Qty.",
        total: "Total",
        onRequest: "On request",
      },
      es: {
        image: "Imagen",
        product: "Producto",
        subproduct: "Subproducto",
        variation: "Variación",
        unitPrice: "Precio unit.",
        qty: "Cant.",
        total: "Total",
        onRequest: "A consultar",
      },
      fr: {
        image: "Image",
        product: "Produit",
        subproduct: "Sous-produit",
        variation: "Variation",
        unitPrice: "Prix unit.",
        qty: "Qté.",
        total: "Total",
        onRequest: "Sur demande",
      },
      de: {
        image: "Bild",
        product: "Produkt",
        subproduct: "Unterprodukt",
        variation: "Variation",
        unitPrice: "Stückpreis",
        qty: "Menge",
        total: "Gesamt",
        onRequest: "Auf Anfrage",
      },
    }[quoteLang];

    const rows = cartItems
      .map((item) => {
        const imgSrc = quoteEmailImageSrc(item.variationImage);
        const imgCell = imgSrc
          ? `<img src="${escapeHtml(imgSrc)}" alt="" width="96" height="96" style="display:block;width:96px;height:96px;object-fit:contain;border-radius:10px;" />`
          : `<span style="display:inline-block;width:96px;height:96px;border-radius:10px;background:#e5e7eb;"></span>`;
        const subCell = escapeHtml(item.subproductName || "-");
        const baseVariationLabelByLang = {
          pt: "Sem versão",
          en: "No version",
          es: "Sin versión",
          fr: "Sans version",
          de: "Ohne Version",
        } as const;
        const variationMain =
          item.variationId != null
            ? item.variationReference
            : isPlainBaseQuoteLine(item)
              ? baseVariationLabelByLang[quoteLang]
              : item.variationReference;
        const variationExtra = matRalSummaryPlain(item);
        const variationCell = variationExtra
          ? `${escapeHtml(variationMain)}<br /><span style="display:block;margin-top:4px;font-size:12px;color:#6b7280;">${escapeHtml(variationExtra)}</span>`
          : escapeHtml(variationMain);
        const unitPriceCell =
          item.priceVisible && item.unitPrice !== null
            ? formatCurrency(item.unitPrice)
            : headers.onRequest;
        const totalCell =
          item.priceVisible && item.unitPrice !== null
            ? formatCurrency(item.unitPrice * item.quantity)
            : headers.onRequest;
        return `<tr>
          <td style="padding:12px;border-top:1px solid #efefef;vertical-align:middle;">${imgCell}</td>
          <td style="padding:12px;border-top:1px solid #efefef;vertical-align:middle;font-size:15px;font-weight:600;color:#111827;">${escapeHtml(
            sanitizeProductName(item.productName)
          )}</td>
          <td style="padding:12px;border-top:1px solid #efefef;vertical-align:middle;font-size:14px;color:#111827;">${subCell}</td>
          <td style="padding:12px;border-top:1px solid #efefef;vertical-align:middle;font-size:14px;color:#111827;">${variationCell}</td>
          <td style="padding:12px;border-top:1px solid #efefef;vertical-align:middle;font-size:14px;color:#111827;">${escapeHtml(unitPriceCell)}</td>
          <td style="padding:12px;border-top:1px solid #efefef;vertical-align:middle;font-size:14px;color:#111827;">${item.quantity}</td>
          <td style="padding:12px;border-top:1px solid #efefef;vertical-align:middle;font-size:14px;color:#111827;">${escapeHtml(totalCell)}</td>
        </tr>`;
      })
      .join("");

    return `<table style="width:100%;min-width:760px;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;border-collapse:separate;border-spacing:0;font-size:14px;margin:12px 0 0 0;color:#111827;">
      <thead>
        <tr style="background:#f5f5f5;">
          <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;">${headers.image}</th>
          <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;">${headers.product}</th>
          <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;">${headers.subproduct}</th>
          <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;">${headers.variation}</th>
          <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;">${headers.unitPrice}</th>
          <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;">${headers.qty}</th>
          <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;">${headers.total}</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
  };

  const buildBackofficeOrderDetails = () => {
    const details = cartItems
      .map((item, index) => {
        const hasPrice = item.priceVisible && item.unitPrice !== null;
        const unitPrice = hasPrice
          ? formatCurrency(item.unitPrice as number)
          : "Sob consulta";
        const lineTotal = hasPrice
          ? formatCurrency((item.unitPrice as number) * item.quantity)
          : "Sob consulta";
        const lineCfg = formatEmailCartConfigurationPlain(item);
        return [
          `${index + 1}. Produto: ${sanitizeProductName(item.productName)}`,
          `   Subproduto — material e cor: ${lineCfg}`,
          `   Preço unitário: ${unitPrice}`,
          `   Quantidade: ${item.quantity}`,
          `   Total: ${lineTotal}`,
        ].join("\n");
      })
      .join("\n\n");

    return `DETALHES DA ENCOMENDA\n\n${details}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setCartError(false);

    const requiredFields: (keyof FormData)[] = [
      "name",
      "email",
      "country",
      "terms",
    ];
    const emptyField = requiredFields.find((key) => {
      const value = formData[key];
      return typeof value === "string" ? !value.trim() : !value;
    });

    if (emptyField) {
      setError(true);
      return;
    }

    if (cartItems.length === 0) {
      setCartError(true);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    const data = {
      Name: formData.name,
      Email: formData.email,
      Contact: formData.contact,
      Country: formData.country,
      Entity: formData.company,
      Entity_Type: formData.entity,
      Products: [...new Set(cartItems.map((item) => item.productId))],
      File: formData.file,
      Message: formData.message
        ? `${formData.message}\n\n--------------------\n${buildBackofficeOrderDetails()}`
        : buildBackofficeOrderDetails(),
    };

    const result = await db.addData("Orcamentos", data);
    const orderAt = new Date();

    const mailToSales = await sendMail(
      quoteLang,
      formData.name,
      formData.contact,
      formData.email,
      formData.message,
      true,
      {
        country: formData.country,
        entity: formData.company,
        entity_type: formData.entity,
        products: cartItems
          .map((item) => {
            const base = sanitizeProductName(item.productName);
            const cfg = formatEmailCartConfigurationWithOrderRef(
              result.REF,
              item
            );
            return cfg !== "—"
              ? `${base} — ${cfg} × ${item.quantity}`
              : `${base} × ${item.quantity}`;
          })
          .join(", "),
        productsTable: buildQuoteTableHtml(result.REF ?? ""),
        attachment: formData.file
          ? `<a href="https://singula.pt/admin/_/#/collections?collection=pbc_2578185338&filter=&sort=-%40rowid&recordId=${result.id}">Disponível no BackOffice.</a>`
          : false,
      },
      undefined,
      result.REF,
      orderAt
    );

    const mailToUser = await sendMail(
      quoteLang,
      formData.name,
      formData.contact,
      formData.email,
      formData.message,
      true,
      {
        country: formData.country,
        entity: formData.company,
        entity_type: formData.entity,
        products: cartItems
          .map((item) => {
            const base = sanitizeProductName(item.productName);
            const cfg = formatEmailCartConfigurationWithOrderRef(
              result.REF,
              item
            );
            return cfg !== "—"
              ? `${base} — ${cfg} × ${item.quantity}`
              : `${base} × ${item.quantity}`;
          })
          .join(", "),
        productsTable: buildQuoteTableHtml(result.REF ?? ""),
        attachment: formData.file
          ? `<a href="https://singula.pt/admin/_/#/collections?collection=pbc_2578185338&filter=&sort=-%40rowid&recordId=${result.id}">Disponível no BackOffice.</a>`
          : false,
      },
      formData.email,
      result.REF,
      orderAt
    );
    const mailsOk = mailToSales && mailToUser;
    setSent(mailsOk);

    if (!mailsOk) {
      console.error(
        "[quote] Email API failed (sales or user). Check browser console and api.davdsm.pt / davdsmKey."
      );
      return;
    }

    if (window.fbq) {
      window.fbq("track", "Lead");
    }
    if (window.lintrk) {
      window.lintrk("track", { conversion_id: 22911929 });
    }

    trackGoogleAdsConversion();
    clearCart();
  };

  const cartGrandTotal = cartItems.reduce((acc, item) => {
    if (!item.priceVisible || item.unitPrice === null) return acc;
    return acc + item.unitPrice * item.quantity;
  }, 0);

  return (
    <main className="bg-white overflow-x-hidden">
      {!EmailLoading && !Sent && (
        <motion.section
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="max-w-4xl mx-auto py-20 mt-10 text-gray-800 flex items-center justify-center flex-col md:flex-row px-4 md:px-0"
        >
          <div className="relative flex items-start justify-center flex-col text-left w-full p-4 md:p-12">
            <h1 className="text-black text-2xl font-bold">
              {t("quote.title")}
            </h1>
            <p className="text-gray-400">{t("quote.description")}</p>
            <form className="mt-4 w-full" action="/" onSubmit={handleSubmit}>
              <div className="flex flex-row gap-4 mb-4 w-full">
                <div className="w-2/5">
                  <label
                    htmlFor="name-input"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    {t("quote.name")}*
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="font-sans font-regular block w-full p-2 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
                    required
                  />
                </div>
                <div className="w-3/5">
                  <label
                    htmlFor="email-input"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    {t("quote.email")}*
                  </label>
                  <input
                    type="email"
                    id="email-input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="font-sans font-regular block w-full p-2 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4 mb-4 w-full flex-wrap md:flex-nowrap">
                <div className="w-1/5">
                  <label
                    htmlFor="phone-input"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    {t("quote.contact")}
                  </label>
                  <input
                    type="text"
                    id="phone-input"
                    className="font-sans font-regular block w-full p-2 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-2/5 md:w-1/5">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    {t("quote.country")}*
                  </label>
                  <select
                    id="countries"
                    className="font-sans font-regular text-[12px] md:text-sm rounded-lg block w-full p-2 outline-none bg-[#f5f5f5] text-black"
                    name="country"
                    onChange={handleChange}
                    value={formData.country}
                  >
                    <option disabled value="">
                      {t("quote.entity-choose")}
                    </option>
                    {!Loading &&
                      Countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="w-1/5">
                  <label
                    htmlFor="company-input"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    {t("quote.entity-name")}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    id="company-input"
                    className="font-sans font-regular block w-full p-2 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
                  />
                </div>
                <div className="w-full md:w-2/5">
                  <label
                    htmlFor="entities"
                    className="font-sans font-regular block mb-2 text-[12px] md:text-sm font-medium text-gray-900"
                  >
                    {t("quote.entity")}
                  </label>
                  <select
                    id="entities"
                    className="font-sans font-regular text-[12px] md:text-sm rounded-lg block w-full p-2 outline-none bg-[#f5f5f5] text-black"
                    name="entity"
                    onChange={handleChange}
                    value={formData.entity}
                  >
                    <option disabled value="">
                      {t("quote.entity-choose")}
                    </option>
                    <option value="Public">
                      {t("quote.entity-public")}
                    </option>
                    <option value="Private">
                      {t("quote.entity-private")}
                    </option>
                    <option value="Particular">
                      {t("quote.entity-person")}
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row gap-4 mb-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="phone-input"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    {t("quote.productsSelected", { defaultValue: "Produtos selecionados" })}
                  </label>
                  {cartItems.length === 0 ? (
                    <div className="bg-[#f5f5f5] rounded-lg p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                      <p className="text-sm text-gray-700">
                        {t("quote.cart.empty", {
                          defaultValue:
                            "O carrinho está vazio. Selecione produtos para continuar.",
                        })}
                      </p>
                      <DelayedLink
                        to="/search?look=all"
                        className="inline-flex items-center justify-center rounded-full bg-singula-main text-white text-sm uppercase font-bold px-5 py-2 hover:bg-singula-mainDarker transition-colors"
                      >
                        {t("quote.cart.selectProducts", {
                          defaultValue: "Selecionar produtos",
                        })}
                      </DelayedLink>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-[#f5f5f5] p-3 rounded-lg">
                      <p className="text-sm text-gray-700">
                        {t("quote.cart.itemsCount", {
                          defaultValue: "{{count}} itens no carrinho",
                          count: cartItems.length,
                        })}
                      </p>
                      <DelayedLink
                        to="/search?look=all"
                        className="text-sm text-singula-main underline underline-offset-2"
                      >
                        {t("quote.cart.addMore", { defaultValue: "Adicionar mais produtos" })}
                      </DelayedLink>
                    </div>
                  )}
                </div>
              </div>
              <div className="products overflow-x-auto">
                <table className="w-full min-w-[760px] text-black border border-[#E5E5E5] rounded-xl overflow-hidden">
                  <thead className="bg-[#F5F5F5]">
                    <tr>
                      <th className="text-left px-3 py-2 text-xs uppercase">
                        {t("quote.photo", { defaultValue: "Foto" })}
                      </th>
                      <th className="text-left px-3 py-2 text-xs uppercase">
                        {t("quote.product", { defaultValue: "Produto" })}
                      </th>
                      <th className="text-left px-3 py-2 text-xs uppercase">
                        {t("quote.subproduct", { defaultValue: "Subproduto" })}
                      </th>
                      <th className="text-left px-3 py-2 text-xs uppercase">
                        {t("quote.variation", { defaultValue: "Variação" })}
                      </th>
                      <th className="text-left px-3 py-2 text-xs uppercase">
                        {t("quote.unitPrice", { defaultValue: "Preço unit." })}
                      </th>
                      <th className="text-left px-3 py-2 text-xs uppercase">
                        {t("quote.qty", { defaultValue: "Quantidade" })}
                      </th>
                      <th className="text-left px-3 py-2 text-xs uppercase">
                        {t("quote.total", { defaultValue: "Total" })}
                      </th>
                      <th className="text-left px-3 py-2 text-xs uppercase">
                        {t("quote.remove", { defaultValue: "Remover" })}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-t border-[#EFEFEF]">
                        <td className="px-3 py-2">
                          {item.variationImage ? (
                            <Image
                              src={item.variationImage}
                              alt={sanitizeProductName(item.productName)}
                              className="w-10 h-10 rounded object-cover"
                            />
                          ) : (
                            <span className="w-10 h-10 rounded bg-gray-200 inline-block" />
                          )}
                        </td>
                        <td className="px-3 py-2 text-sm font-semibold">
                          {sanitizeProductName(item.productName)}
                        </td>
                        <td className="px-3 py-2 text-sm">
                          {item.subproductName || "-"}
                        </td>
                        <td className="px-3 py-2 text-sm">
                          <span className="font-medium block">
                            {item.variationId != null
                              ? item.variationReference
                              : isPlainBaseQuoteLine(item)
                                ? t("quote.cart.baseProduct", {
                                    defaultValue: "Sem versão",
                                  })
                                : item.variationReference}
                          </span>
                          {matRalSummaryPlain(item) ? (
                            <span className="text-xs text-gray-600 block mt-0.5">
                              {matRalSummaryPlain(item)}
                            </span>
                          ) : null}
                        </td>
                        <td className="px-3 py-2 text-sm whitespace-nowrap">
                          {item.priceVisible && item.unitPrice !== null
                            ? formatCurrency(item.unitPrice)
                            : t("quote.onRequest", { defaultValue: "Sob consulta" })}
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Number(e.target.value) || 1)}
                            className="font-sans font-regular w-20 p-2 rounded-lg text-xs outline-none bg-[#f5f5f5] text-black border border-[#D2D2D2]"
                            required
                          />
                        </td>
                        <td className="px-3 py-2 text-sm whitespace-nowrap">
                          {item.priceVisible && item.unitPrice !== null
                            ? formatCurrency(item.unitPrice * item.quantity)
                            : t("quote.onRequest", { defaultValue: "Sob consulta" })}
                        </td>
                        <td className="px-3 py-2">
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700 inline-flex items-center"
                            onClick={() => removeItem(item.id)}
                            aria-label={t("quote.remove", { defaultValue: "Remover" })}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-3">
                <div className="text-sm md:text-base text-black font-semibold">
                  {t("quote.total", { defaultValue: "Total" })}:{" "}
                  <span className="ml-1">
                    {formatCurrency(cartGrandTotal)}
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  {t("quote.message")}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="font-sans outline-none block p-2.5 w-full text-sm rounded-lg border border-gray-300 placeholder-gray-400 bg-[#f5f5f5] text-black"
                  placeholder="Deixe aqui a sua mensagem"
                ></textarea>
              </div>
              <div className="w-full pt-4 ">
                <div className="flex items-center justify-between flex-col md:flex-row">
                  <label htmlFor="file-input" className="sr-only">
                    {t("quote.file")}
                  </label>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      setFormData((prev) => ({
                        ...prev,
                        file: file ? file : undefined,
                      }));
                    }}
                    id="file-input"
                    accept=".pdf,.jpg,.png"
                    className="font-sans font-regular border border-gray-200 shadow-sm rounded-lg block w-full md:w-3/5 text-sm focus:z-10 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                  />
                  <span className="w-full md:w-2/5 text-sm ml-6 text-slate-700 opacity-50">
                    {t("quote.file")} (PDF, JPG, PNG)(max. 2MB)
                  </span>
                </div>
              </div>
              <label className="inline-flex items-center cursor-pointer mt-4">
                <input
                  type="checkbox"
                  className="peer hidden"
                  name="terms"
                  checked={formData.terms}
                  onChange={(e) =>
                    setFormData({ ...formData, terms: e.target.checked })
                  }
                />
                <div className="w-3 h-3 border-2 border-black rounded-md flex items-center justify-center peer-checked:border-black peer-checked:bg-black transition-colors duration-200">
                  <svg
                    className="w-3 h-3 text-black hidden peer-checked:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-black text-sm pl-2">
                  {t("footer.newsletter.terms")}
                </span>
              </label>
              <button
                type="submit"
                className="mt-8 w-full md:w-[50%] inline-block group hover:bg-singula-main hover:translate-y-[-2px] transition-all transition duration-700 inline-block bg-singula-black p-2 rounded-3xl pr-4 flex items-center"
              >
                <span className="bg-singula-mainDarker text-white font-bold p-2 uppercase rounded-3xl text-md">
                  {t("quote.quote")}
                </span>
                <span className="w-full text-center transition-colors duration-300 group-hover:text-white text-singula-main text-lg mx-4">
                  {t("quote.send")}
                </span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="w-4 h-4 text-singula-main transition-colors group-hover:text-white duration-300"
                />
              </button>
              {Error && (
                <div
                  className="my-4 p-4 text-lg text-rose-500 rounded-lg bg-rose-950 w-auto"
                  role="alert"
                >
                  <span className="font-bold">Atenção!</span>{" "}
                  {t("quote.fields")}
                </div>
              )}
              {cartError && (
                <div
                  className="my-4 p-4 text-lg text-rose-500 rounded-lg bg-rose-950 w-auto"
                  role="alert"
                >
                  <span className="font-bold">Atenção!</span>{" "}
                  {t("quote.cart.required", {
                    defaultValue: "Selecione pelo menos um produto antes de enviar.",
                  })}
                </div>
              )}
            </form>
            <p className="mt-2 text-sm text-gray-400">* {t("quote.field")}.</p>
          </div>
        </motion.section>
      )}

      {Sent && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="max-w-4xl mx-auto py-20 mt-20 text-gray-800 flex items-center justify-center flex-col md:flex-row"
        >
          <div className="relative bg-white flex items-start justify-center flex-col text-left w-full rounded-lg md:rounded-r-2xl p-4 md:p-12">
            <h2 className="text-black text-2xl font-bold">
              {t("quote.success.title")}
            </h2>
            <p className="text-gray-400">{t("quote.success.message")}</p>
          </div>
        </motion.div>
      )}

      {EmailLoading && (
        <div className="py-40 mt-40 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="100"
            height="100"
          >
            <rect
              fill="black"
              stroke="black"
              stroke-width="7.5"
              stroke-linejoin="round"
              width="15"
              height="15"
              x="42.5"
              y="42.5"
              rx="0"
              ry="0"
            >
              <animate
                attributeName="rx"
                calcMode="spline"
                dur="2s"
                values="7.5;7.5;2.5;7.5;7.5"
                keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="ry"
                calcMode="spline"
                dur="2s"
                values="7.5;7.5;5;7.5;7.5"
                keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="height"
                calcMode="spline"
                dur="2s"
                values="15;15;0.5;15;15"
                keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                calcMode="spline"
                dur="2s"
                values="20;85;20"
                keySplines=".6 0 1 .4;0 .8 .2 1"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>
      )}
    </main>
  );
};
export default QuotePage;
