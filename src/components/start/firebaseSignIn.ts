import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/firebase/firebase";

export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  setUserNotFound: Function
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    if (err.message === "Firebase: Error (auth/user-not-found).") {
      setUserNotFound("user not found!");
    } else {
      alert(err.message);
    }
    console.error(err.message);
  }
};
