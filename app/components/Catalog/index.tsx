import { Button } from "../Elements/Button";
import { Image } from "../Elements/Image";
import { useTranslation } from "react-i18next";
import { parseTextWithMainColor } from "../utils";

export const CatalogComponent = ({
  title,
  subtitle,
  text,
  img,
  file,
}: {
  title: string;
  subtitle: string;
  text: string;
  img: string;
  file: string;
}) => {
  const { t } = useTranslation();

  return (
    <section className="flex justify-between items-start gap-10 px-10 w-full h-full items-center py-40 md:mt-10 flex-col-reverse md:flex-row md:px-40 md:py-40">
      <div className="w-full md:w-1/2">
        <p className="text-2xl md:text-4xl font-bold text-singula-main text-left">
          {parseTextWithMainColor(subtitle)}
        </p>
        <h1 className="text-3xl md:text-7xl font-black text-left py-2 pb-4 md:pb-8">
          {parseTextWithMainColor(title)}
        </h1>
        <p className="text-lg md:text-2xl md:leading-[2rem] text-white font-normal pb-8 md:pb-10">
          {parseTextWithMainColor(text)}
        </p>
        <Button
          to={file}
          target="_blank"
          firstText={t("catalog.button.first")}
          secondText={t("catalog.button.second")}
        />
      </div>
      <div className="w-full md:w-1/2 flex justify-start md:justify-end items-center">
        <Image
          src={img}
          alt={t("catalog.image.alt")}
          className="w-[70%] h-[30vh] md:h-[60vh] rounded-xl object-contain bg-white p-4 md:p-10"
        />
      </div>
    </section>
  );
};
