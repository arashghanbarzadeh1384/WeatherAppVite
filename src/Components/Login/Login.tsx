import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TranslateIcon from "@mui/icons-material/Translate";
import { useForm, type SubmitHandler,  } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({ mode: "onBlur" });

  const navigate = useNavigate();

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "fa" ? "en" : "fa");
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(t("successLogin"));
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 360,
          borderRadius: 3,
        }}
      >
        <Box sx={{ alignSelf: "flex-end" }}>
          <IconButton onClick={changeLanguage}>
            <TranslateIcon />
          </IconButton>
        </Box>

        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          {t("signin")}
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            fullWidth
            label={t("email")}
            autoComplete="email"
            autoFocus
            {...register("email", {
              required: t("email") + " is required",
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            margin="normal"
            fullWidth
            label={t("password")}
            type="password"
            autoComplete="current-password"
            {...register("password", {
              required: t("password") + " is required",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? `${t("signin")}...` : t("signin")}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
