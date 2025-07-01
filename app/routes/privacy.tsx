import { MetaFunction } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  return [
    { title: "Política de Privacidade - Singula" },
  ];
};

export const Terms = () => {
  const { t } = useTranslation();

  return <div dangerouslySetInnerHTML={{ __html: t("text.privacy") }} />;
};

export default Terms;
