import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Mode from "../mode/mode";
import { Link as MyLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStyles } from "../../styles/theme";
import Link from "@mui/material/Link";
import { useState } from "react";
import { logInWithEmailAndPassword } from "./firebaseSignIn";
import { State } from "../../app/interfaces/interfaces";
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

export default function SignInSide() {
  const checkboxRef = React.useRef<boolean>(false);
  const [errorTxt, setErrorTxt] = useState<string>("");
  const [remmebered_email, set_remmebered_email] = useState<string | null>(
    localStorage.getItem("userInfo_user")
  );
  const [remmebered_pass, set_remmebered_pass] = useState<string | null>(
    localStorage.getItem("userInfo_pass")
  );
  const mode = useSelector((state: State) => state.Mode.mode);
  const navigate = useNavigate();
  const styles = getStyles(mode);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (checkboxRef.current) {
      localStorage.setItem("userInfo_user", data.get("email") as string);
      localStorage.setItem("userInfo_pass", data.get("password") as string);
    }
    logInWithEmailAndPassword(
      data.get("email") as string,
      data.get("password") as string,
      setErrorTxt,
      navigate
    );
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} sx={styles.grid} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        sx={{ backgroundColor: mode === "dark" ? "black" : "white" }}
        component={Paper}
        elevation={6}
        square
      >
        <Box sx={styles.freeBoxSignIn}>
          <Box sx={{ alignSelf: "end", mb: 8 }}>
            <Mode />
          </Box>

          <Avatar
            sx={{
              m: 1,
              bgcolor: mode === "dark" ? "secondary.main" : "primary.main",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            fontWeight="bold"
            variant="h5"
            color={mode === "dark" ? "secondary.main" : "primary.main"}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color={mode === "dark" ? "secondary" : "primary"}
              sx={styles.textField}
              defaultValue={remmebered_email}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              id="password"
              autoComplete="current-password"
              color={mode === "dark" ? "secondary" : "primary"}
              sx={styles.textField}
              defaultValue={remmebered_pass}
            />

            <FormControlLabel
              control={
                <Checkbox
                  onClick={() => {
                    checkboxRef.current =
                      checkboxRef.current === false ? true : false;
                    console.log(checkboxRef.current);
                  }}
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <MyLink to="/" style={styles.mylink}>
                  Forgot password?
                </MyLink>
              </Grid>
              <Grid item>
                <MyLink to="/signup" style={styles.mylink}>
                  Don't have an account? Sign Up
                </MyLink>
              </Grid>
            </Grid>
            <Typography
              align="center"
              sx={{ color: "red", fontSize: "1.1rem" }}
              mt={3}
            >
              {errorTxt}
            </Typography>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
