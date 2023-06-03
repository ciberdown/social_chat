import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../app/firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { NavigateFunction } from "react-router";

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    if (auth.currentUser !== null)
      await updateProfile(auth.currentUser, { displayName: name });
    const citiesRef = collection(db, "users");
    await setDoc(doc(citiesRef, user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      password,
    });

    console.log("sign up successful");
    navigate("/homepage");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};
