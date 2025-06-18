import { Product } from "~/hooks/interfaces";
import { CarouselComponent } from "../Elements/Carousel";
import { CategoryCard } from "./Card";
import { Title } from "./Title";

import "./index.scss";

export const Categories = ({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) => {
  return (
    <section
      id="categories-carousel"
      className="flex flex-col justify-start w-full h-full md:pt-40 overflow-hidden"
    >
      <Title text={title} />
      <CarouselComponent
        itemClassName="basis-3/4 md:basis-1/4"
        className="w-full px-10 md:px-60 py-10 md:py-20 w-full md:w-[135%]"
        autoplay
        loop
        items={products.map((item, index) => (
          <CategoryCard
            key={item.id}
            title={item.name}
            design={item.design || ''}
            link={item.link}
            image={item.ImagemPrincipal || ''} 
            index={index}
          />
        ))}
      />
    </section>
  );
};
