import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translations from "./translation.json";

export const resources = {
  English: {
    translation: translations.English,
  },
  Nepali: {
    translation: translations.Nepali,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "English",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
