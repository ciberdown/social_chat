export const UserActions = (newUser:string) => (dispatch: any, getState: any) => {
    //with Redux-thunk nested arrow functions
    const { Users: thisState } = getState();

    dispatch({
      type: "ADD_USER",
      payload: [newUser, ...thisState.users],
    });
};
  