import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const CoresRal = () => {
  const [colors, setColors] = useState<{ title: string; color: string }[]>([]);

  useEffect(() => {
    if (colors.length === 0)
      fetch("/api/pt/ralColors.json", {
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
        <section className="bg-white w-[90%] m-auto py-20 md:px-40 md:pt-40 md:w-full">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
            viewport={{ amount: 0.1 }}
          >
            <header>
              <h3 className="text-4xl md:text-6xl font-bold text-black text-center">
                CORES RAL{" "}
                <span className="text-lg md:text-2xl">recomendamos</span>
              </h3>
              <p className="text-md mx-auto md:text-lg text-black py-10 md:w-2/3">
                As cores RAL constituem um sistema padrão de cores amplamente
                utilizado na indústria, arquitetura e design. Originalmente
                desenvolvido na Alemanha, o sistema atribui a cada cor um código
                numérico único, facilitando a comunicação e a especificação
                exata das tonalidades em projetos e produções.
                <br />
                <br />
                Essa padronização garante uniformidade e consistência na
                reprodução das cores, permitindo que designers, fabricantes e
                clientes obtenham resultados precisos e de alta qualidade em
                seus produtos e aplicações.
                <br />
                <br />
                As cores apresentadas bla bla bla......
              </p>
            </header>
            <ul className="list-none p-0 m-0 flex flex-row justify-between align-start flex-wrap w-full">
              {colors.map((color) => (
                <li className="w-[23%] md:w-[18%] pb-8">
                  <span
                    style={{ backgroundColor: color.color }}
                    className={`bg-[${color.color}] w-full h-[5rem] md:h-[10rem] block rounded-2xl`}
                  ></span>

                  <p className="text-black text-md md:text-xl w-full text-center py-4">{color.title}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>
      )}
    </>
  );
};
