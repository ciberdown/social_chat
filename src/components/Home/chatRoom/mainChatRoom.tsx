import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ListBox from "./listBox/ListBox";
import ChatRoomBox from "./chatroomBox/ChatRoomBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { User, auth, db } from "../../../app/firebase/config";
import { CurrentUserAction } from "../../../redux/actions/CurrentUserActions";
import {
  DocumentData,
  DocumentReference,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

export default function MainChatRoom() {
  const dispatch = useDispatch();
  const CUser = useSelector(
    (state: any) => state.CurrentUserInfo.currentUserInfo
  );
  useEffect(() => {
    const interval = setInterval(() => {
      if (auth.currentUser !== null) {
        clearInterval(interval);

        const uid = auth.currentUser?.uid;
        const docRef = doc(db, "users", uid);

        updateMyUser(docRef);

        console.log("just one time execute");
      }
    }, 500);

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);
  const updateMyUser = (docRef: DocumentReference<DocumentData>) => {
    try {
      const onSnap = onSnapshot(docRef, (doc) => {
        console.log("updated");
        // console.log(doc.data()?.chats as User);
        dispatch(CurrentUserAction(doc.data() as User));
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Grid container>
      <ListBox sx={{ height: "90vh", bgcolor: "grey" }} md={4} xs={6} />
      <ChatRoomBox sx={{ height: "90vh" }} md={8} xs={6} />
    </Grid>
  );
}

export const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
