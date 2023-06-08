import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ListBox from "./listBox/ListBox";
import ChatRoomBox from "./chatroomBox/ChatRoomBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth, db } from "../../../app/firebase/config";
import { CurrentUserAction } from "../../../redux/actions/CurrentUserActions";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { AnyAction, Dispatch } from "redux";

const getDataFirsTime = async (uid: string, dispatch: Dispatch<AnyAction>) => {
  try {
    const docRef = doc(db, "users", uid);
    const res = await getDoc(docRef);
    if (res.exists()) dispatch(CurrentUserAction(res.data()));
  } catch (err) {
    console.error(err);
  }
};
const realTimeUpdate = (uid: string, dispatch: Dispatch<AnyAction>) => {
  const onSnap = onSnapshot(doc(db, "users", uid), (doc) => {
    dispatch(CurrentUserAction(doc.data()));
    console.log('firestore updated')
    // console.log(doc.data());//result
  });
};
export default function MainChatRoom() {
  const dispatch = useDispatch();
  const CUser = useSelector(
    (state: any) => state.CurrentUserInfo.currentUserInfo
  );
  useEffect(() => {
    console.log(CUser.length);
    const interval = setInterval(() => {
      if (auth.currentUser !== null) {
        clearInterval(interval);
        if (CUser.length === 0) {
          // clearInterval(myInterval);
          const uid = auth.currentUser?.uid;
          getDataFirsTime(uid, dispatch);

          realTimeUpdate(uid, dispatch);
          console.log("just one time excute");
        }
      }
    }, 500);
  }, []);

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
