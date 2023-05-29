import { createTheme } from "@mui/material/styles";
import { blue, orange, grey } from "@mui/material/colors";
import "@fontsource/open-sans";
import "@fontsource/open-sans/400.css"; // Specify weight
import "@fontsource/open-sans/400-italic.css"; // Specify weight and style

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      first: {
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
    };
  }
}

export const theme = createTheme({
  colors: {
    first: {
      main: "",
      dark: "",
    },
  },
  direction: "rtl",
  palette: {
    primary: {
      main: blue[600],
      dark: blue[900],
    },
    secondary: {
      main: orange[400],
    },
    info: {
      main: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Open Sans",
  },
});

export const darkTheme = createTheme({
  colors: {
    first: {
      main: "#ff9100",
      dark: "#ff9100",
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: orange[500],
      dark: "#ff9100",
    },
    secondary: {
      main: orange[300],
      dark: "#ffea00",
    },
  },
  typography: {
    fontFamily: "Open Sans",
  },
});

export const lightColor: string = theme.palette.primary.main;
export const darkColor: string = theme.palette.secondary.main;
