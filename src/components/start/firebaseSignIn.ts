import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/firebase/config";
import { NavigateFunction, useNavigate } from "react-router";
export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  setErrorTxt: Function,
  navigate: NavigateFunction
) => {
  setErrorTxt(""); //reset
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("sign in successful");
    navigate("/homepage");
  } catch (err: any) {
    if (err.message === "Firebase: Error (auth/user-not-found).") {
      setErrorTxt("user not found!");
    } else if (
      err.message === "Firebase: Error (auth/network-request-failed)."
    ) {
      setErrorTxt('network error, try your VPN!')
    } else {
      alert(err.message);
    }
    console.error(err.message);
  }
};
