import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationRU from "../locales/ru/translation.json";

export default i18n
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      resources: {
         ru: { translation: translationRU },
      },
      fallbackLng: "ru",
      interpolation: {
         escapeValue: false,
      },
   });
