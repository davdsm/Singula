import { useTranslation } from "react-i18next";
import "../404.scss";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section
      id="page-404"
      className="flex items-center justify-center h-screen flex-col"
    >
      <h1>404</h1>
      <div className="cloak__wrapper">
        <div className="cloak__container">
          <div className="cloak"></div>
        </div>
      </div>
      <div className="info">
        <h2>{t("not-found.title")}</h2>
        <p>{t("not-found.description")}</p>
        <a className="bg-singula-main hover:bg-singula-mainDarker" href="/">
          {t("not-found.home")}
        </a>
      </div>
    </section>
  );
}
