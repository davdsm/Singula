import { Fragment } from "react/jsx-runtime";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MainColor } from "./Elements/Colors/main";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseTextWithMainColor = (text: string): React.ReactNode[] => {
  const parts = text.split(/(<red>.*?<\/red>)/g); // split by <red>...</red>

  return parts.map((part, i) => {
    if (part.startsWith("<red>") && part.endsWith("</red>")) {
      const content = part.slice(5, -6);
      return <MainColor key={`color-singula-${i}`}>{content}</MainColor>;
    }
    return <Fragment key={`color-normal-${i}`}>{part}</Fragment>;
  });
};
