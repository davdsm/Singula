import { Categories } from "~/components/Categories";
import { AboutSection } from "~/components/CenterText";
import { DesignsSlide } from "~/components/DesignsSlide";
import { Hero } from "~/components/Hero";
import { PhotoSlider } from "~/components/PhotoSlider";
import { usePageContent } from "~/hooks/usePageContent";

export const Index = () => {
  const { data, loading } = usePageContent("Pagina_Inicial");

  if (loading) return <p>Loading...</p>;
  if (Object.keys(data).length === 0) return <p>Loading...</p>;

  return (
    <main className="overflow-x-hidden">
      <Hero
        img={data["home-slide-img"][0]}
        text={data["home-slide-text"] as string}
      />
      <AboutSection text={data["home-about-text"] as string} />
      <PhotoSlider imgs={data["home-carousel-imgs"] as string[]} />
      <Categories title={data["home-categories-text"] as string} />
      <DesignsSlide imgs={data["home-design-imgs"] as string[]} />
    </main>
  );
};

export default Index;
