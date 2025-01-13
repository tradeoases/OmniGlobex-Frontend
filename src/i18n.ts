import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) 
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    fallbackLng: 'en', 
    supportedLngs: ['en', 'es', 'ar', 'de', 'he', 'ko', 'pt', 'zh-Hans', 'zh-Hant'],
    backend: {
        loadPath: '/src/locales/{{lng}}.json'
    },
    interpolation: {
      escapeValue: false 
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
    },
  });

export default i18n;
