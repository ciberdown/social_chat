import { Item } from "./mainChatRoom";
import { Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SelfInfo from "./SelfInfo";
import ChatPeopleList from "./ChatPeopleList";
import AutocComplete from "./autoComplete";

export default function ListBox(props: {
  md?: number;
  xs?: number;
  lg?: number;
  sm?: number;
  sx?: object;
}) {
  return (
    <Grid item md={props.md} xs={props.xs}>
      <Item sx={props.sx}>
        <SelfInfo />
        <AutocComplete />
        <ChatPeopleList />

        <Fab size="medium" sx={{bgcolor:'#f50057', color:'white', position:'absolute',bottom:'8vh', left:16}} aria-label="add">
          <AddIcon />
        </Fab>
      </Item>
    </Grid>
  );
}
