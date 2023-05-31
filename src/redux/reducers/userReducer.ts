const initial_value: string[] = [];

const UserReducer = (state = { users: initial_value }, action: any) => {
  switch (action.type) {
    case "ADD_USER":
      return { users: action.payload };
    default:
      return state;
  }
};
export default UserReducer;