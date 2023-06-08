import { User } from "../../app/firebase/config";

export const CurrentUserAction = (obj: User) => (dispatch: Function, getState: Function) => {
    //with Redux-thunk nested arrow functions
    dispatch({
      type: "UPDATE",
      payload: obj,
    });
  };
  