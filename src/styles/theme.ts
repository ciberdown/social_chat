import { red, blue, orange, grey } from "@mui/material/colors";
import "@fontsource/open-sans";
import "@fontsource/open-sans/400.css"; // Specify weight
import "@fontsource/open-sans/400-italic.css"; // Specify weight and style
import { Theme } from "@mui/material";
import { createTheme } from "@mui/material";
import { Mode } from "../app/interfaces/interfaces";
declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      first: {
        main: string;
        dark: string;
      };
      textField: {
        main: string;
        dark: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors: {
      first: {
        main: string;
        dark: string;
      };
      textField: {
        main: string;
        dark: string;
      };
    };
  }
}

export const getTheme = (mode: Mode) => {
  return createTheme({
    colors: {
      first: {
        main: "",
        dark: "",
      },
      textField: {
        main: "#e0f7fa",
        dark: "black",
      },
    },
    palette: {
      mode: mode,
      primary: {
        main: blue[600],
      },
      secondary: {
        main: orange[500],
      },
    },
    typography: {
      fontFamily: "Open Sans",
    },
  });
};

export const getStyles = (mode: Mode) => {
  return {
    chatRoomBox: {
      height: "93%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "scroll",
      pl: "2rem",
      pr: "2rem",
    },
    chatRoomItem: {
      height: "50rem",
      backgroundImage:
        mode === "light"
          ? "url('https://firebasestorage.googleapis.com/v0/b/social-chat-aff34.appspot.com/o/bgImages%2Fthomas-heintz-0tgMnMIYQ9Y-unsplash.jpg?alt=media&token=a30727a8-f923-4b97-ae81-73ab62eeda06')"
          : "url('https://firebasestorage.googleapis.com/v0/b/social-chat-aff34.appspot.com/o/bgImages%2Fmath-U5mHl-uACe0-unsplash.jpg?alt=media&token=65b9ffd7-c1f4-4a42-9d09-60a89ced1b6c')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      p: 0,
      m: 0,
    },
    mylink: {
      color: `${mode}` === "dark" ? "white" : "black",
      textDecoration: "none",
    },
    freeBoxSignIn: {
      m: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    freeBoxSignUp: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      mt: 6,
      bgcolor: mode === "dark" ? "secondary.main" : "primary.main",
    },
    submit: {
      mt: 3,
      mb: 2,
      fontWeight: "bolder",
      fontSize: "1rem",
      bgcolor: `${mode}` === "dark" ? "secondary.main" : "primary.main",
      color: `${mode}` === "dark" ? "black" : "white",
      "&:hover": {
        bgcolor: mode === "dark" ? orange[600] : blue[700],
      },
    },
    grid: {
      backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
      backgroundRepeat: "no-repeat",
      backgroundColor: (t: Theme) =>
        t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    myLink: {
      color:
        `${mode}` === "dark" ? "white" : getTheme(mode).colors.textField.main,
      textDecoration: "none",
    },
    textField: {
      bgcolor:
        `${mode}` === "dark"
          ? getTheme(mode).colors.textField.dark
          : getTheme(mode).colors.textField.main,
    },
  };
};
