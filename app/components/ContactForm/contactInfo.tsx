import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MainColor } from "../Elements/Colors/main";

interface ContactItem {
  title: string;
  email: string;
  phone: string;
  address: string;
  addressLine2: string;
  city: string;
}

export const ContactInfo = () => {
  const { t, i18n } = useTranslation();
  const [contactItems, setContactItems] = useState<ContactItem[]>([]);

  useEffect(() => {
    const lang = i18n.language || "pt";

    fetch(`/api/${lang}/contactInfo.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: ContactItem[]) => setContactItems(data));
  }, [i18n.language]);

  return (
    <section className="bg-black text-white py-16 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            viewport={{ amount: 0.3 }}
            className="lg:w-1/2 mb-12 lg:mb-0"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
              {t("contact.info.title.part1")}{" "}
              <MainColor>{t("contact.info.title.highlight")}</MainColor>.
            </h2>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold">
              {t("contact.info.title.part2")}
            </h3>
          </motion.div>

          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 lg:gap-12">
            {contactItems.map((item, index) => (
              <motion.div
                key={`contact-${index}`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.4 + index * 0.1,
                }}
                viewport={{ amount: 0.2 }}
                className=""
              >
                <h4 className="text-lg md:text-xl font-bold text-red-400 mb-2">
                  {item.title}
                </h4>

                <div className="w-8 h-0.5 bg-gray-500 mb-4"></div>

                <div className="space-y-1 text-gray-300 text-sm md:text-base leading-relaxed">
                  <p className="hover:text-white transition-colors cursor-pointer">
                    {item.email}
                  </p>
                  <p className="hover:text-white transition-colors cursor-pointer">
                    {item.phone}
                  </p>
                  <p className="text-sm mt-3">{item.address}</p>
                  <p className="text-sm">{item.addressLine2}</p>
                  <p className="text-sm">{item.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
