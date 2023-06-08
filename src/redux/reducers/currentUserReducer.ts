import { PayloadAction } from "@reduxjs/toolkit";

const initial_value: [] = [];

const CurrentUserInfoReducer = (state = { currentUserInfo: initial_value }, action: {type: string, payload:PayloadAction}) => {
  switch (action.type) {
    case "UPDATE":
      return { currentUserInfo: action.payload };
    default:
      return state;
  }
};
export default CurrentUserInfoReducer;