import { Button } from "../Elements/Button";
import { Image } from "../Elements/Image";
import { useTranslation } from "react-i18next";

export const CatalogComponent = () => {
  const { t } = useTranslation();

  return (
    <section className="flex justify-between items-start gap-10 px-10 w-full h-full items-center py-40 md:mt-10 flex-col-reverse md:flex-row md:px-40 md:py-40">
      <div className="w-full md:w-1/2">
        <p className="text-2xl md:text-4xl font-bold text-singula-main text-left">
          {t("catalog.title")}
        </p>
        <h1 className="text-3xl md:text-7xl font-black text-left py-2 pb-4 md:pb-8">
          {t("catalog.download.heading")}
        </h1>
        <p className="text-lg md:text-2xl md:leading-[2rem] text-white font-normal pb-8 md:pb-10">
          {t("catalog.description")}
        </p>
        <Button
          to="#"
          firstText={t("catalog.button.first")}
          secondText={t("catalog.button.second")}
        />
      </div>
      <div className="w-full md:w-1/2 flex justify-start md:justify-end items-center">
        <Image
          src="media/catalog/catalog.jpg"
          alt={t("catalog.image.alt")}
          className="w-[70%] h-[30vh] md:h-[60vh] rounded-xl object-contain bg-white p-4 md:p-10"
        />
      </div>
    </section>
  );
};
