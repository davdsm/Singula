import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { MainColor } from "../Elements/Colors/main";
import { useContacts } from "~/hooks/useContacts";

export const ContactInfo = () => {
  const { t } = useTranslation();
  const { contacts, loading } = useContacts();

  return (
    <>
      {!loading && (
        <section className="bg-black text-white pt-4 pb-16 md:py-16 px-10">
          <div className="w-full mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                viewport={{ amount: 0.3 }}
                className="lg:w-2/5 mb-12 lg:mb-0"
              >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
                  {t("contact.info.title.part1")}{" "}
                  <MainColor>{t("contact.info.title.highlight")}</MainColor>.
                </h2>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold">
                  {t("contact.info.title.part2")}
                </h3>
              </motion.div>

              <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8 lg:gap-12">
                {contacts.map((item, index) => (
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
                      {item.name}
                    </h4>

                    <div className="w-8 h-0.5 bg-gray-500 mb-4"></div>

                    <div className="space-y-1 text-gray-300 text-lg md:text-base leading-relaxed font-sans font-regular">
                      <p className="hover:text-white transition-colors cursor-pointer">
                        {item.email}
                      </p>
                      <p className="hover:text-white transition-colors cursor-pointer">
                        {item.contact} <br />
                      </p>
                      <p className="text-sm mt-3 font-sans font-regular"><Trans>{item.address.replace(/[\r\n]+/g, '')}</Trans></p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
