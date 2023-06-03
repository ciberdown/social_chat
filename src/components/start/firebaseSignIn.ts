import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/firebase/config";
import { NavigateFunction, useNavigate } from "react-router";
export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  setUserNotFound: Function,
  navigate: NavigateFunction
) => {
  setUserNotFound(""); //reset
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("sign in successful");
    navigate("/homepage");
  } catch (err: any) {
    if (err.message === "Firebase: Error (auth/user-not-found).") {
      setUserNotFound("user not found!");
    } else {
      alert(err.message);
    }
    console.error(err.message);
  }
};
