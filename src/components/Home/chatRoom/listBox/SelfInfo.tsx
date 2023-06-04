import Avatar from "@mui/material/Avatar";
import LogOut from "./logOut";
import Mode from "../../../mode/mode";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { auth } from "../../../../app/firebase/config";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function SelfInfo(props: {}) {
  const mode: "dark" | "light" = useSelector((state: any) => state.Mode.mode);
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    setTimeout(() => {
      const { currentUser } = auth;
      if (currentUser) {
        currentUser.displayName && setUserName(currentUser.displayName);
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
          <Typography color={mode==='dark'?'secondary.main':'black'} fontWeight="bold" fontSize="1.2rem">
            {userName}
          </Typography>
        </Stack>
      </IconButton>

      <Stack direction="row" alignItems="center">
        <Tooltip title="change mode">
          <Mode icons="icon_two" />
        </Tooltip>
        <LogOut />
      </Stack>
    </Box>
  );
}
