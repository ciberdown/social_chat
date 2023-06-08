import { User } from "../app/firebase/config";
export interface State{
    Mode: { mode: "light" | "dark" };
    Users: { users: [] };
    CurrentUserInfo: { currentUserInfo: User };
  }