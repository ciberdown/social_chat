export const ChangeModeAction = () => (dispatch: any, getState: any) => {
  //with Redux-thunk nested arrow functions
  const { Mode: thisState } = getState();
  let newMode: string = thisState.mode === "dark" ? "lite" : "dark";

  dispatch({
    type: "CHANGE_MODE",
    payload: newMode,
  });
};
