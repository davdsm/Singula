import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Image } from "../Elements/Image";
import { cn } from "../utils";

export type VariationSelectOption = {
  id: string;
  name: string;
  image: string | null;
};

type VariationAttributeSelectProps = {
  options: VariationSelectOption[];
  value: string;
  onChange: (id: string) => void;
  "aria-label": string;
  disabled?: boolean;
};

export function VariationAttributeSelect({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
  disabled,
}: VariationAttributeSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});

  const selected = options.find((o) => o.id === value);

  const close = useCallback(() => setOpen(false), []);

  const updatePosition = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const margin = 4;
    const maxH = Math.min(192, Math.max(120, window.innerHeight - r.bottom - margin - 16));
    setPanelStyle({
      position: "fixed",
      top: r.bottom + margin,
      left: r.left,
      width: Math.max(r.width, 200),
      maxHeight: maxH,
      zIndex: 9999,
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const onScroll = () => updatePosition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (rootRef.current?.contains(t)) return;
      if (panelRef.current?.contains(t)) return;
      close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!options.length) {
    return <span className="text-gray-400">-</span>;
  }

  if (options.length === 1) {
    const only = options[0];
    return (
      <div className="flex items-center gap-2 min-w-0 max-w-[200px]">
        {only.image ? (
          <Image
            src={only.image}
            alt=""
            className="w-9 h-9 rounded-md object-cover border border-[#E5E5E5] shrink-0"
          />
        ) : (
          <span className="w-9 h-9 rounded-md border border-[#E5E5E5] bg-[#FAFAFA] shrink-0" />
        )}
        <span className="text-sm font-medium text-black truncate">{only.name}</span>
      </div>
    );
  }

  const panel =
    open &&
    typeof document !== "undefined" &&
    createPortal(
      <ul
        ref={panelRef}
        id={listId}
        role="listbox"
        style={panelStyle}
        className="overflow-y-auto rounded-lg border border-[#E5E5E5] bg-white text-black shadow-lg py-1"
      >
        {options.map((opt) => (
          <li key={opt.id} role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={opt.id === value}
              className={cn(
                "flex items-center gap-2 w-full px-2 py-2 text-left text-sm text-black hover:bg-[#F5F5F5]",
                opt.id === value && "bg-[#FAFAFA]"
              )}
              onClick={() => {
                onChange(opt.id);
                close();
              }}
            >
              {opt.image ? (
                <Image
                  src={opt.image}
                  alt=""
                  className="w-8 h-8 rounded object-cover border border-[#E5E5E5] shrink-0"
                />
              ) : (
                <span className="w-8 h-8 rounded border border-[#E5E5E5] bg-[#FAFAFA] shrink-0" />
              )}
              <span className="truncate text-black">{opt.name}</span>
            </button>
          </li>
        ))}
      </ul>,
      document.body
    );

  return (
    <>
      <div ref={rootRef} className="relative min-w-[140px] max-w-[220px]">
        <button
          ref={buttonRef}
          type="button"
          disabled={disabled}
          aria-label={ariaLabel}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? listId : undefined}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex items-center gap-2 w-full text-left text-black border border-[#D2D2D2] rounded-lg px-2 py-1.5 bg-white hover:bg-[#FAFAFA] transition-colors",
            disabled && "opacity-50 pointer-events-none"
          )}
        >
          {selected?.image ? (
            <Image
              src={selected.image}
              alt=""
              className="w-9 h-9 rounded-md object-cover border border-[#E5E5E5] shrink-0"
            />
          ) : (
            <span className="w-9 h-9 rounded-md border border-[#E5E5E5] bg-[#FAFAFA] shrink-0" />
          )}
          <span className="text-sm font-medium text-black truncate flex-1">
            {selected?.name ?? "—"}
          </span>
          <span className="text-xs text-black shrink-0 opacity-60" aria-hidden>
            ▾
          </span>
        </button>
      </div>
      {panel}
    </>
  );
}
