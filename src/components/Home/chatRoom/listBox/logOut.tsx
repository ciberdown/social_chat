import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import { signOut } from "firebase/auth";
import { auth } from "../../../../app/firebase/config";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";

export default function LogOut() {
  const mode: string = useSelector((state: any) => state.Mode.mode);
  const navigate = useNavigate();
  const logOutHandler = async () => {
    try {
      await signOut(auth);
      navigate("/");
      localStorage.removeItem("user");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Tooltip title="log out">
      <IconButton onClick={logOutHandler}>
        <MeetingRoomRoundedIcon
          fontSize="large"
          sx={{ color: mode === "dark" ? "white" : "black" }}
        />
      </IconButton>
    </Tooltip>
  );
}
