import { User } from "../../app/interfaces/interfaces";

export const CurrentUserAction =
  (obj: User) => (dispatch: Function, getState: Function) => {
    //with Redux-thunk nested arrow functions
    dispatch({
      type: "UPDATE",
      payload: obj,
    });
  };
