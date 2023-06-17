export interface UserInterface {
  authProvider: string;
  name: string;
  email: string;
  uid: string;
  password: string;
  image?: string;
}
export interface User {
  name: string;
  email: string;
  password: string | number;
  photoURL: string;
  uid: string;
  authProvider: string;
  chats?: {};
}
export interface Message {
  id: number;
  sender: string;
  date: Date;
  message: string;
}

export interface State {
  Mode: { mode: "light" | "dark" };
  Users: { users: [] };
  CurrentUserInfo: { currentUserInfo: User };
}
