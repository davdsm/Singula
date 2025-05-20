import { Categories } from "~/components/Categories";
import { AboutSection } from "~/components/CenterText";
import { DesignsSlide } from "~/components/DesignsSlide";
import { Hero } from "~/components/Hero";
import { PhotoSlider } from "~/components/PhotoSlider";

export const Index = () => {
  return (
    <main>
      <Hero />
      <AboutSection />
      <PhotoSlider />
      <Categories />
      <DesignsSlide />
    </main>
  );
};

export default Index;
