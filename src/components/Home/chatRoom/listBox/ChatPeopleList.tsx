import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { grey, orange } from "@mui/material/colors";
import LibraryAddTwoToneIcon from "@mui/icons-material/LibraryAddTwoTone";
import { User } from "../../../../app/firebase/config";
import { State } from "../../../../redux/userInterface";
import { ListUser } from "./ListBox";

const randomColor = () => {
  let hex = Math.floor(Math.random() * 0xffffff);
  let color = "#" + hex.toString(16);

  const c = color.substring(1); // strip #
  const rgb = parseInt(c, 16); // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff; // extract red
  const g = (rgb >> 8) & 0xff; // extract green
  const b = (rgb >> 0) & 0xff; // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  let light: string = "white";
  if (luma < 40) {
    // pick a different colour
    light = "black";
  }
  return { bgcolor: color, color: light };
};

export default function ChatPeopleList({
  chatList,
  searchMode = false,
  removeHandle,
  startChatHandle,
  addUserHandle,
}: {
  chatList: User[] | ListUser[];
  searchMode?: boolean;
  removeHandle?: Function;
  startChatHandle?: Function;
  addUserHandle?: Function;
}) {
  const mode = useSelector((state: State) => state.Mode.mode);
  return (
    <List
      sx={{
        width: "100%",
        borderRadius: 1,
        bgcolor: mode === "dark" ? grey[900] : "white",
      }}
    >
      {chatList !== null &&
        chatList.map((item: User | ListUser, index: number) => {
          return (
            <Box
              onClick ={addUserHandle && ((e: any)=>addUserHandle(e, item))}
              sx={{
                borderRadius: "2rem",
                ":hover": searchMode
                  ? {
                      bgcolor: mode === "dark" ? grey[800] : grey[200],
                      cursor: "pointer",
                    }
                  : {},
              }}
              key={index}
            >
              <Stack
              
                direction="row"
                sx={{ height: "auto", py: 1, m: 1, display: "flex" }}
                alignItems="center"
                justifyContent="space-between"
                overflow="hidden"
              >
                <Stack direction="row" gap={1}>
                  <Avatar
                    src={item.photoURL}
                    sx={{
                      bgcolor: randomColor().bgcolor,
                      color: "white",
                      ml: 1,
                    }}
                  >
                    A
                  </Avatar>
                  {searchMode ? (
                    <Stack ml={4} height={22}>
                      <Typography
                        fontWeight="bolder"
                        alignSelf="start"
                        fontSize="1.1rem"
                        sx={{ color: mode === "dark" ? "white" : "black" }}
                      >
                        {item?.name}
                      </Typography>
                      <Typography alignSelf="start">
                        {(item as User).email}
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography
                      fontWeight="bold"
                      alignSelf={
                        (item as ListUser).lastChat.message === ""
                          ? "center"
                          : "start"
                      }
                      mx={(item as ListUser).lastChat.message === "" ? 3 : 1}
                      sx={{
                        color: mode === "dark" ? "white" : "black",
                        fontSize:
                          (item as ListUser).lastChat.message === ""
                            ? "1.2rem"
                            : "1rem",
                      }}
                    >
                      {item.name}
                    </Typography>
                  )}

                  {!searchMode &&
                    (item as ListUser).lastChat.message !== "" && (
                      <Typography
                        height={46}
                        overflow="hidden"
                        variant="caption"
                        fontSize=".9rem"
                        alignSelf="start"
                        mt={2}
                        ml={1}
                      >
                        {(item as ListUser).lastChat.message + "..."}
                      </Typography>
                    )}
                </Stack>

                {!searchMode ? (
                  <IconButton disableRipple sx={{ alignSelf: "end" }}>
                    {(item as ListUser).lastChat.message !== "" && (
                      <Typography
                        fontSize=".7rem"
                        alignSelf="end"
                        justifySelf="end"
                        mr="1rem"
                      >
                        {(item as ListUser).lastChat.date}
                      </Typography>
                    )}
                    <Tooltip title="Delete chat">
                      <DeleteIcon
                        sx={{
                          color: mode === "dark" ? "white" : "black",
                          ":hover": {
                            color: orange[900],
                          },
                        }}
                      />
                    </Tooltip>
                  </IconButton>
                ) : (
                  <Tooltip title="Add User">
                    <LibraryAddTwoToneIcon
                      sx={{
                        justifySelf: "end",
                        ":hover": {
                          color: mode === "dark" ? "white" : "black",
                        },
                      }}
                    />
                  </Tooltip>
                )}
              </Stack>

              {index !== chatList.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </Box>
          );
        })}
    </List>
  );
}
