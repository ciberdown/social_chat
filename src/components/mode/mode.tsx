import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ChangeModeAction } from "../../redux/actions/ModeActions";
export default function Mode() {
  const mode: string = useSelector((state: any) => state.Mode.mode);
  const dispatch = useDispatch();
  const toggleMode = (): void => {
    dispatch(ChangeModeAction());
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          color: "text.primary",
          borderRadius: 1,
          py: 1,
          cursor: "pointer",
        }}
        onClick={toggleMode}
      >
        <IconButton sx={{ ml: 1 }} color="inherit">
          {mode === "dark" ? (
            <LightModeIcon color="primary" fontSize="large" />
          ) : (
            <NightsStayIcon color="primary" fontSize="large" />
          )}
        </IconButton>
      </Box>
    </>
  );
}
