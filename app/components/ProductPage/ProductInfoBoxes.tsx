import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface ColorOption {
  name: string;
  color: string;
  code: string;
}

interface DownloadOption {
  id: string;
  type: string;
  title: string;
  url: string;
  fileSize: string;
  format: string;
  icon: string;
}

interface ProductData {
  colors: ColorOption[];
}

export const ProductInfoBoxes = () => {
  const { t, i18n } = useTranslation();
  const [colorOptions, setColorOptions] = useState<ColorOption[]>([]);
  const [downloads, setDownloads] = useState<DownloadOption[]>([]);

  useEffect(() => {
    const lang = i18n.language || "pt";

    // Load product data (colors)
    fetch(`/api/${lang}/product-nexo-bench.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: ProductData) => setColorOptions(data.colors || []))
      .catch((error) => console.error("Error loading product data:", error));

    // Load downloads data
    fetch(`/api/${lang}/downloads.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: DownloadOption[]) => setDownloads(data))
      .catch((error) => console.error("Error loading downloads data:", error));
  }, [i18n.language]);

  return (
    <section className="relative bg-white pt-12 md:pt-20 px-4 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="block lg:hidden space-y-6 mb-12">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            viewport={{ amount: 0.3 }}
            className="bg-black text-white p-6 md:p-8 rounded-2xl w-full"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6 uppercase tracking-wider text-white">
              {t("product.download.title")}
            </h3>

            <div className="space-y-4">
              {downloads.map((download, index) => (
                <a
                  key={`download-${download.id}`}
                  href={download.url}
                  download
                  className="flex items-center cursor-pointer hover:text-red-400 transition-colors group"
                >
                  <div className="w-3 h-3 bg-white rounded-full mr-4 flex-shrink-0 group-hover:bg-red-400 transition-colors"></div>
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base text-white group-hover:text-red-400 transition-colors">
                      {download.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      {download.format} • {download.fileSize}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {colorOptions.length > 0 && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
              viewport={{ amount: 0.3 }}
              className="border border-gray-300 p-6 md:p-8 rounded-2xl w-full bg-white"
            >
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-black inline">
                  {t("product.colors.title")}
                </h3>
                <span className="text-xs text-gray-500 ml-2 lowercase">
                  {t("product.colors.recommended")}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {colorOptions.map((option, index) => (
                  <div key={`color-${index}`} className="text-center">
                    <div
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg mx-auto mb-2 border border-gray-300"
                      style={{ backgroundColor: option.color }}
                    ></div>
                    <p className="text-xs font-bold uppercase tracking-wide text-black">
                      {option.code}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
            viewport={{ amount: 0.3 }}
            className="border border-gray-300 p-6 md:p-8 rounded-2xl w-full bg-white"
          >
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-black inline">
                {t("product.note.title")}
              </h3>
              <span className="text-xs text-gray-500 ml-2 lowercase">
                {t("product.note.customization")}
              </span>
            </div>

            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>{t("product.note.colors")}</p>
              <p>{t("product.note.measurements")}</p>
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:flex gap-6 items-start mb-16">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            viewport={{ amount: 0.3 }}
            className="bg-black text-white p-8 rounded-2xl w-[300px] flex-shrink-0"
          >
            <h3 className="text-2xl font-bold mb-8 uppercase tracking-wider text-white">
              {t("product.download.title")}
            </h3>

            <div className="space-y-6">
              {downloads.map((download, index) => (
                <a
                  key={`download-${download.id}`}
                  href={download.url}
                  download
                  className="flex items-center cursor-pointer hover:text-red-400 transition-colors group"
                >
                  <div className="w-3 h-3 bg-white rounded-full mr-4 flex-shrink-0 group-hover:bg-red-400 transition-colors"></div>
                  <div className="flex flex-col">
                    <span className="text-base text-white group-hover:text-red-400 transition-colors">
                      {download.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      {download.format} • {download.fileSize}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {colorOptions.length > 0 && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
              viewport={{ amount: 0.3 }}
              className="border border-gray-300 p-8 rounded-2xl w-[380px] flex-shrink-0 bg-white"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold uppercase tracking-wider text-black inline">
                  {t("product.colors.title")}
                </h3>
                <span className="text-xs text-gray-500 ml-2 lowercase">
                  {t("product.colors.recommended")}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {colorOptions.map((option, index) => (
                  <div key={`color-${index}`} className="text-center">
                    <div
                      className="w-16 h-16 rounded-lg mx-auto mb-2 border border-gray-300"
                      style={{ backgroundColor: option.color }}
                    ></div>
                    <p className="text-xs font-bold uppercase tracking-wide text-black">
                      {option.code}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
            viewport={{ amount: 0.3 }}
            className="border border-gray-300 p-8 rounded-2xl flex-1 bg-white"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold uppercase tracking-wider text-black inline">
                {t("product.note.title")}
              </h3>
              <span className="text-xs text-gray-500 ml-2 lowercase">
                {t("product.note.customization")}
              </span>
            </div>

            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>{t("product.note.colors")}</p>
              <p>{t("product.note.measurements")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
