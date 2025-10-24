import { createTheme } from "@mui/material/styles";
import { faIR, enUS } from "@mui/material/locale";

export const getTheme = (lang: string) => {
  const isFa = lang === "fa";
  return createTheme(
    {
      direction: isFa ? "rtl" : "ltr",
      typography: {
        fontFamily: isFa ? "Vazirmatn, sans-serif" : "Roboto, sans-serif",
      },
    },
    isFa ? faIR : enUS
  );
};
