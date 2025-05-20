import { CarouselComponent } from "../Elements/Carousel";
import { CategoryCard } from "./Card";
import { Title } from "./Title";

import "./index.scss";

export const Categories = () => {
  return (
    <section
      id="categories-carousel"
      className="flex flex-col justify-start w-full h-full md:pt-40 overflow-hidden"
    >
      <Title />
      <CarouselComponent
        itemClassName="basis-3/4 md:basis-1/4"
        className="w-full px-10 md:px-60 py-10 md:py-20 w-full md:w-[135%]"
        autoplay
        loop
        items={[
          <CategoryCard
            title="Delimitadores Ero"
            design="Garden"
            link=""
            image="/media/home/garden.jpg"
            index={1}
          />,
          <CategoryCard
            title="Delimitadores Ero"
            design="Street"
            link=""
            image="/media/home/street.jpg"
            index={2}
          />,
          <CategoryCard
            title="Delimitadores Ero"
            design="Home"
            link=""
            image="/media/home/home.jpg"
            index={3}
          />,
          <CategoryCard
            title="Delimitadores Ero"
            design="Garden"
            link=""
            image="/media/home/garden.jpg"
            index={1}
          />,
          <CategoryCard
            title="Delimitadores Ero"
            design="Street"
            link=""
            image="/media/home/street.jpg"
          />,
          <CategoryCard
            title="Delimitadores Ero"
            design="Home"
            link=""
            image="/media/home/home.jpg"
          />,
          <CategoryCard
            title="Delimitadores Ero"
            design="Garden"
            link=""
            image="/media/home/garden.jpg"
          />,
          <CategoryCard
            title="Delimitadores Ero"
            design="Street"
            link=""
            image="/media/home/street.jpg"
          />,
          <CategoryCard
            title="Delimitadores Ero"
            design="Home"
            link=""
            image="/media/home/home.jpg"
          />,
        ]}
      />
    </section>
  );
};
