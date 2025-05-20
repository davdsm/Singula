import { MetaFunction } from "@remix-run/node";

import { Link } from "@remix-run/react";
import { AboutSingula } from "~/components/AboutSingula";
import { Banner } from "~/components/Banner";
import { DesignsComponent } from "~/components/DesignsComponent";
import { SingulaStudio } from "~/components/SingulaStudio";
import { TitleEntry } from "~/components/TitleEntry";
import { Vision } from "~/components/Vision";

export const meta: MetaFunction = () => {
  return [
    { title: "Sobre Nós - Singula" },
    {
      name: "description",
      content: "Somos design e engenharia, somos a história nunca contada.",
    },
  ];
};

export const About = () => {
  return (
    <main>
      <TitleEntry />
      <AboutSingula />
      <DesignsComponent />
      <Vision />
      <Banner url="/media/about/office.png" className="w-full h-[40vh] md:h-[60vh] object-cover" />
      <SingulaStudio />
    </main>
  );
};

export default About;
