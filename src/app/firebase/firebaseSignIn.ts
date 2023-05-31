import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  setUserNotFound: Function
) => {
  setUserNotFound(""); //reset
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("sign in successful");
  } catch (err: any) {
    if (err.message === "Firebase: Error (auth/user-not-found).") {
      setUserNotFound("user not found!");
    } else {
      alert(err.message);
    }
    console.error(err.message);
  }
};
