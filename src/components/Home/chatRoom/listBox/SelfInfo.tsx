import Avatar from "@mui/material/Avatar";
import LogOut from "./logOut";
import Mode from "../../../mode/mode";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { auth, db } from "../../../../app/firebase/config";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

export default function SelfInfo(props: {}) {
  const mode: "dark" | "light" = useSelector((state: any) => state.Mode.mode);
  const [userName, setUserName] = useState<string>("");
  const realTimeThisUserUpdate = (uid: string) => {
    const unchange = onSnapshot(doc(db, "users", uid), (doc) => {
      const res = doc.data();
      if (res) {
        setUserName(res.name);
      }
    });
  };
  useEffect(() => {
    const myInterval = setInterval(() => {
      const { currentUser } = auth;
      if (auth.currentUser !== null) clearInterval(myInterval);
      if (currentUser) {
        currentUser.displayName && setUserName(currentUser.displayName);
        currentUser.uid && realTimeThisUserUpdate(currentUser.uid);
      }
    }, 500);
  }, [userName]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: mode === "dark" ? "white" : "black",
        p: 1,
        m: 1,
      }}
    >
      <IconButton disableRipple>
        <Stack direction="row" alignItems="center" gap={2}>
          {" "}
          <Avatar sx={{ bgcolor: "#e91e63", color: "white" }}>
            {userName[0]}
          </Avatar>
          <Typography
            color={mode === "dark" ? "white" : "black"}
            fontWeight="bold"
            fontSize="1.2rem"
          >
            {userName}
          </Typography>
        </Stack>
      </IconButton>

      <Stack direction="row" alignItems="center">
        <Mode icons="icon_two" />
        <LogOut />
      </Stack>
    </Box>
  );
}
