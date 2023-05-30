const initial_value: string = 'light';

const ModeReducer = (state = { mode: initial_value }, action: any) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return { mode: action.payload };
    default:
      return state;
  }
};
export default ModeReducer;