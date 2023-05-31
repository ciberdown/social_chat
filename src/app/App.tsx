import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/start/SingUp";
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
const auth = getAuth();

export default function App() {
  const [userSignedIn, setUserSignedIn] = useState<boolean>(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log("user signed in");
      const uid = user.uid;
      setUserSignedIn(true);
    } else {
      // User is signed out
      // ...
      setUserSignedIn(false);
      console.log("user sign out");
    }
  });
  const mode: "light" | "dark" = useSelector((state: any) => state.Mode.mode);
  // updateFirstoreDoc('users','imWNc11wC0VbhOmg0PuY',{password:'1234'} )
  return (
    <ThemeProvider theme={getTheme(mode)}>
      <div className="App">
        {userSignedIn ? (
          <MainChatRoom />
        ) : (
          <Routes>
            <Route path="/" element={<SignInSide />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        )}
      </div>
    </ThemeProvider>
  );
}
