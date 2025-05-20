import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const HPL = ({ setModalContent }: { setModalContent: Function }) => {
  const [colors, setColors] = useState<
    { title: string; img: string; text?: string }[]
  >([]);

  useEffect(() => {
    if (colors.length === 0)
      fetch("/api/pt/hpl.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setColors(data));
  }, [colors]);

  return (
    <>
      {colors.length > 0 && (
        <section className="bg-white">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
            viewport={{ amount: 0.1 }}
          >
            <header className="relative py-20 px-10 md:px-40 md:py-40 bg-[url('/media/materials/hpl/background.jpg')]  ">
              <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
              <h3 className="relative text-4xl md:text-6xl font-bold text-white text-center z-20">
                COMPACTO HPL{" "}
                <span className="text-lg md:text-2xl">Fenólico</span>
              </h3>
              <p className="relative text-md mx-auto md:text-lg text-white py-10 md:w-2/3 z-20">
                O compacto HPL (High Pressure Laminate) é um material de alta
                resistência, composto por váriascamadas de papel kraft onde
                estas são impregnadas com resinas termoendurecíveis, prensadas
                sobalta pressão e temperatura. O resultado é um painel robusto,
                durável e extremamente versátil, idealpara ambientes exteriores
                e interiores.
                <br />
                <br />
                A sua superfície não porosa torna-o resistente à humidade,
                impactos, riscos e raios UV, garantindouma longevidade
                excecional com baixa manutenção. Além disso, permite um
                acabamento sofistica-do e minimalista, adaptando-se a diferentes
                aplicações no mobiliário urbano.
                <br />
                <br />
                Uma escolha funcional e estética, onde a inovação se alia à
                durabilidade.
              </p>
            </header>
            <ul className="px-10 md:px-40 list-none p-0 m-0 flex flex-row justify-between align-start flex-wrap w-full mt-20 md:mt-40">
              {colors.map((color) => (
                <li className="w-[23%] md:w-[18%] pb-8">
                  <span
                    onClick={() =>
                      color.text &&
                      setModalContent({
                        title: color.title,
                        img: color.img,
                        text: color.text,
                      })
                    }
                    style={{ backgroundImage: `url('${color.img}')` }} // Corrected line
                    className="border cursor-pointer w-full h-[5rem] md:h-[10rem] block rounded-2xl bg-cover bg-center" // Added bg-cover and bg-center for better image display
                  ></span>

                  <p className="text-black text-md md:text-xl w-full text-center py-4">
                    {color.title}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>
      )}
    </>
  );
};
