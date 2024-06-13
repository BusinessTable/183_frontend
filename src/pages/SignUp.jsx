import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { register as PH_register } from "../functions/passwordHandler";
import useAuth from "../hooks/useAuth";
import zxcvbn from "zxcvbn";

const defaultTheme = createTheme();

export default function SignUp() {
  const { authed, login } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [passwordStrength, setPasswordStrength] = React.useState(0);

  React.useEffect(() => {
    if (authed) {
      navigate("/dashboard");
    }
  }, [authed, navigate]);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const passwordStrengthResult = zxcvbn(newPassword);
    setPasswordStrength(passwordStrengthResult.score);

    if (passwordStrengthResult.score < 3) {
      setPasswordError(
        "Password is too weak. Please choose a stronger password."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (passwordStrength < 3) {
      return;
    }

    const data = new FormData(event.currentTarget);

    await PH_register(data.get("userName"), data.get("masterPassword"))
      .then((response) => {
        let { token, expiresIn } = response.data;
        login({ token: token, expiresIn: expiresIn, MP: data.get("masterPassword") });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField required fullWidth id="userName" label="User Name" name="userName" autoComplete="username" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="masterPassword"
                  label="Master Password"
                  type="password"
                  id="masterPassword"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={passwordError !== ""}
                  helperText={passwordError}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={passwordStrength < 3}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
