export const CurrentUserAction = (obj: any) => (dispatch: any, getState: any) => {
    //with Redux-thunk nested arrow functions

    dispatch({
      type: "UPDATE",
      payload: obj,
    });
  };
  