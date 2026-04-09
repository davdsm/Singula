import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel";
import type { EmblaOptionsType } from "embla-carousel";

interface CarouselProps {
  items: React.ReactNode[];
  arrows?: boolean;
  className?: string;
  itemClassName?: string;
  /** Inline slide sizing (e.g. `{ flex: "0 0 90vw" }`) — wins over Tailwind if anything conflicts. */
  itemStyle?: React.CSSProperties;
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number; // in seconds
  /** Merged into Embla options (align / loop still default unless overridden). */
  emblaOpts?: Partial<EmblaOptionsType>;
  /** Embla viewport; use e.g. `overflow-visible` to show adjacent slides past the viewport box. */
  viewportClassName?: string;
  /**
   * When true, arrows sit inside the carousel edges (with z-index).
   * Default places them outside (-left-12 / -right-12), which clips on full-bleed w-screen layouts.
   */
  arrowsInset?: boolean;
}

export const CarouselComponent = ({
  items,
  arrows,
  className,
  itemClassName,
  itemStyle,
  loop = false,
  autoplay = false,
  autoplayInterval = 3,
  emblaOpts,
  viewportClassName,
  arrowsInset = false,
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
      opts={{ align: "center", loop, ...emblaOpts }}
      setApi={setApi}
      viewportClassName={viewportClassName}
      className={`carousel w-full mx-auto ${className}`}
      onMouseEnter={() => setStopped(true)}
      onMouseLeave={() => setStopped(false)}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            style={itemStyle}
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
          <CarouselPrevious
            className={
              arrowsInset
                ? "left-2 top-1/2 z-30 -translate-y-1/2 shadow-md sm:left-4"
                : undefined
            }
          />
          <CarouselNext
            className={
              arrowsInset
                ? "right-2 top-1/2 z-30 -translate-y-1/2 shadow-md sm:right-4"
                : undefined
            }
          />
        </>
      )}
    </Carousel>
  );
};
