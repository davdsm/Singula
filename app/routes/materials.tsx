import { useState } from "react";
import { useTranslation } from "react-i18next";
import { About } from "~/components/ProductPages/About";
import { BannerText } from "~/components/ProductPages/BannerText";
import { CoresRal } from "~/components/ProductPages/CoresRal";
import { ProductPageEntry } from "~/components/ProductPages/Entry";
import { Finishings } from "~/components/ProductPages/Finishings";
import { MaterialsSlide } from "~/components/ProductPages/MaterialsSlide";
import { useAcabamentos } from "~/hooks/useAcabamentos";
import { useCoresRal } from "~/hooks/useColors";
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
      content: "Na Singula, os materiais não são apenas materiais — são os protagonistas da história! Temos metal que não teme nada, a cortiça que é tão natural que até pede licença para entrar, e o corian que brilha mais que um influencer. A madeira? Vem clássica, mas sai moderna. As cores, claro, dão aquele impacto final. E isso é só o começo — porque os espaços precisam mais do que o básico, precisam de design com personalidade.",
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
      />
      <BannerText text={data["materials-central-text"] as string} />
      <section className="bg-[#f5f5f5] pt-10 md:pt-16">
        <MaterialsSlide
          list={materiais}
          setModalContent={(content) =>
            setModalContent({
              title: content.title,
              img: content.img ?? "",
              text: content.text,
            })
          }
        />
      </section>
      <CoresRal
        text={data["materials-ral-colors-text"] as string}
        title={t("ral.title")}
        colors={cores}
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
