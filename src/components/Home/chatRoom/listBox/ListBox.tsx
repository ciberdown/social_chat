import { Item } from "../mainChatRoom";
import { CssBaseline, Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SelfInfo from "./SelfInfo";
import ChatPeopleList from "./ChatPeopleList";
import { getTheme } from "../../../../styles/theme";
import { useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { User } from "../../../../app/interfaces/interfaces";
import {
  Timestamp,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../app/firebase/config";
import { State } from "../../../../app/interfaces/interfaces";
import { useState } from "react";
import sort_chats_by_lastChat from "./sortChatList";
interface Props {
  md?: number;
  xs?: number;
  lg?: number;
  sm?: number;
  sx?: object;
}
export interface ListUser {
  mixedUID: string;
  lastChat: {
    message: string;
    date: string;
  };
  name: string;
  photoURL: string;
  email: string;
}
const searchUser = async (oppUid: string) => {
  const q = query(collection(db, "users"), where("uid", "==", oppUid));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data()); //people who you added is here
    });
  } catch (err) {
    console.error(err);
  }
};
export default function ListBox(props: Props) {
  const mode = useSelector((state: State) => state.Mode.mode);
  const currentUser = useSelector(
    (state: State) => state.CurrentUserInfo.currentUserInfo
  );
  if (currentUser?.chats) {
    //if chats exits
    const addedUids: string[] = Object.keys(currentUser.chats); //people added to chat
    addedUids.map((item) => {
      searchUser(item);
    });
  }
  const removeHande = async (oppUser: any) => {
    //remove chats from cuurent user
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      [`chats.${oppUser.uid}`]: deleteField(),
    });
    //remove chats from other user
    const oppUserRef = doc(db, "users", oppUser.uid);
    await updateDoc(oppUserRef, {
      [`chats.${currentUser.uid}`]: deleteField(),
    });
    //remove from chats doc
    await deleteDoc(doc(db, "chats", oppUser.mixedUID));
    console.log("removed");
  };
  const startChatHandle = (mixUID: string) => {
    console.log(mixUID + " start chat");
  };
  return (
    <Grid item md={props.md} xs={props.xs}>
      <Item
        sx={{
          ...props.sx,
          bgcolor:
            mode === "dark"
              ? getTheme(mode).colors.textField.dark
              : getTheme(mode).colors.textField.main,
        }}
      >
        <CssBaseline />
        <SelfInfo />
        <SearchBox
          sx={{ my: 1, bgcolor: mode === "dark" ? "black" : "white" }}
          mode={mode}
        />

        <ChatPeopleList
          startChatHandle={startChatHandle}
          removeHandle={removeHande}
          chatList={
            currentUser?.chats === null
              ? []
              : (sort_chats_by_lastChat(currentUser) as User[])
          }
        />

        <Fab
          size="medium"
          sx={{
            bgcolor: "#f50057",
            color: "white",
            position: "absolute",
            bottom: "11vh",
            left: 16,
          }}
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Item>
    </Grid>
  );
}
