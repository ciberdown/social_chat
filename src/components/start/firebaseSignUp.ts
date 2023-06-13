import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../app/firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { NavigateFunction } from "react-router";

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
  navigate: NavigateFunction,
  uploadImageURL: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    if (auth.currentUser !== null)
      uploadImageURL === null
        ? await updateProfile(auth.currentUser, { displayName: name })
        : await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: uploadImageURL,
          });
    const citiesRef = collection(db, "users");
    await setDoc(doc(citiesRef, user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      password,
      photoURL: uploadImageURL,
      chats: [],
    });

    console.log("sign up successful");
    navigate("/homepage");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};
