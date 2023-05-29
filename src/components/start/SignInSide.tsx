import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Mode from "../mode/mode";
import { Link as MyLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { lightColor, lightBgColor } from "../../styles/theme";
import { Theme } from "@mui/material";

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
  const mode = useSelector((state: any) => state.Mode.mode);
  const styles = {
    mylink: {
      color: `${mode}` === "dark" ? "white" : `${lightColor}`,
      textDecoration: "none",
    },
    submit: { mt: 3, mb: 2, fontWeight: "bolder", fontSize: "1rem" },
    grid: {
      backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
      backgroundRepeat: "no-repeat",
      backgroundColor: (t: Theme) =>
        t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    freeBox: {
      my: 2,
      mx: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    textField:{bgcolor:`${mode}` === 'dark'?'none':lightBgColor}
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
        sx={{ backgroundColor: mode === "dark" ? "black" :  'white'}}
        component={Paper}
        elevation={6}
        square
      >
        <Box sx={styles.freeBox}>
          <Box sx={{ alignSelf: "end", mb: 8 }}>
            <Mode />
          </Box>

          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
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
              sx={styles.textField}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              id="password"
              autoComplete="current-password"
              sx={styles.textField}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
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
                  "Don't have an account? Sign Up"
                </MyLink>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
