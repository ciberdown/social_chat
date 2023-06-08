import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ChangeModeAction } from "../../redux/actions/ModeActions";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Tooltip } from "@mui/material";
import { State } from "../../redux/userInterface";


export default function Mode({ icons = 'icon_one' }: { icons?: "icon_one" | "icon_two" }) {
  const mode: 'light'|'dark' = useSelector((state: State) => state.Mode.mode);
  const dispatch = useDispatch();
  const toggleMode = (): void => {
    dispatch(ChangeModeAction());
  };
  const DarkIcon = () => {
    if (icons === "icon_one")
      return (
        <LightModeIcon sx={{ color: "secondary.main" }} fontSize="large" />
      );
    else return <Brightness7Icon sx={{color:'secondary.main'}}/>;
  };
  const LightIcon = () => {
    if (icons === "icon_one")
      return <NightsStayIcon color="primary" fontSize="large" />;
    else return <Brightness4Icon />;
  };
  return (
    <Tooltip title='Change mode'>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          color: "text.primary",
          borderRadius: 1,
          cursor: "pointer",
        }}
        onClick={toggleMode}
      >
        <IconButton sx={{ ml: 1 }} color="inherit">
          {mode === "dark" ? <DarkIcon /> : <LightIcon />}
        </IconButton>
      </Box>
    </Tooltip>
  );
}
