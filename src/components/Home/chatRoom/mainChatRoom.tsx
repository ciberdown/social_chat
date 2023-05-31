import { Grid } from "@mui/material";
import { Component, ReactNode } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ListBox from "./ListBox";
import ChatRoomBox from "./ChatRoomBox";

export default class MainChatRoom extends Component {
  render(): ReactNode {
    return (
      <Grid container>
        <ListBox sx={{ height: "90vh", bgcolor: "grey" }} md={4} xs={6} />
        <ChatRoomBox sx={{ height: "90vh" }} md={8} xs={6} />
      </Grid>
    );
  }
}

export const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
