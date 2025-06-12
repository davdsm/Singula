import { faFile, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useSendMail } from "~/hooks/useEmail";
import { DelayedLink } from "../Elements/Link";
import { Quote } from "../Layout/Footer/quote";

interface FormData {
  name: string;
  email: string;
  contact: string;
  message: string;
  terms: string;
}

export const ContactForm = () => {
  const { t } = useTranslation();
  const { sendMail, Loading, Sent } = useSendMail();
  const [Error, setError] = useState<boolean>(false);
  const [QuoteModal, setQuoteModal] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contact: "",
    message: "",
    terms: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      "message",
      "terms",
    ];
    const emptyField = requiredFields.find((key) => !formData[key].trim());

    if (emptyField) {
      setError(true);
      return;
    }

    sendMail(formData.name, formData.contact, formData.email, formData.message);
  };

  return (
    <>
      <section className="p-10 pt-40 pb-10 md:p-40 md:pb-20">
        <form action="" method="" onSubmit={(e) => handleSubmit(e)}>
          <h1 className="font-bold text-3xl md:text-5xl">
            {t("contact.title")}
          </h1>
          <div className="bg-black text-white pt-20 pb-4 flex flex-col justify-center">
            <div className="w-full">
              <div className="">
                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex-1 my-4">
                    <label
                      htmlFor="name"
                      className="block text-md md:text-xl mb-2"
                    >
                      {t("contact.form.name.label")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-600 pb-2 focus:outline-none focus:border-gray-300"
                    />
                  </div>

                  <div className="flex-1 my-4">
                    <label
                      htmlFor="email"
                      className="block text-md md:text-xl mb-2"
                    >
                      {t("contact.form.email.label")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-600 pb-2 focus:outline-none focus:border-gray-300"
                    />
                  </div>

                  <div className="flex-1 my-4">
                    <label
                      htmlFor="contact"
                      className="block text-md md:text-xl mb-2"
                    >
                      {t("contact.form.contact.label")}
                    </label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-600 pb-2 focus:outline-none focus:border-gray-300"
                    />
                  </div>
                </div>

                <div className="my-4">
                  <label
                    htmlFor="message"
                    className="block text-md md:text-xl mb-2"
                  >
                    {t("contact.form.message.label")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.form.message.placeholder")}
                    className="w-full bg-transparent border-b border-gray-600 pb-2 focus:outline-none focus:border-gray-300 h-24 resize-none text-gray-400"
                  ></textarea>
                </div>

                <div className="flex justify-center md:justify-between items-center mt-8">
                  <label className="inline-flex items-center cursor-pointer mt-1">
                    <input
                      type="checkbox"
                      className="peer hidden"
                      name="terms"
                      value={formData.terms}
                      onChange={handleChange}
                    />
                    <div className="w-3 h-3 border-2 border-white rounded-md flex items-center justify-center peer-checked:border-black peer-checked:bg-white transition-colors duration-200">
                      <svg
                        className="w-3 h-3 text-white hidden peer-checked:block"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white text-sm pl-2">
                      <DelayedLink to="/terms">
                        {t("footer.newsletter.terms")}
                      </DelayedLink>
                    </span>
                  </label>
                </div>

                <div className="flex justify-center md:justify-between items-center mt-8">
                  <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gray-800 px-8 font-medium text-neutral-200">
                    <div className="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                      <FontAwesomeIcon
                        icon={faPlaneDeparture}
                        className="w-6 h-6"
                      />
                    </div>
                    <span className="text-xl px-2">
                      {Sent
                        ? "✉️✅"
                        : Loading
                        ? "..."
                        : t("contact.form.submit")}
                    </span>
                  </button>
                </div>

                {Error && (
                  <div
                    className="my-4 p-4 text-lg text-rose-500 rounded-lg bg-rose-950 w-auto"
                    role="alert"
                  >
                    <span className="font-bold">Atenção!</span> Preencha todos
                    os campos.
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={() => setQuoteModal(true)}
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-singula-main"
          >
            <div className="text-xl uppercase text-white font-bold inline-flex h-12 translate-y-0 items-center justify-center px-12 py-4 text-white transition duration-500 group-hover:-translate-y-[150%]">
              {t("contact.quote.button")}
              <FontAwesomeIcon icon={faFile} className="w-6 h-6 ml-4" />
            </div>
            <div className="flex absolute inline-flex h-12 w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
              <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-singula-mainDarker transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
              <span className="z-10 text-2xl font-bold flex items-center">
                {t("contact.quote.button")}
              </span>
            </div>
          </button>
        </div>
      </section>
      {QuoteModal && <Quote close={() => setQuoteModal(false)} />}
    </>
  );
};
