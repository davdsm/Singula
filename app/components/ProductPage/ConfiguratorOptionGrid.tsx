import type { ReactNode } from "react";
import { Image } from "../Elements/Image";

export type ConfiguratorCardOption = {
  id: string;
  name: string;
  image: string | null;
  detail?: string | null;
};

type ConfiguratorOptionGridProps = {
  title: ReactNode;
  options: ConfiguratorCardOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** Tight grid and small tiles (e.g. RAL swatches), up to 8 per row on large screens. */
  density?: "default" | "compact";
  /** Image fit mode per option card. */
  imageFit?: "cover" | "contain";
};

/**
 * Same card pattern as subproduct pickers: image on top, name + optional detail, selected ring.
 */
export function ConfiguratorOptionGrid({
  title,
  options,
  selectedId,
  onSelect,
  density = "default",
  imageFit = "cover",
}: ConfiguratorOptionGridProps) {
  if (options.length === 0) return null;

  const compact = density === "compact";

  return (
    <div className="mb-8">
      <h3 className="text-black text-xl md:text-2xl font-bold mb-4">{title}</h3>
      <div
        className={
          compact
            ? "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5 sm:gap-2"
            : "grid grid-cols-2 md:grid-cols-4 gap-4"
        }
      >
        {options.map((opt) => {
          const selected = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`text-left border overflow-hidden transition-all ${
                compact ? "rounded-lg" : "rounded-2xl"
              } ${
                selected
                  ? compact
                    ? "border-singula-main ring-1 ring-singula-main/40"
                    : "border-singula-main ring-2 ring-singula-main/30"
                  : "bg-white text-black border-[#D2D2D2] hover:border-black"
              }`}
            >
              <div className="w-full h-full bg-white">
                {opt.image ? (
                  <Image
                    src={opt.image}
                    alt={opt.name}
                    className={
                      compact
                        ? `w-full aspect-square max-h-14 sm:max-h-16 ${imageFit === "contain" ? "object-contain" : "object-cover"}`
                        : `w-full h-32 md:h-44 ${imageFit === "contain" ? "object-contain" : "object-cover"}`
                    }
                  />
                ) : (
                  <div
                    className={
                      compact
                        ? "w-full aspect-square max-h-14 sm:max-h-16 bg-[#F5F5F5]"
                        : "w-full h-32 md:h-44 bg-[#F5F5F5]"
                    }
                  />
                )}
                <div className={compact ? "p-1 sm:p-1.5" : "p-3 md:p-4"}>
                  <p
                    className={`text-black font-semibold uppercase leading-tight ${
                      compact
                        ? "text-[9px] sm:text-[10px] line-clamp-2"
                        : "text-sm md:text-base font-bold"
                    }`}
                  >
                    {opt.name}
                  </p>
                  {opt.detail ? (
                    <p
                      className={`text-gray-500 mt-0.5 uppercase line-clamp-1 ${
                        compact
                          ? "text-[8px] sm:text-[9px] font-[Arial]"
                          : "text-xs md:text-sm mt-1 font-[Arial]"
                      }`}
                    >
                      {opt.detail}
                    </p>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
