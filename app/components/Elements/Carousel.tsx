import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel";

interface CarouselProps {
  items: React.ReactNode[];
  arrows?: boolean;
  className?: string;
  itemClassName?: string;
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number; // in seconds
}

export const CarouselComponent = ({
  items,
  arrows,
  className,
  itemClassName,
  loop = false,
  autoplay = false,
  autoplayInterval = 3,
}: CarouselProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Wait for API and autoplay to be active before starting interval
  useEffect(() => {
    if (!autoplay || !api) return;

    intervalRef.current = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else if (loop) {
        api.scrollTo(0);
      }
    }, autoplayInterval * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [api, autoplay, autoplayInterval, loop]);

  return (
    <Carousel
      opts={{ align: "start", loop }}
      setApi={setApi}
      className={`carousel w-full mx-auto ${className}`}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className={
              itemClassName
                ? itemClassName
                : "basis-1/2 md:basis-1/2 lg:basis-1/3 rounded"
            }
          >
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>

      {arrows && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};
