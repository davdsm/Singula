import { useTranslation } from "react-i18next";

export const Terms = () => {
  const { t } = useTranslation();

  return <div dangerouslySetInnerHTML={{ __html: t("text.terms") }} />;
};

export default Terms;
