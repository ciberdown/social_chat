import Avatar from "@mui/material/Avatar";
import LogOut from "./logOut";
import Mode from "../../../mode/mode";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { State } from "../../../../redux/userInterface";

export default function SelfInfo(props: {}) {
  const mode: "dark" | "light" = useSelector((state: State) => state.Mode.mode);
  const currentUserInfo = useSelector(
    (state: State) => state.CurrentUserInfo.currentUserInfo
  );
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
          <Avatar
            sx={{ bgcolor: "#e91e63", color: "white" }}
            src={currentUserInfo?.photoURL}
          >
            {currentUserInfo?.name && currentUserInfo?.name[0]}
          </Avatar>
          <Typography
            color={mode === "dark" ? "secondary.main" : "black"}
            fontWeight="bold"
            fontSize="1.2rem"
          >
            {currentUserInfo?.name}
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
