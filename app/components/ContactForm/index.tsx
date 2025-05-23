import { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

interface FormData {
  name: string;
  email: string;
  contact: string;
  message: string;
}

export const ContactForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contact: "",
    message: "",
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
    console.log("Form submitted:", formData);
    // Here you would normally send the data to a server
  };

  return (
    <section className="p-10 py-40 md:p-40">
      <form action="" method="" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="font-bold text-3xl md:text-5xl">{t("contact.title")}</h1>
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
                <button
                  type="submit"
                  className="text-2xl bg-red-400 text-white px-8 py-2 rounded-full flex items-center transition-ease transition-300"
                >
                  {t("contact.form.submit")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-center items-center">
        <button
          type="button"
          className="font-black text-2xl border border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-14 py-2 rounded-full transition-colors"
        >
          {t("contact.quote.button")}
        </button>
      </div>
    </section>
  );
};
