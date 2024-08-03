import i18next from "i18next";
import {initReactI18next} from 'react-i18next';

// faq
import enFaq from '../locales/en/enFaq.json'
import jaFaq from '../locales/ja/jaFaq.json'

// setting 
const resources = {
    en : {
        translation : enFaq,
    },
    ja : {
        translation : jaFaq,
    }
}

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    debug: false, // Set to true for debugging
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18next;