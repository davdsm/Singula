import { MetaFunction } from "@remix-run/node";

import { Link } from "@remix-run/react";
import { AboutSingula } from "~/components/AboutSingula";
import { Banner } from "~/components/Banner";
import { DesignsComponent } from "~/components/DesignsComponent";
import { Loading } from "~/components/Elements/Loading";
import { SingulaStudio } from "~/components/SingulaStudio";
import { TitleEntry } from "~/components/TitleEntry";
import { Vision } from "~/components/Vision";
import { usePageContent } from "~/hooks/usePageContent";
import { useTeam } from "~/hooks/useTeam";

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
  const { data: aboutData, loading: aboutLoading } =
    usePageContent("Pagina_Sobre");
  const { team: teamData, loading: teamLoading } = useTeam();

  if (aboutLoading || teamLoading) return <Loading />;
  if (Object.keys(aboutData).length === 0 || Object.keys(teamData).length === 0)
    return <Loading />;

  return (
    <main>
      <TitleEntry text={aboutData["about-entry-title"] as string} />
      <AboutSingula
        text1={aboutData["about-singula-1"] as string}
        text2={aboutData["about-singula-2"] as string}
      />
      <DesignsComponent
        firstTitle={aboutData["about-1-design-title"] as string}
        firstText={aboutData["about-1-design-text"] as string}
        secondTitle={aboutData["about-2-design-title"] as string}
        secondText={aboutData["about-2-design-text"] as string}
        thirdTitle={aboutData["about-3-design-title"] as string}
        thirdText={aboutData["about-3-design-text"] as string}
        img={aboutData["about-design-img"] as string}
      />
      <Vision
        value1Title={aboutData["about-1-value-title"] as string}
        value2Title={aboutData["about-2-value-title"] as string}
        value3Title={aboutData["about-3-value-title"] as string}
        value1Text={aboutData["about-1-value-text"] as string}
        value2Text={aboutData["about-2-value-text"] as string}
        value3Text={aboutData["about-3-value-text"] as string}
      />
      <Banner
        url={aboutData["about-banner-img"][0] as string}
        className="w-full h-[20vh] md:h-[40vh] object-contain"
      />
      <SingulaStudio
        title={aboutData["about-team-title"] as string}
        subtitle={aboutData["about-team-subtitle"] as string}
        text={aboutData["about-team-text"] as string}
        members={teamData.map((member) => ({
          ...member,
          image: member.image ?? "",
        }))}
      />
    </main>
  );
};

export default About;
