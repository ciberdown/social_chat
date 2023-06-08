import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { blue, grey, orange } from "@mui/material/colors";
import LibraryAddTwoToneIcon from "@mui/icons-material/LibraryAddTwoTone";

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
  onClick,
}: {
  chatList: any;
  searchMode?: boolean;
  onClick: Function;
}) {
  const mode = useSelector((state: any) => state.Mode.mode);
  return (
    <List
      sx={{
        width: "100%",
        borderRadius: 1,
        bgcolor: mode === "dark" ? grey[900] : "white",
        ":hover": searchMode
          ? {
              bgcolor: mode === "dark" ? grey[800] : blue[100],
              cursor: "pointer",
            }
          : {},
      }}
    >
      {chatList !== null &&
        chatList.map((item: any, index: number) => {
          return (
            <div key={index} onClick={(e) => onClick(e, item)}>
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
                      <Typography alignSelf="start">{item?.email}</Typography>
                    </Stack>
                  ) : (
                    <Typography
                      fontWeight="bold"
                      alignSelf="start"
                      mx={1}
                      sx={{ color: mode === "dark" ? "white" : "black" }}
                    >
                      {item.name}
                    </Typography>
                  )}

                  {!searchMode && (
                    <Typography
                      height={46}
                      overflow="hidden"
                      variant="caption"
                      fontSize=".9rem"
                      alignSelf="start"
                      ml={1}
                    >
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quas iure hic quaerat numquam itaque officiis iste
                      distinctio deserunt nihil dolorem provident laboriosam id
                      quae eos veniam veritatis, voluptas necessitatibus. Nulla
                      cum nisi eveniet dolore, ex aperiam, a repellat earum
                      accusamus et excepturi, eos quia at hic soluta! Sint
                      debitis quae quisquam quo tempore possimus voluptatum et
                      non modi alias aspernatur, deserunt quidem dolores optio
                      nemo. Error nihil dolor culpa aliquid earum, accusantium
                      placeat explicabo pariatur soluta saepe. Corporis
                      explicabo doloribus, modi fugit at praesentium pariatur et
                      voluptate quasi cum iure. Quam voluptatem aliquam cum
                      reprehenderit adipisci. Tempora dolorum natus omnis!
                    </Typography>
                  )}
                </Stack>

                {!searchMode ? (
                  <IconButton sx={{ alignSelf: "end" }}>
                    <Tooltip title="Delete chat">
                      <DeleteIcon
                        onClick={(e) => onClick(e, index)}
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
            </div>
          );
        })}
    </List>
  );
}
