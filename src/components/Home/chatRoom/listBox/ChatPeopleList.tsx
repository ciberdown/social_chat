import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getTheme } from "../../../../styles/theme";
import { grey } from "@mui/material/colors";
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
const chatList = [1, 2, 3];
export default function ChatPeopleList() {
  const mode = useSelector((state: any) => state.Mode.mode);
  return (
    <List
      sx={{
        width: "100%",
        borderRadius: 1,
        bgcolor: mode === "dark" ? grey[900] : "white",
      }}
    >
      {chatList.map((item, index) => {
        return (
          <>
            <Stack
              direction="row"
              sx={{ height: "auto", py: 2, m: 1, display: "flex" }}
              key={index}
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" gap={1}>
                <Avatar sx={{ bgcolor: randomColor().bgcolor, color: "white" }}>
                  A
                </Avatar>

                <Typography fontWeight="bold" alignSelf="start" ml={1}>
                  Ali
                </Typography>
                <Typography
                  height={22}
                  overflow="hidden"
                  variant="caption"
                  fontSize=".9rem"
                  alignSelf="end"
                  ml={1}
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas
                  iure hic quaerat numquam itaque officiis iste distinctio
                  deserunt nihil dolorem provident laboriosam id quae eos veniam
                  veritatis, voluptas necessitatibus. Nulla cum nisi eveniet
                  dolore, ex aperiam, a repellat earum accusamus et excepturi,
                  eos quia at hic soluta! Sint debitis quae quisquam quo tempore
                  possimus voluptatum et non modi alias aspernatur, deserunt
                  quidem dolores optio nemo. Error nihil dolor culpa aliquid
                  earum, accusantium placeat explicabo pariatur soluta saepe.
                  Corporis explicabo doloribus, modi fugit at praesentium
                  pariatur et voluptate quasi cum iure. Quam voluptatem aliquam
                  cum reprehenderit adipisci. Tempora dolorum natus omnis!
                </Typography>
              </Stack>

              <IconButton sx={{ alignSelf: "end" }}>
                <Tooltip title="Delete chat">
                  <DeleteIcon
                    sx={{ color: mode === "dark" ? "white" : "black" }}
                  />
                </Tooltip>
              </IconButton>
            </Stack>

            {index !== chatList.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </>
        );
      })}
    </List>
  );
}
