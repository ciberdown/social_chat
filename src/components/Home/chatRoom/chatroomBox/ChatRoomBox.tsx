import { Item } from "../mainChatRoom";
import { Box, Grid, Typography } from "@mui/material";
import { Message, Mode, State } from "../../../../app/interfaces/interfaces";
import { useSelector } from "react-redux";
import { getStyles, getTheme } from "../../../../styles/theme";

import { green, red } from "@mui/material/colors";
import Messagee from "./Messagee";
import MessageTextbox from "./messageTextbox";

const colors = {
  avatar: {
    bg: { light: green[100], dark: red[100] },
    text: { light: "black", dark: "black" },
  },
  send_icon: {
    dark: "white",
    light: "black",
  },
  text_field: {
    light: { bg: getTheme("light").colors.textField.main, text: "black" },
    dark: {
      bg: "black",
      text: "white",
    },
  },
  chat_background: "linear-gradient(to right, #b3e5fc , #f8bbd0)",
  self_chat: {
    light: { bg: "#b9f6ca", text: "black" },
    dark: {
      bg: "grey",
      text: "white",
    },
  },
  opp_chat: {
    light: {
      bg: "#f8bbd0",
      text: "black",
    },
    dark: {
      bg: "grey",
      text: "white",
    },
  },
};
const createRandomList = (len: number): Message[] => {
  const list: Message[] = [];
  for (let i = 0; i <= len; i++) {
    if (i % 2 === 0)
      list.push({
        id: i,
        sender: "Amin Teymrui",
        date: new Date(),
        message: "hi, how is it going?",
      });
    else {
      list.push({
        id: i,
        sender: "Ali Talayi",
        date: new Date(),
        message: "hi.thank you!",
      });
    }
  }
  return list;
};
export default function ChatRoomBox(props: {
  md?: number;
  xs?: number;
  lg?: number;
  sm?: number;
  sx?: object;
}) {
  const state = useSelector((state: State) => state);
  const mode: Mode = state.Mode.mode;
  return (
    <Grid item md={props.md} xs={props.xs}>
      <Item sx={getStyles(mode).chatRoomItem}>
        <Box sx={getStyles(mode).chatRoomBox}>
          <Typography sx={{ fontSize: "1.1rem" }}>chat started</Typography>
          {createRandomList(50).map((item) => (
            <Messagee item={item} mode={mode} colors={colors} />
          ))}
        </Box>
        <MessageTextbox colors={colors} mode={mode} />
      </Item>
    </Grid>
  );
}
