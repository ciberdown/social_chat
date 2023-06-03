import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import LogOut from "./logOut";
import Mode from "../../../mode/mode";
import { Stack } from "@mui/material";
import { auth } from "../../../../app/firebase/config";
import { db } from "../../../../app/firebase/config";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
const randomColor = (): string => {
  let hex = Math.floor(Math.random() * 0xffffff);
  let color = "#" + hex.toString(16);

  return color;
};

export default function SelfInfo(props: {}) {
  const [userName, setUserName] = useState<string>("");
  useEffect(()=>{
  const { currentUser } = auth;
  if (currentUser) {
    currentUser.displayName && setUserName(currentUser.displayName);
  }
  }, [userName])
  

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
            <Avatar sx={{ bgcolor: randomColor() }}>{userName[0]}</Avatar>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={userName} secondary="Jan 9, 2014" />
        <Stack direction="row" alignItems="center">
          <Mode />
          <LogOut />
        </Stack>
      </ListItem>
    </List>
  );
}
