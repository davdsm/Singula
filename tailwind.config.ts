import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        phenomena: ["Phenomena", "sans-serif"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        singula: {
          main: "#F1585E",
          white: "#FFFFFF",
          black: "#121212",
          realBlack: "#000000",
          lightGray: "#f5f5f5",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
