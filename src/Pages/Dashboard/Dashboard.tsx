import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  iconUrl: string;
}

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeLanguage = () => {
    const newLang = i18n.language === "fa" ? "en" : "fa";
    i18n.changeLanguage(newLang);
    document.dir = newLang === "fa" ? "rtl" : "ltr";
  };

  const getBackgroundVideo = (condition: string) => {
    const cond = condition.toLowerCase();
    if (cond.includes("clear")) return "/videos/clear.mp4";
    if (cond.includes("cloud")) return "/videos/clouds.mp4";
    if (cond.includes("haze") || cond.includes("mist"))
      return "/videos/haze.mp4";
    if (cond.includes("rain") || cond.includes("drizzle"))
      return "/videos/rain.mp4";
    if (cond.includes("snow")) return "/videos/snow.mp4";
    if (cond.includes("thunder") || cond.includes("storm"))
      return "/videos/thunderstorm.mp4";
    return "/videos/clear.mp4";
  };

  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const apiKey = "b4fdfbac8dbd3c563adf3bd5f71d6d3a";
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: apiKey,
            units: "metric",
            lang: i18n.language,
          },
        }
      );

      const data = res.data;
      const w: WeatherData = {
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].description,
        iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      };
      setWeather(w);
    } catch (err: any) {
      setError(t("City not found"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        overflow: "hidden",
      }}
    >
      {weather && (
        <video
          src={getBackgroundVideo(weather.condition)}
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
      )}

      <Box sx={{ alignSelf: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<TranslateIcon />}
          onClick={changeLanguage}
        >
          {i18n.language === "fa" ? "English" : "فارسی"}
        </Button>
      </Box>

      <Typography
        variant="h4"
        sx={{ mb: 2, color: "#fff", textShadow: "1px 1px 4px #000" }}
      >
        {t("dashboard")}
      </Typography>

      <Paper
        sx={{
          p: 3,
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          borderRadius: 3,
          backgroundColor: "rgba(255,255,255,0.8)",
        }}
        elevation={4}
      >
        <TextField
          label={t("Enter city")}
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleSearch}
          disabled={loading}
        >
          {t("Search")}
        </Button>

        {loading && <CircularProgress />}

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        {weather && (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="h5">{weather.city}</Typography>
            <img src={weather.iconUrl} alt={weather.condition} />
            <Typography variant="h4">{weather.temperature}°C</Typography>
            <Typography variant="subtitle1">{weather.condition}</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
