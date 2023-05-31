import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import { signOut } from "firebase/auth";
import { auth } from "../../../app/firebase/config";
export default function SelfInfo() {
  const logOutHandler = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <List
      sx={{
        width: "100%",

        bgcolor: "background.paper",
        mb: 2,
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Amin" secondary="Jan 9, 2014" />
        <div onClick={logOutHandler}><MeetingRoomRoundedIcon fontSize="large" sx={{ cursor: "pointer" }} /></div>
        
      </ListItem>
    </List>
  );
}
