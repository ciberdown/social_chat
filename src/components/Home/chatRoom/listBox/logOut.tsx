import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import { signOut } from "firebase/auth";
import { auth } from "../../../../app/firebase/config";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function LogOut() {
  const mode: string = useSelector((state: any)=> state.Mode.mode);
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
    <div onClick={logOutHandler}>
      <MeetingRoomRoundedIcon fontSize="large" sx={{ cursor: "pointer", color: mode === 'dark'?'white' :'black'}} />
    </div>
  );
}
