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

  const buildQuoteTableHtml = () => {
    const headers = {
      pt: {
        product: "Produto",
        subproduct: "Subproduto",
        variation: "Variação",
        reference: "Referência",
        unitPrice: "Preço Unit.",
        qty: "Qtd.",
        total: "Total",
        onRequest: "Sob consulta",
      },
      en: {
        product: "Product",
        subproduct: "Subproduct",
        variation: "Variation",
        reference: "Reference",
        unitPrice: "Unit Price",
        qty: "Qty.",
        total: "Total",
        onRequest: "On request",
      },
      es: {
        product: "Producto",
        subproduct: "Subproducto",
        variation: "Variación",
        reference: "Referencia",
        unitPrice: "Precio Unit.",
        qty: "Cant.",
        total: "Total",
        onRequest: "A consultar",
      },
      fr: {
        product: "Produit",
        subproduct: "Sous-produit",
        variation: "Variation",
        reference: "Référence",
        unitPrice: "Prix Unit.",
        qty: "Qté.",
        total: "Total",
        onRequest: "Sur demande",
      },
      de: {
        product: "Produkt",
        subproduct: "Unterprodukt",
        variation: "Variation",
        reference: "Referenz",
        unitPrice: "Stückpreis",
        qty: "Menge",
        total: "Gesamt",
        onRequest: "Auf Anfrage",
      },
    }[quoteLang];

    const rows = cartItems
      .map((item) => {
        const hasPrice = item.priceVisible && item.unitPrice !== null;
        const unitPrice = hasPrice ? formatCurrency(item.unitPrice as number) : headers.onRequest;
        const total = hasPrice
          ? formatCurrency((item.unitPrice as number) * item.quantity)
          : headers.onRequest;
        return `<tr>
          <td style="padding:8px;border:1px solid #dddddd;">${escapeHtml(
            sanitizeProductName(item.productName)
          )}</td>
          <td style="padding:8px;border:1px solid #dddddd;">${escapeHtml(
            item.subproductName || "-"
          )}</td>
          <td style="padding:8px;border:1px solid #dddddd;">${escapeHtml(
            item.variationReference
          )}</td>
          <td style="padding:8px;border:1px solid #dddddd;">${escapeHtml(
            item.variationReference
          )}</td>
          <td style="padding:8px;border:1px solid #dddddd;">${unitPrice}</td>
          <td style="padding:8px;border:1px solid #dddddd;">${item.quantity}</td>
          <td style="padding:8px;border:1px solid #dddddd;">${total}</td>
        </tr>`;
      })
      .join("");

    return `<table style="width:100%;border-collapse:collapse;font-size:14px;margin:8px 0 0 0;">
      <thead>
        <tr style="background:#f5f5f5;">
          <th style="padding:8px;border:1px solid #dddddd;text-align:left;">${headers.product}</th>
          <th style="padding:8px;border:1px solid #dddddd;text-align:left;">${headers.subproduct}</th>
          <th style="padding:8px;border:1px solid #dddddd;text-align:left;">${headers.variation}</th>
          <th style="padding:8px;border:1px solid #dddddd;text-align:left;">${headers.reference}</th>
          <th style="padding:8px;border:1px solid #dddddd;text-align:left;">${headers.unitPrice}</th>
          <th style="padding:8px;border:1px solid #dddddd;text-align:left;">${headers.qty}</th>
          <th style="padding:8px;border:1px solid #dddddd;text-align:left;">${headers.total}</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
  };

  const buildQuoteSummaryHtml = () => {
    const labels = {
      pt: { items: "Itens", units: "Unidades", subtotal: "Subtotal", pending: "Linhas sob consulta" },
      en: { items: "Items", units: "Units", subtotal: "Subtotal", pending: "On-request lines" },
      es: { items: "Ítems", units: "Unidades", subtotal: "Subtotal", pending: "Líneas a consultar" },
      fr: { items: "Articles", units: "Unités", subtotal: "Sous-total", pending: "Lignes sur demande" },
      de: { items: "Positionen", units: "Einheiten", subtotal: "Zwischensumme", pending: "Positionen auf Anfrage" },
    }[quoteLang];

    const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce((acc, item) => {
      if (!item.priceVisible || item.unitPrice === null) return acc;
      return acc + item.unitPrice * item.quantity;
    }, 0);
    const pendingCount = cartItems.filter(
      (item) => !item.priceVisible || item.unitPrice === null
    ).length;

    return `<div style="font-size:14px;line-height:1.6;">
      <div><strong>${labels.items}:</strong> ${cartItems.length}</div>
      <div><strong>${labels.units}:</strong> ${totalUnits}</div>
      <div><strong>${labels.subtotal}:</strong> ${formatCurrency(subtotal)}</div>
      <div><strong>${labels.pending}:</strong> ${pendingCount}</div>
    </div>`;
  };

  const buildBackofficeOrderDetails = () => {
    const details = cartItems
      .map((item, index) => {
        const unitPrice =
          item.priceVisible && item.unitPrice !== null
            ? formatCurrency(item.unitPrice)
            : "Sob consulta";
        return [
          `${index + 1}. Produto: ${sanitizeProductName(item.productName)}`,
          `   Subproduto: ${item.subproductName || "-"}`,
          `   Variação: ${item.variationReference}`,
          `   Referência: ${item.variationReference}`,
          `   Quantidade: ${item.quantity}`,
          `   Preço unitário: ${unitPrice}`,
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
          .map(
            (item) => `${item.variationReference} (${item.quantity})`
          )
          .join(", "),
        productsTable: buildQuoteTableHtml(),
        productsSummary: buildQuoteSummaryHtml(),
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
          .map(
            (item) => `${item.variationReference} (${item.quantity})`
          )
          .join(", "),
        productsTable: buildQuoteTableHtml(),
        productsSummary: buildQuoteSummaryHtml(),
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
                        to="/products"
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
                        to="/products"
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
                        {t("quote.qty", { defaultValue: "Quantidade" })}
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
                              alt={item.variationReference}
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
                        <td className="px-3 py-2 text-sm">{item.variationReference}</td>
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
                  placeholder="Deixe aqui a sua mensagem (Escrever referência do produto)"
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
