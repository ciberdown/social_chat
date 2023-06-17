import { URL } from "url";
import { Item } from "../mainChatRoom";
import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import { Message, State } from "../../../../app/interfaces/interfaces";
import { useSelector } from "react-redux";
import { getTheme } from "../../../../styles/theme";
const list: Message[] = [];
for (let i = 0; i <= 50; i++) {
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
console.log(list);
export default function ChatRoomBox(props: {
  md?: number;
  xs?: number;
  lg?: number;
  sm?: number;
  sx?: object;
}) {
  const currentUser = useSelector(
    (state: State) => state.CurrentUserInfo.currentUserInfo
  );

  return (
    <Grid item md={props.md} xs={props.xs}>
      <Item
        sx={{
          height: "90vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            height: "90%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            pl: "2rem",
            pr: "2rem",
          }}
        >
          {list.map((item) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignSelf: currentUser.name === item.sender ? "end" : "start",
                }}
              >
                {currentUser.name !== item.sender && <Avatar>a</Avatar>}
                <Box
                  key={item.id}
                  sx={{
                    m: 1,
                    backgroundColor: "white",
                    borderRadius: "1rem",
                    px: "1rem",
                    bgcolor:
                      currentUser.name === item.sender
                        ? "green"
                        : getTheme("light").colors.textField.main,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      alignSelf: "start",
                      fontSize: "1.2rem",
                      mb: 2,
                      mr: currentUser.name === item.sender ? 0 : 6,
                      ml: currentUser.name === item.sender ? 6 : 0,
                    }}
                  >
                    {item.message}
                  </Typography>
                  <Typography
                    sx={{
                      alignSelf:
                        currentUser.name === item.sender ? "start" : "end",
                      fontSize: ".8rem",
                      color: "gray",
                    }}
                  >
                    {item.date.getHours()}:{item.date.getMinutes()}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          variant="filled"
          placeholder="start chat..."
          sx={{ width: "60%", bgcolor: "white" }}
        />
      </Item>
    </Grid>
  );
}
