import { ChangeEvent, useState } from "react";
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

interface Option {
  id: string;
  name: string;
  img: string;
  qty: number;
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
  const [Sent, setSent] = useState(false);
  const { products } = useProducts({});
  const { t } = useTranslation();

  const options: Option[] = [];

  if (products.length > 0) {
    products.forEach((product) => {
      options.push({
        id: product.slug,
        img: product.ImagemPrincipal || "",
        qty: 0,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    console.log("formData...", formData);
    console.log("selectedProducts...", selectedProducts);

    // sendMail(formData.name, formData.contact, formData.email, formData.message);
    setSent(true);
  };

  return (
    <main className="bg-white overflow-x-hidden">
      {!Sent && (
        <motion.section
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="max-w-4xl mx-auto py-20 mt-10 text-gray-800 flex items-center justify-center flex-col md:flex-row px-4 md:px-0"
        >
          <div className="relative flex items-start justify-center flex-col text-left w-full p-4 md:p-12">
            <h1 className="text-black text-2xl font-bold">
              Pedido de Orçamento
            </h1>
            <p className="text-gray-400">
              Para solicitar um orçamento, por favor, preencha o formulário
              abaixo com as informações necessárias.
            </p>
            <form className="mt-4 w-full" action="/" onSubmit={handleSubmit}>
              <div className="flex flex-row gap-4 mb-4 w-full">
                <div className="w-2/5">
                  <label
                    htmlFor="name-input"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Nome*
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full p-2 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
                    required
                  />
                </div>
                <div className="w-3/5">
                  <label
                    htmlFor="email-input"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email-input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full p-2 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
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
                    Contacto
                  </label>
                  <input
                    type="text"
                    id="phone-input"
                    className="block w-full p-2 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-2/5 md:w-1/5">
                  <label
                    htmlFor="phone-input"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    País*
                  </label>
                  <input
                    type="text"
                    id="phone-input"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="block w-full p-2 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
                    required
                  />
                </div>
                <div className="w-1/5">
                  <label
                    htmlFor="company-input"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    id="company-input"
                    className="block w-full p-2 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
                  />
                </div>
                <div className="w-full md:w-2/5">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Entidade
                  </label>
                  <select
                    id="countries"
                    className="text-sm rounded-lg block w-full p-2 outline-none bg-[#f5f5f5] text-black"
                    name="entity"
                    onChange={handleChange}
                  >
                    <option
                      selected={formData.entity === "" ? true : false}
                      disabled
                    >
                      Escolher uma opção
                    </option>
                    <option
                      selected={formData.entity === "Public" ? true : false}
                      value="Public"
                    >
                      Pública
                    </option>
                    <option
                      selected={formData.entity === "Private" ? true : false}
                      value="Private"
                    >
                      Privada
                    </option>
                    <option
                      selected={formData.entity === "Particular" ? true : false}
                      value="Particular"
                    >
                      Particular
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
                    Produtos
                  </label>
                  <Listbox
                    value={selectedProducts}
                    onChange={(products: Option[]) => {
                      setSelectedProducts(
                        products.map((product) => {
                          const existing = selectedProducts.find(
                            (p) => p.id === product.id
                          );
                          return existing ? existing : { ...product, qty: 1 };
                        })
                      );
                    }}
                    multiple
                  >
                    <div className="relative">
                      <ListboxButton className="w-full bg-[#f5f5f5] text-left rounded-lg p-2 text-sm outline-none ">
                        {selectedProducts.length === 0
                          ? "Selecione os produtos"
                          : ""}
                        {selectedProducts
                          .map((product) => product.name?.toUpperCase())
                          .join(", ")}
                      </ListboxButton>

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
                            />{" "}
                            <span>{option.name}</span>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
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
                          Produto
                        </label>
                        <div className="flex items-center justify-between bg-[#f5f5f5] p-2 rounded-lg">
                          <div className="flex items-center">
                            <Image
                              src={product.img}
                              alt={product.name}
                              className="w-8 h-8 mr-4 mix-blend-darken"
                            />
                            <span className="font-bold text-sm text-black">
                              {product.name?.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="w-1/5 md:w-2/5">
                        <label
                          htmlFor="number-input"
                          className="block mb-2 text-sm font-medium text-black"
                        >
                          Quantidade
                        </label>
                        <input
                          type="number"
                          id="number-input"
                          aria-describedby="helper-text-explanation"
                          className="block w-full p-4 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
                          placeholder="1"
                          min={0}
                          value={product.qty}
                          onChange={(e) => {
                            const qty = parseInt(e.target.value, 10);
                            if (qty >= 0) {
                              setSelectedProducts((prev) =>
                                prev.map((p) =>
                                  p.id === product.id ? { ...p, qty: qty } : p
                                )
                              );
                            }
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
                  A sua mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="outline-none block p-2.5 w-full text-sm rounded-lg border border-gray-300 placeholder-gray-400 bg-[#f5f5f5] text-black"
                  placeholder="Deixe aqui a sua mensagem"
                ></textarea>
              </div>
              <div className="w-full pt-4 ">
                <div className="flex items-center justify-between flex-col md:flex-row">
                  <label htmlFor="file-input" className="sr-only">
                    Anexar Ficheiro
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
                    className="border border-gray-200 shadow-sm rounded-lg block w-full md:w-3/5 text-sm focus:z-10 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                  />
                  <span className="w-full md:w-2/5 text-sm ml-6 text-slate-700 opacity-50">
                    Anexar Ficheiro. (PDF, JPG, PNG)(max. 2MB)
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
                  Orçamento
                </span>
                <span className="w-full text-center transition-colors duration-300 group-hover:text-white text-singula-main text-lg mx-4">
                  Enviar Pedido
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
                  <span className="font-bold">Atenção!</span> Preencha todos os
                  campos obrigatórios.
                </div>
              )}
            </form>
            <p className="mt-2 text-sm text-gray-400">* campo obrigatório.</p>
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
    </main>
  );
};
export default QuotePage;
