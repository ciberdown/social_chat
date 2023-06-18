import React from "react";
import { Message, State, User } from "../../../../app/interfaces/interfaces";
import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Mode } from "fs";

function Messagee({
  item,
  colors,
  mode,
}: {
  item: Message;
  colors: any;
  mode: Mode;
}) {
  const state = useSelector((state: State) => state);
  const currentUser: User = state.CurrentUserInfo.currentUserInfo;
  return (
    <Box
      key={item.id}
      sx={{
        display: "flex",
        alignSelf: currentUser.name === item.sender ? "end" : "start",
      }}
    >
      {currentUser.name !== item.sender && (
        <Avatar
          sx={{
            backgroundColor:
              mode === "dark"
                ? colors.opp_chat.dark.bg
                : colors.opp_chat.light.bg,
            color:
              mode === "dark"
                ? colors.avatar.text.dark
                : colors.avatar.text.light,
            mr: -2,
          }}
        >
          a
        </Avatar>
      )}
      <Box
        key={item.id}
        sx={{
          m: 1,
          backgroundColor: "white",
          borderRadius: "1rem",
          px: "1rem",
          pt: ".6rem",
          bgcolor:
            currentUser.name === item.sender
              ? mode === "dark"
                ? colors.self_chat.dark.bg
                : colors.self_chat.light.bg
              : mode === "dark"
              ? colors.opp_chat.dark.bg
              : colors.opp_chat.light.bg,
          color:
            currentUser.name === item.sender
              ? mode === "dark"
                ? colors.self_chat.dark.text
                : colors.self_chat.light.text
              : mode === "dark"
              ? colors.opp_chat.dark.text
              : colors.opp_chat.light.text,
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
            alignSelf: currentUser.name === item.sender ? "start" : "end",
            fontSize: ".8rem",
            color: "gray",
          }}
        >
          {item.date.getHours()}:{item.date.getMinutes()}
        </Typography>
      </Box>
    </Box>
  );
}

export default Messagee;
