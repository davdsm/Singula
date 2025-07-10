import { MetaFunction } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { usePageContent } from "~/hooks/usePageContent";

export const meta: MetaFunction = () => {
  return [{ title: "Termos e Condições - Singula" }];
};

export const Terms = () => {
  const { data, loading } =
    usePageContent("Legal");    

  return !loading && <div dangerouslySetInnerHTML={{ __html: `<section class='bg-black-100 py-20'>${data.terms}</section>` }} />;
};

export default Terms;
