import { motion } from "framer-motion";

export const Quote = ({ close }: { close: () => void }) => {
  return (
    <dialog className="flex bg-transparent items-center justify-center fixed top-0 w-full left-0 z-50 overflow-hidden h-full">
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
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative p-4 w-full md:w-4/5 h-auto md:h-5/6 rounded-lg flex items-center justify-center flex-col md:flex-row"
      >
        <button
          onClick={close}
          className="absolute w-16 h-16 top-4 right-4 text-white flex justify-center items-center"
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
        <div className="hidden md:flex rounded-t-lg md:rounded-l-2xl bg-cover bg-center bg-[url(/cover.png)] w-full md:w-2/5 h-full"></div>
        <div className="bg-gray-900 flex items-start justify-center flex-col text-left w-full md:w-3/5 h-full rounded-lg md:rounded-r-2xl p-12">
          <h1 className="text-white text-2xl font-bold">Pedido de Orçamento</h1>
          <p className="text-gray-400">
            Para solicitar um orçamento, por favor, preencha o formulário abaixo
            com as informações necessárias.
          </p>
          <form
            className="mt-4 w-full md:w-4/5"
            action="/"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-row gap-4 mb-4 w-full">
              <div className="w-2/5">
                <label
                  htmlFor="name-input"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Nome*
                </label>
                <input
                  type="text"
                  id="name-input"
                  className="block w-full p-2 rounded-lg text-xs bg-gray-700 outline-none placeholder-gray-400 text-white"
                />
              </div>
              <div className="w-3/5">
                <label
                  htmlFor="email-input"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email-input"
                  className="block w-full p-2 rounded-lg text-xs bg-gray-700 outline-none placeholder-gray-400 text-white"
                />
              </div>
            </div>
            <div className="flex flex-row gap-4 mb-4 w-full">
              <div className="w-1/5">
                <label
                  htmlFor="phone-input"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Contacto*
                </label>
                <input
                  type="text"
                  id="phone-input"
                  className="block w-full p-2 rounded-lg text-xs bg-gray-700 outline-none placeholder-gray-400 text-white"
                />
              </div>
              <div className="w-2/5">
                <label
                  htmlFor="country-input"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  País
                </label>
                <input
                  type="text"
                  id="country-input"
                  className="block w-full p-2 rounded-lg text-xs bg-gray-700 outline-none placeholder-gray-400 text-white"
                />
              </div>
              <div className="w-2/5">
                <label
                  htmlFor="company-input"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Empresa
                </label>
                <input
                  type="text"
                  id="company-input"
                  className="block w-full p-2 rounded-lg text-xs bg-gray-700 outline-none placeholder-gray-400 text-white"
                />
              </div>
            </div>
            <div className="flex flex-row gap-4 mb-4 w-full">
              <div className="w-full">
                <label
                  htmlFor="phone-input"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Cargo / Função
                </label>
                <input
                  type="text"
                  id="phone-input"
                  className="block w-full p-2 rounded-lg text-xs bg-gray-700 outline-none placeholder-gray-400 text-white"
                />
              </div>
            </div>
            <div className="flex flex-row gap-4 mb-4 w-full">
              <div className="w-full">
                <label
                  htmlFor="phone-input"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Produtos
                </label>
                <input
                  type="text"
                  id="phone-input"
                  className="block w-full p-2 rounded-lg text-xs bg-gray-700 outline-none placeholder-gray-400 text-white"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-white"
              >
                A sua mensagem
              </label>
              <textarea
                id="message"
                rows={4}
                className="outline-none block p-2.5 w-full text-sm rounded-lg border border-gray-300 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="Deixe aqui a sua mensagem"
              ></textarea>
            </div>
            <button
              type="button"
              className="mt-8 font-bold text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br shadow-lg shadow-cyan-500/50 shadow-lg shadow-cyan-800/80 rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </motion.div>
    </dialog>
  );
};
