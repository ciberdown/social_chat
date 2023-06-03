import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as MyLink, useNavigate } from "react-router-dom";
import Mode from "../mode/mode";
import { useSelector } from "react-redux";
import { getStyles } from "../../styles/theme";
import { registerWithEmailAndPassword } from "./firebaseSignUp";
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MUI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const navigate = useNavigate()
  const mode: "light" | "dark" = useSelector((state: any) => state.Mode.mode);
  const styles = getStyles(mode);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name: string =
      (data.get("firstName") as string) + " " + data.get("lastName");
    const email: string = data.get("email") as string;
    const pass: string = data.get("password") as string;
    registerWithEmailAndPassword(name, email, pass, navigate);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          ml: 44,
        }}
      >
        <Mode />
      </Box>
      <Box sx={styles.freeBoxSignUp}>
        <Avatar sx={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          fontWeight="bold"
          variant="h5"
          color={mode === "dark" ? "secondary.main" : "primary.main"}
        >
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                color={mode === "dark" ? "secondary" : "primary"}
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                color={mode === "dark" ? "secondary" : "primary"}
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                color={mode === "dark" ? "secondary" : "primary"}
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                color={mode === "dark" ? "secondary" : "primary"}
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              fontSize: "1rem",
              fontWeight: "bold",
              bgcolor: `${mode}` === "dark" ? "secondary.main" : "primary.main",
              color: `${mode}` === "dark" ? "black" : "white",
            }}
            color="primary"
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <MyLink style={styles.mylink} to="/">
                Already have an account? Sign in
              </MyLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
