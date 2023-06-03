import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/start/SignUp";
import SignInSide from "../components/start/SignInSide";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { getDocData } from "./firebase/getDocData";
import "@fontsource/open-sans";
import "@fontsource/open-sans/400.css"; // Specify weight
import "@fontsource/open-sans/400-italic.css"; // Specify weight and style
import { getTheme } from "../styles/theme";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import MainChatRoom from "../components/Home/chatRoom/mainChatRoom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const auth = getAuth();

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      //user signed in or not
      if (user) {
        console.log("user signed in");
        const uid = user.uid;
      } else {
        // User is signed out
        const path = location.pathname;
        console.log("user sign out");
        if (path !== "/" && path !== "/signup") {
          navigate("/");
        }
      }
    });
  }, [location]);

  const mode: "light" | "dark" = useSelector((state: any) => state.Mode.mode);
  // updateFirstoreDoc('users','imWNc11wC0VbhOmg0PuY',{password:'1234'} )
  return (
    <ThemeProvider theme={getTheme(mode)}>
      <div className="App">
        {/* {userSignedIn ? (
          
        ) : ( */}
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/homepage" element={<MainChatRoom />} />
        </Routes>
        {/* )} */}
      </div>
    </ThemeProvider>
  );
}
