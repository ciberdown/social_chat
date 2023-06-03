export const UserActions = (newUser:string) => (dispatch: any, getState: any) => {
    //with Redux-thunk nested arrow functions
    const { Users: thisState } = getState();

    dispatch({
      type: "TRUE",
      payload: [newUser, ...thisState.users],
    });
};
  