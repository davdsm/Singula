import { useState } from "react";
import { useTranslation } from "react-i18next";
import { About } from "~/components/ProductPages/About";
import { BannerText } from "~/components/ProductPages/BannerText";
import { CoresRal } from "~/components/ProductPages/CoresRal";
import { ProductPageEntry } from "~/components/ProductPages/Entry";
import { Finishings } from "~/components/ProductPages/Finishings";
import { HPL as Hpl } from "~/components/ProductPages/HPL";
import { Modal } from "~/components/Elements/Modal";
import { useAcabamentos } from "~/hooks/useAcabamentos";
import { useCoresRal } from "~/hooks/useColors";
import { useCompactoHPL } from "~/hooks/useCompactoHPL";
import { useMateriais } from "~/hooks/useMateriais";
import { usePageContent } from "~/hooks/usePageContent";
import { Loading } from "~/components/Elements/Loading";
import { MaterialPopup } from "~/components/ProductPage/MaterialPopup";
import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Materiais - Singula" },
    {
      name: "description",
      content: "Na Singula, os materiais não são apenas materiais — são os protagonistas da história! Temos metal que não teme nada, a cortiça que é tão natural que até pede licença para entrar, o corian que brilha mais que um influencer, e o compacto HPL que é resistente e chique ao mesmo tempo. A madeira? Vem clássica, mas sai moderna. As cores RAL, claro, para dar aquele impacto final. E isso é só o começo — porque os espaços precisam mais do que o básico, precisam de design com personalidade.",
    },
  ];
};

export const Materials = () => {
  const { t } = useTranslation();

  const [ModalContent, setModalContent] = useState<{
    title: string;
    img: string;
    text: string;
  }>({
    title: "",
    img: "",
    text: "",
  });

  const { data, loading } = usePageContent("Pagina_Materiais");
  const { cores } = useCoresRal();
  const compactoHPL = useCompactoHPL();
  const acabamentos = useAcabamentos();
  const materiais = useMateriais();

  if (loading) return <Loading />;
  if (Object.keys(data).length === 0) return <Loading />;

  return (
    <main className="bg-white">
      <ProductPageEntry
        img={data["materials-entry-img"][0]}
        title={t("menu.materials")}
      />
      <About
        text={data["materials-entry-text"] as string}
        setModalContent={(content) =>
          setModalContent({
            title: content.title,
            img: content.img ?? "",
            text: content.text,
          })
        }
        list={materiais}
      />
      <BannerText text={data["materials-central-text"] as string} />
      <CoresRal
        text={data["materials-ral-colors-text"] as string}
        title={data["materials-ral-colors-title"] as string}
        colors={cores}
      />
      <Hpl
        title={data["materials-hpl-title"] as string}
        text={data["materials-hpl-text"] as string}
        img={data["materials-hpl-img"] as string}
        setModalContent={setModalContent}
        list={compactoHPL.map((item) => ({
          name: item.name,
          img: item.image ?? "",
          description: item.description,
        }))}
      />
      <Finishings
        list={acabamentos.map((acabamento) => ({
          name: acabamento.name,
          text: acabamento.text,
          img: acabamento.image || "",
        }))}
      />
      {ModalContent.title.length > 0 && (
        <MaterialPopup
          img={ModalContent.img}
          text={ModalContent.text}
          title={ModalContent.title}
          close={() => setModalContent({ title: "", img: "", text: "" })}
        />
      )}
    </main>
  );
};

export default Materials;
