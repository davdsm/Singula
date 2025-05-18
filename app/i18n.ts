// src/i18n.ts
import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Initialize i18next
i18next
  .use(HttpApi) // Loads translations from server
  .use(LanguageDetector) // Detects the language
  .use(initReactI18next) // React integration
  .init({
    fallbackLng: "en", // Default language
    supportedLngs: ["en", "pt"], // List of supported languages
    detection: {
      order: ["cookie", "localStorage", "navigator"],
      caches: ["cookie"], // Language preference is stored in a cookie
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Path to translation files
    },
    react: {
      useSuspense: false, // Disables React Suspense
    },
  });

export default i18next;
