import { Item } from "../mainChatRoom";
import { Container, CssBaseline, Fab, Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SelfInfo from "./SelfInfo";
import ChatPeopleList from "./ChatPeopleList";
import { getTheme } from "../../../../styles/theme";
import { useSelector } from "react-redux";
import SearchBox from "./SearchBox";
export default function ListBox(props: {
  md?: number;
  xs?: number;
  lg?: number;
  sm?: number;
  sx?: object;
}) {
  const mode = useSelector((state: any) => state.Mode.mode);
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

        <ChatPeopleList />

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
