import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/start/SingUp";
import SignInSide from "../components/start/SignInSide";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

import "@fontsource/open-sans";
import "@fontsource/open-sans/400.css"; // Specify weight
import "@fontsource/open-sans/400-italic.css"; // Specify weight and style
import { getTheme } from "../styles/theme";

export default function App() {
  const mode: "light" | "dark" = useSelector((state: any) => state.Mode.mode);

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <div className="App">
        {/* <MainChatRoom /> */}
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

