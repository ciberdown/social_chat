import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/start/SingUp";
import SignInSide from "../components/start/SignInSide";
import { ThemeProvider } from "@mui/material/styles";
import { theme, darkTheme } from "../styles/theme";
import { useSelector } from "react-redux";
function App() {
  const mode: "light" | "dark" = useSelector((state: any) => state.Mode.mode);
  const myTheme = mode === "dark" ? darkTheme : theme;
  // theme.palette.mode = mode
  return (
    <ThemeProvider theme={myTheme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
