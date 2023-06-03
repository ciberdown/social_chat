import { Item } from "../mainChatRoom";
import { Grid } from "@mui/material";
export default function ChatRoomBox(props: {
  md?: number;
  xs?: number;
  lg?: number;
  sm?: number;
  sx?: object;
}) {
  return (
    <Grid item md={props.md} xs={props.xs}>
      <Item sx={props.sx}>chat_room</Item>
    </Grid>
  );
}
