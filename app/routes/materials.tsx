import { useState } from "react";
import { About } from "~/components/ProductPages/About";
import { BannerText } from "~/components/ProductPages/BannerText";
import { CoresRal } from "~/components/ProductPages/CoresRal";
import { ProductPageEntry } from "~/components/ProductPages/Entry";
import { Finishings } from "~/components/ProductPages/Finishings";
import { HPL } from "~/components/ProductPages/HPL";
import { Modal } from "~/components/ProductPages/Modal";

export const Materials = () => {
  const [ModalContent, setModalContent] = useState<{
    title: string;
    img: string;
    text: string;
  }>({
    title: "",
    img: "",
    text: "",
  });

  return (
    <main className="bg-white">
      <ProductPageEntry img="/media/materials/entry.png" title="Materials" />
      <About setModalContent={setModalContent} />
      <BannerText />
      <CoresRal />
      <HPL setModalContent={setModalContent} />
      <Finishings />
      {ModalContent.title.length > 0 && (
        <Modal
          title={ModalContent.title}
          img={ModalContent.img}
          text={ModalContent.text}
          close={() => setModalContent({ title: "", img: "", text: "" })}
        />
      )}
    </main>
  );
};

export default Materials;
