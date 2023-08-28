import i18next from "i18next";
import {initReactI18next} from "react-i18next";

import ENTranslation from "../i18n/en/translation.json";
import IDTranslation from "../i18n/id/translation.json";

const resources = {
    en: {
        translation: ENTranslation,
    },
    id: {
        translation: IDTranslation,
    }
}

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;
