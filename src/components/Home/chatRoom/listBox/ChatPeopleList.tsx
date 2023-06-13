import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { green, grey, orange } from "@mui/material/colors";
import LibraryAddTwoToneIcon from "@mui/icons-material/LibraryAddTwoTone";
import { User } from "../../../../app/firebase/config";
import { State } from "../../../../redux/userInterface";
import { ListUser } from "./ListBox";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";

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
    <>
      {chatList.length !== 0 && (
        <List
          sx={{
            width: "100%",
            borderRadius: 1,
            bgcolor: mode === "dark" ? grey[900] : "white",
          }}
        >
          {chatList.map((item: User | ListUser, index: number) => {
            return (
              <Tooltip
                key={index}
                title={searchMode ? "Add user" : "start chat?"}
              >
                <Box
                  onClick={
                    addUserHandle && ((e: any) => addUserHandle(e, item))
                  }
                  sx={{}}
                >
                  <Grid
                    container
                    direction="row"
                    sx={{ height: "auto", py: 1, m: 1, display: "flex" }}
                    alignItems="center"
                    justifyContent="space-between"
                    overflow="hidden"
                  >
                    <Grid
                      onClick={
                        startChatHandle &&
                        (() => startChatHandle((item as ListUser).mixedUID))
                      }
                      container
                      xs={10}
                      sx={{ cursor: "pointer" }}
                    >
                      <Grid item xs={searchMode ? 2 : 1}>
                        <Avatar
                          src={item.photoURL}
                          sx={{
                            bgcolor: randomColor().bgcolor,
                            color: "white",
                          }}
                        >
                          {item.name[0]}
                        </Avatar>
                      </Grid>

                      {searchMode ? (
                        <Grid item height={41} xs={10}>
                          <Typography
                            align="left"
                            fontWeight="bolder"
                            fontSize="1.1rem"
                            width="100%"
                            sx={{ color: mode === "dark" ? "white" : "black" }}
                          >
                            {item?.name}
                          </Typography>
                          <Typography align="center">
                            {(item as User).email}
                          </Typography>
                        </Grid>
                      ) : (
                        <Grid xs={4} item>
                          <Typography
                            fontWeight="bold"
                            alignSelf="center"
                            mx={3}
                            sx={{
                              color: mode === "dark" ? "white" : "black",
                              fontSize: "1.1rem",
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Grid>
                      )}

                      {!searchMode && (
                        <Grid item xs={6}>
                          <Typography
                            align="left"
                            height={46}
                            overflow="hidden"
                            fontSize=".9rem"
                            width="100%"
                          >
                            {(item as ListUser).lastChat.message !== "" &&
                              (item as ListUser).lastChat.message + "..."}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                    {!searchMode ? (
                      <Grid item xs={2}>
                        <Box>
                          <IconButton
                            onClick={
                              removeHandle &&
                              (() => removeHandle((item as ListUser).mixedUID))
                            }
                            disableRipple
                            sx={{ alignSelf: "end" }}
                          >
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
                          <Typography
                            fontSize=".7rem"
                            alignSelf="end"
                            justifySelf="end"
                          >
                            {(item as ListUser).lastChat.message !== "" &&
                              (item as ListUser).lastChat.date}
                          </Typography>
                        </Box>
                      </Grid>
                    ) : (
                      <Grid item xs={2}>
                        <AddIcon
                          fontSize="large"
                          sx={{
                            ":hover": {
                              color: green[200],
                            },
                          }}
                        />
                      </Grid>
                    )}
                  </Grid>

                  {index !== chatList.length - 1 && (
                    <Divider variant="inset" component="li" sx={{ mt: 2 }} />
                  )}
                </Box>
              </Tooltip>
            );
          })}
        </List>
      )}
    </>
  );
}
