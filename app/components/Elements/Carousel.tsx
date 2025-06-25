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
  const [Stopped, setStopped] = useState<boolean>(false);

  // Helper to start the autoplay interval
  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!api) return;

      if (api.canScrollNext()) {
        api.scrollNext();
      } else if (loop) {
        api.scrollTo(0);
      }
    }, autoplayInterval * 1000);
  };

  // Wait for API and autoplay to be active before starting interval
  useEffect(() => {
    if (!api || !autoplay) return;

    if (!Stopped) {
      startAutoplay();
    }

    const handleSelect = () => {
      if (autoplay && !Stopped) {
        startAutoplay(); // Reset the interval on manual swipe
      }
    };

    api.on("select", handleSelect);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      api.off("select", handleSelect);
    };
  }, [api, autoplay, autoplayInterval, loop, Stopped]);

  return (
    <Carousel
      opts={{ align: "center", loop }}
      setApi={setApi}
      className={`carousel w-full mx-auto ${className}`}
      onMouseEnter={() => setStopped(true)}
      onMouseLeave={() => setStopped(false)}
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
