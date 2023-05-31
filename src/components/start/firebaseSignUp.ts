import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../app/firebase/firebase";
import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};
