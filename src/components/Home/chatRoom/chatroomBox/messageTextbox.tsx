import { IconButton, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Mode } from "../../../../app/interfaces/interfaces";

function MessageTextbox({ colors, mode }: { colors: any, mode: Mode }) {
  return (
    <Stack direction="row">
      <TextField
        label=""
        fullWidth
        placeholder="start chat..."
        id="fullWidth"
        sx={{
          bgcolor:
            mode === "dark"
              ? colors.text_field.dark.bg
              : colors.text_field.light.bg,
        }}
      />
      <IconButton>
        <SendIcon
          fontSize="large"
          sx={{
            color:
              mode === "dark" ? colors.send_icon.dark : colors.send_icon.light,
          }}
        />
      </IconButton>
    </Stack>
  );
}

export default MessageTextbox;
