import { Button } from "../Elements/Button";
import { Image } from "../Elements/Image";

export const CatalogComponent = () => {
  return (
    <section className="flex justify-between items-start gap-10 px-10 w-full h-full items-center py-40 md:mt-10 flex-col-reverse md:flex-row md:px-40 md:py-40">
      <div className="w-full md:w-1/2">
        <p  className="text-2xl md:text-4xl font-bold text-singula-main text-left">Singula Street Design Vol. 1</p>
        <h1 className="text-3xl md:text-7xl font-black text-left py-2 pb-4 md:pb-8">Descarregar Catálogo</h1>
        <p className="text-lg md:text-2xl md:leading-[2rem] text-white font-normal pb-8 md:pb-10">
          Não é catálogo. É convite. Para ver a cidade sem limite. Linhas cruas,
          ângulos que insistem. Peças que não pedem — existem. É aço com alma,
          traço com intenção, forma que fala antes da função. Um silêncio
          desenhado em plena estrutura, onde até a sombra ganha outra altura. E
          quando olhares a cidade com mais atenção, verás que o design é a
          verdadeira revolução. Faz o download. Há quem leve a cidade às costas,
          tu levas em PDF.
        </p>
        <Button to="#" firstText="Catálogo" secondText="Download" />
      </div>
      <div className="w-full md:w-1/2 flex justify-start md:justify-end items-center">
        <Image
          src="media/catalog/catalog.jpg"
          alt="Catálogo Singula"
          className="w-[70%] h-[30vh] md:h-[60vh] rounded-xl object-contain bg-white p-4 md:p-10"
        />
      </div>
    </section>
  );
};
