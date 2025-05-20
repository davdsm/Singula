import { motion } from "framer-motion";
import { MainColor } from "../Elements/Colors/main";
import { TeamMember } from "./TeamMember";

export const SingulaStudio = () => {
  const members = [
    {
      name: "Hugo Silva",
      img: "/media/about/office.png",
      role: "Mechanical Engineer",
      text: "Licenciado em Engenharia Mecânica e fluente em milímetros. Fez carreira entre ventilações industriais e serralharia mecânica — mas é na precisão que se sente leve. Na Singula, é o especialista que faz com que tudo funcione. Por dentro, por fora, e até nos bastidores. Se uma peça vacila, ele sorri. Já resolveu coisas bem mais teimosas. Não precisa de falar alto. O metal já o conhece.",
    },
    {
      name: "André Vieira",
      img: "/media/about/office.png",
      role: "Product Designer",
      text: "O traço é firme. A visão, inquieta. Desenha como quem conta histórias. Com formação em Ilustração Gráfica, licenciatura em Design e mestrado Design de Produto, André desenha com uma pergunta em mente: “E se fosse diferente?” Passou por automatismos, domótica e mobiliário — e em cada área, aprendeu a escutar o que o produto não diz. Na Singula, é o responsável criativo de cada produto. É provocador, direto, emocional — e não descansa até dar forma a algo que mereça ser olhado duas vezes.",
    },
    {
      name: "Pedro Fernandes",
      img: "/media/about/office.png",
      role: "Industrial Engineer",
      text: "Quando o mundo exige lógica, ele responde com engenharia.Licenciado em Engenharia Industrial, Pedro é o equilíbrio entre a visão criativa e a execução sem falhas. Vê nos processos uma forma de arte — e na eficiência, um desafio pessoal. Trabalhou em produção, planeamento, qualidade e desenvolvimento de produto. Conhece a linha que une uma boa ideia a um produto viável. Na Singula, transforma planos em peças reais, com uma precisão quase obsessiva. É metódico, exigente, mas sempre com o olhar no todo.",
    },
  ];

  return (
    <section className="px-10 py-20 md:px-60 md:py-40">
      <motion.header
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
        viewport={{ amount: 0.3 }}
      >
        <h1 className="font-bold text-4xl md:text-7xl text-white uppercase pb-10">
          Singula <MainColor>Studio</MainColor>
        </h1>
      </motion.header>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
        viewport={{ amount: 0.3 }}
        className="font-bold text-lg w-full md:text-2xl text-white"
      >
        Onde o design provoca. E a engenharia não pede desculpa. <br /> <br />
        Tudo começa com a visão irreverente de{" "}
        <MainColor>André Vieira</MainColor>, Designer de Produto que prefere
        rasgar o manual a segui-lo. Cada peça nasce com um objetivo claro: ser
        tudo menos comum — visual, funcional e emocional. Depois entra a dupla
        de precisão cirúrgica: <MainColor>Hugo Silva</MainColor> e{" "}
        <MainColor>Pedro Fernandes</MainColor>. Engenheiros de formação.
        Inconformados por vocação. São eles que transformam ideias arrojadas em
        estruturas sérias. E sim, usam a régua.
      </motion.p>
      <div className="flex flex-col w-full gap-4 py-20">
        {members.map(({ name, role, text, img }, index) => (
          <TeamMember
            image={img}
            name={name}
            role={role}
            text={text}
            index={index}
            inverted={index === 1}
          />
        ))}
      </div>
    </section>
  );
};
