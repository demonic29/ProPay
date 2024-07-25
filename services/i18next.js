import i18next from "i18next";
import {initReactI18next} from 'react-i18next'
import en from '../locales/en.json'
import ja from '../locales/ja.json'
// import { fallbacks } from "i18n-js";
// import { translations } from "i18n-js";

export const languageResources = {
    en : {translation : en},
    ja : {translation : ja}
} 

i18next.use(initReactI18next).init({
    compatibilityJSON : 'v3',
    lng : 'en',
    fallbacks : 'en',
    resources : languageResources
})

export default i18next