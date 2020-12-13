import I18n from "i18n-js";
import { Platform, NativeModules } from "react-native";

const normalizeTranslate = {
    en_US: "en_US",
    en: "en_US",
    pt_BR: "pt_BR",
    pt_US: "pt_BR",
};


I18n.translations = {
    en: require("./en-US"),
    pt_BR: require("./pt-BR"),
};


const getLanguage = () => {
    const majorVersionIOS = parseInt(Platform.Version, 10);

    let locale = null;
    if (Platform.OS === 'ios') {
        //https://github.com/facebook/react-native/issues/26540

        if (majorVersionIOS == 13) {
            locale = NativeModules.SettingsManager.settings.AppleLanguages[0];
        } else {
            locale = NativeModules.SettingsManager.settings.AppleLocale;
        }
    } else {
        locale = NativeModules.I18nManager.localeIdentifier;
    }

    return locale;
};

export const configureLanguageToi18n = () => {
    const language = getLanguage();
    console.log("###language=>",language);
    const translateNormalize = normalizeTranslate[language];
    const iHaveThisLanguage = I18n.translations.hasOwnProperty(translateNormalize);

    iHaveThisLanguage
        ? (I18n.locale = translateNormalize)
        : (I18n.defaultLocale = "pt_BR");

};

export const translate = (word) => {
    console.log("###word=>",word);
    console.log("###I18n=>",I18n.t(word));
  return  I18n.t(word);
}