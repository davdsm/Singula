import { motion } from "framer-motion";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Button } from "~/components/Elements/Button";
import { useProducts } from "~/hooks/useProducts";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { DelayedLink } from "~/components/Elements/Link";
import { useTranslation } from "react-i18next";

interface Option {
  id: string;
  name: string;
}

export const Quote = ({ close }: { close: () => void }) => {
  const [selectedProduct, setSelectedProduct] = useState<Option[]>([]);
  const [Sent, setSent] = useState(false);
  const { products } = useProducts({});
  const { t } = useTranslation();

  const options: Option[] = [];

  if (products.length > 0) {
    products.forEach((product) => {
      options.push({
        id: product.slug,
        name: product.name
          .replaceAll("<red>", "")
          .replaceAll("</red>", "")
          .toUpperCase(),
      });
    });
  }
  const sentQuote = () => {
    setSent(true);
  };

  return (
    <dialog className="flex bg-transparent items-center justify-center fixed top-0 w-full left-0 z-[100] overflow-hidden h-full">
      <button
        type="button"
        aria-label="Fechar"
        tabIndex={0}
        className="bg-black absolute inset-0 opacity-85 top-0 left-0"
        onClick={close}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            close();
          }
        }}
        style={{ cursor: "pointer" }}
      ></button>
      {!Sent && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full md:w-3/5 h-auto md:h-5/6 rounded-lg flex items-center justify-center flex-col md:flex-row"
        >
          <div className="relative bg-white flex items-start justify-center flex-col text-left w-full rounded-lg md:rounded-r-2xl p-4 md:p-12">
            <button
              onClick={close}
              className="absolute w-16 h-16 top-0 right-0 md:top-4 md:right-4 text-black flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <h1 className="text-black text-2xl font-bold">
              Pedido de Orçamento
            </h1>
            <p className="text-gray-400">
              Para solicitar um orçamento, por favor, preencha o formulário
              abaixo com as informações necessárias.
            </p>
            <form
              className="mt-4 w-full"
              action="/"
              onSubmit={(e) => e.preventDefault()}
            >
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
                    className="block w-full p-2 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
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
                    className="block w-full p-2 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4 mb-4 w-full flex-wrap md:flex-nowrap">
                <div className="w-1/5">
                  <label
                    htmlFor="phone-input"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Contacto*
                  </label>
                  <input
                    type="text"
                    id="phone-input"
                    className="block w-full p-2 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
                  />
                </div>
                <div className="w-2/5 md:w-1/5">
                  <label
                    htmlFor="phone-input"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Cargo / Função
                  </label>
                  <input
                    type="text"
                    id="phone-input"
                    className="block w-full p-2 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
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
                  >
                    <option selected disabled>
                      Escolher uma opção
                    </option>
                    <option value="Public">Pública</option>
                    <option value="Private">Privada</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row gap-4 mb-4 w-full">
                <div className="w-4/5">
                  <label
                    htmlFor="phone-input"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Produtos
                  </label>
                  <Listbox
                    value={selectedProduct}
                    onChange={setSelectedProduct}
                    multiple
                  >
                    <div className="relative">
                      <ListboxButton className="w-full bg-[#f5f5f5] text-left rounded-lg p-2 text-sm">
                        {selectedProduct.length === 0
                          ? "Selecione os produtos"
                          : ""}
                        {selectedProduct
                          .map((product) => product.name?.toUpperCase())
                          .join(", ")}
                      </ListboxButton>

                      <ListboxOptions className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 max-h-60 overflow-auto text-sm border border-gray-300">
                        {options.map((option) => (
                          <ListboxOption
                            key={option.id}
                            value={option}
                            className={({ selected }) =>
                              `cursor-pointer select-none relative px-4 py-2 ${
                                selected
                                  ? "bg-singula-main text-white"
                                  : "text-gray-900"
                              }`
                            }
                          >
                            {option.name}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>
                </div>
                <div className="w-1/5">
                  <label
                    htmlFor="number-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quantidade
                  </label>
                  <input
                    type="number"
                    id="number-input"
                    aria-describedby="helper-text-explanation"
                    className="block w-full p-2 rounded-lg text-xs outline-none placeholder-gray-400 bg-[#f5f5f5] text-black"
                    placeholder="1"
                    required
                  />
                </div>
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
                  className="outline-none block p-2.5 w-full text-sm rounded-lg border border-gray-300 placeholder-gray-400 bg-[#f5f5f5] text-black"
                  placeholder="Deixe aqui a sua mensagem"
                ></textarea>
              </div>
              <div className="max-w-sm pt-4">
                <label htmlFor="file-input" className="sr-only">
                  Anexar Ficheiro
                </label>
                <input
                  type="file"
                  name="file-input"
                  id="file-input"
                  className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                />
              </div>
              <label className="inline-flex items-center cursor-pointer mt-4">
                <input type="checkbox" className="peer hidden" name="terms" />
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
                  <DelayedLink to="/terms">
                    {t("footer.newsletter.terms")}
                  </DelayedLink>
                </span>
              </label>
              <button
                onClick={sentQuote}
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
            </form>
          </div>
        </motion.div>
      )}
      {Sent && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full md:w-3/5 h-auto md:h-5/6 rounded-lg flex items-center justify-center flex-col md:flex-row"
        >
          <div className="relative bg-white flex items-start justify-center flex-col text-left w-full rounded-lg md:rounded-r-2xl p-4 md:p-12">
            <button
              onClick={close}
              className="absolute w-8 h-8 top-0 right-0 md:top-4 md:right-4 text-black flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
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
    </dialog>
  );
};
