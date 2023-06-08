export const ChangeModeAction = () => (dispatch: Function, getState: Function) => {
  //with Redux-thunk nested arrow functions
  const { Mode: thisState } = getState();
  let newMode: string = thisState.mode === "dark" ? "light" : "dark";

  dispatch({
    type: "CHANGE_MODE",
    payload: newMode,
  });
};
