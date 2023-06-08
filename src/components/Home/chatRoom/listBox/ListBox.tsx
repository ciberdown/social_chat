import { Item } from "../mainChatRoom";
import { CssBaseline, Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SelfInfo from "./SelfInfo";
import ChatPeopleList from "./ChatPeopleList";
import { getTheme } from "../../../../styles/theme";
import { useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../app/firebase/config";
interface Props {
  md?: number;
  xs?: number;
  lg?: number;
  sm?: number;
  sx?: object;
}
const searchUser = async (oppUid: string) => {
  const q = query(collection(db, "users"), where("uid", "==", oppUid));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data()); //people who you added is here
    });
  } catch (err) {
    console.log(err);
  }
};
export default function ListBox(props: Props) {
  const mode = useSelector((state: any) => state.Mode.mode);
  const currentUser = useSelector(
    (state: any) => state.CurrentUserInfo.currentUserInfo
  );
  if (currentUser?.chats) {
    //if chats exits
    const addedUids: string[] = Object.keys(currentUser.chats); //people added to chat
    addedUids.map((item) => {
      searchUser(item);
    });
  }
  const removeHande = (e: any, index: number) => {
    console.log(e, index);
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
          onClick={removeHande}
          chatList={[
            {
              authProvider: "local",
              name: "Amin Teymuri",
              email: "teymuri.amin@gmail.com",
              uid: "pyUoHeYrxxemcY7MDkFrzXEvdWg1",
              password: "123456",
            },
          ]}
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
