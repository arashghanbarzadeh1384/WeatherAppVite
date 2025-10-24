import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: { escapeValue: false },
    resources: {
      en: {
        translation: {
          signin: "Sign In",
          email: "Email Address",
          password: "Password",
          successLogin: "Login successful!",
          dashboard: "Weather Dashboard",
          logout: "Logout",
          "Enter city": "Enter city",
          Search: "Search",
          "City not found": "City not found",
        },
      },
      fa: {
        translation: {
          signin: "ورود",
          email: "ایمیل",
          password: "رمز عبور",
          successLogin: "ورود با موفقیت انجام شد!",
          dashboard: "داشبورد آب‌وهوا",
          logout: "خروج",
          "Enter city": "نام شهر را وارد کنید",
          Search: "جستجو",
          "City not found": "شهر پیدا نشد",
        },
      },
    },
  });

export default i18n;
