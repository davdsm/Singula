import { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useProducts } from "~/hooks/useProducts";
import { Image } from "~/components/Elements/Image";
import { MetaFunction } from "@remix-run/react";
import useCountries from "~/hooks/useCountries";
import { useSendMail } from "~/hooks/useEmail";
import useDB from "~/hooks/useDB";

interface Option {
  id: string;
  name: string;
  img: string;
  qty: string;
}

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

export const meta: MetaFunction = () => {
  return [
    { title: "Pedido de Orçamento - Singula" },
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

  const [selectedProducts, setSelectedProducts] = useState<Option[]>([]);
  const [Error, setError] = useState<boolean>(false);
  const { products } = useProducts({});
  const { Countries, Loading } = useCountries();
  const { t } = useTranslation();
  const { sendMail, Sent, Loading: EmailLoading } = useSendMail();
  const db = useDB();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 1192);
    }
  }, []);

  const options: Option[] = [];

  if (products.length > 0) {
    products.forEach((product) => {
      options.push({
        id: product.id,
        img: product.ImagemPrincipal || "",
        qty: "",
        name: product.name
          .replaceAll("<red>", "")
          .replaceAll("</red>", "")
          .toUpperCase(),
      });
    });
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

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

    window.scrollTo({ top: 0, behavior: "smooth" });

    const data = {
      Name: formData.name,
      Email: formData.email,
      Contact: formData.contact,
      Country: formData.country,
      Entity: formData.company,
      Entity_Type: formData.entity,
      Products: selectedProducts.map((product) => product.id),
      File: formData.file,
      Message: formData.message,
    };

    const result = await db.addData("Orcamentos", data);

    await sendMail(
      formData.name,
      formData.contact,
      formData.email,
      formData.message,
      true,
      {
        country: formData.country,
        entity: formData.company,
        entity_type: formData.entity,
        products: selectedProducts
          .map((product) => `${product.name} (${product.qty})`)
          .join(", "),
        attachment: formData.file
          ? `<a href="https://singula.pt/admin/_/#/collections?collection=pbc_2578185338&filter=&sort=-%40rowid&recordId=${result.id}">Disponível no BackOffice.</a>`
          : false,
      },
      undefined,
      result.REF
    );

    await sendMail(
      formData.name,
      formData.contact,
      formData.email,
      formData.message,
      true,
      {
        country: formData.country,
        entity: formData.company,
        entity_type: formData.entity,
        products: selectedProducts
          .map((product) => `${product.name} (${product.qty})`)
          .join(", "),
        attachment: formData.file
          ? `<a href="https://singula.pt/admin/_/#/collections?collection=pbc_2578185338&filter=&sort=-%40rowid&recordId=${result.id}">Disponível no BackOffice.</a>`
          : false,
      },
      formData.email,
      result.REF
    );
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
                    defaultValue=""
                  >
                    <option
                      selected={formData.country === "" ? true : false}
                      disabled
                    >
                      {t("quote.entity-choose")}
                    </option>
                    {!Loading &&
                      Countries.map((country) => (
                        <option
                          key={country}
                          value={country}
                          selected={formData.country === country ? true : false}
                        >
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
                    defaultValue=""
                  >
                    <option
                      selected={formData.entity === "" ? true : false}
                      disabled
                    >
                      {t("quote.entity-choose")}
                    </option>
                    <option
                      selected={formData.entity === "Public" ? true : false}
                      value="Public"
                    >
                      {t("quote.entity-public")}
                    </option>
                    <option
                      selected={formData.entity === "Private" ? true : false}
                      value="Private"
                    >
                      {t("quote.entity-private")}
                    </option>
                    <option
                      selected={formData.entity === "Particular" ? true : false}
                      value="Particular"
                    >
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
                    {t("quote.products")}
                  </label>
                  <Listbox
                    value={selectedProducts}
                    onChange={(products: Option[]) => {
                      setSelectedProducts(
                        products.map((product) => {
                          const existing = selectedProducts.find(
                            (p) => p.id === product.id
                          );
                          return existing ? existing : { ...product, qty: "1" };
                        })
                      );
                    }}
                    multiple
                  >
                    {({ open }) => (
                      <div className="relative">
                        <ListboxButton className="font-sans font-regular w-full bg-[#f5f5f5] text-left rounded-lg p-2 text-[12px] md:text-sm outline-none ">
                          {selectedProducts.length === 0
                            ? t("quote.choose-products")
                            : ""}
                          {selectedProducts.length > 0 &&
                            (open
                              ? t("quote.close.list")
                              : t("quote.open.list"))}
                        </ListboxButton>

                        {open && (
                          <ListboxOptions className="outline-none absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 max-h-60 overflow-auto text-sm border border-gray-300">
                            {options.map((option) => (
                              <ListboxOption
                                key={option.id}
                                value={option}
                                className={({ selected }) =>
                                  `cursor-pointer flex items-center justify-start select-none relative px-4 py-2 ${
                                    selected
                                      ? "bg-singula-main text-white"
                                      : "text-gray-900"
                                  }`
                                }
                              >
                                <Image
                                  className="w-12 h-12 mr-4"
                                  src={option.img}
                                  alt={option.name}
                                />
                                <span>{option.name}</span>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        )}
                      </div>
                    )}
                  </Listbox>
                </div>
              </div>
              <div className="products">
                <ul className="list-none p-0">
                  {selectedProducts.map((product) => (
                    <li
                      className="flex items-center justify-between mb-2 w-full gap-8"
                      key={product.id}
                    >
                      <div className="w-full">
                        <label
                          htmlFor="number-input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {t("quote.product")}
                        </label>
                        <div className="flex items-center justify-between bg-[#f5f5f5] p-2 rounded-lg">
                          <div className="flex items-center">
                            <Image
                              src={product.img}
                              alt={product.name}
                              className="w-8 h-8 mr-4 mix-blend-darken"
                            />
                            <span className="md:font-bold text-[8px] md:text-sm text-black font-sans font-regular">
                              {product.name?.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="w-1/5 md:w-2/5">
                        <label
                          htmlFor="number-input"
                          className="block mb-2 text-xs md:text-sm font-medium text-black font-sans font-regular"
                        >
                          {t("quote.qty")}
                        </label>
                        <input
                          type={isMobile ? "text" : "number"}
                          id="number-input"
                          aria-describedby="helper-text-explanation"
                          className="font-sans font-regular block w-full p-4 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
                          placeholder="1"
                          value={product.qty}
                          onChange={(e) => {
                            setSelectedProducts((prev) =>
                              prev.map((p) =>
                                p.id === product.id
                                  ? { ...p, qty: e.target.value }
                                  : p
                              )
                            );
                          }}
                          required
                        />
                      </div>

                      <button
                        type="button"
                        className="w-1/5 h-full p-4 text-red-500 hover:text-red-700 text-center mt-6 flex items-center justify-center"
                        onClick={() =>
                          setSelectedProducts(
                            selectedProducts.filter((p) => p.id !== product.id)
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4 black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
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
              Pedido de Orçamento Enviado
            </h2>
            <p className="text-gray-400">
              Obrigado por solicitar um orçamento. Entraremos em contato
              brevemente com mais informações.
            </p>
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
