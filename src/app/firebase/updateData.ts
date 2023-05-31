import { updateDoc, doc } from "firebase/firestore";
import { db } from "./config";

export const updateFirstoreDoc = async (
  collectionName: string,
  docId: string,
  data: { password?: string }
) => {
  //data={password: string}
  try {
    const docRef = doc(db, collectionName, docId);
    const res = await updateDoc(docRef, data);
    console.log(' doc updated:', res)
  } catch (err: any) {
    console.error(err)
  }
};

