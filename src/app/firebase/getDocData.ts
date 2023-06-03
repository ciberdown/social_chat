import { collection, getDocs } from "firebase/firestore";
import { db } from "../../app/firebase/config";
import { UserActions } from "../../redux/actions/UserActions";
export const getDocData = async (collectionName: string, dispatch: any) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const array: { data: object; id: string }[] = [];
    querySnapshot.forEach((doc) => {
      array.push({ data: doc.data(), id: doc.id });
      dispatch(UserActions(doc.data().name))
    });
    //console.log(array);
    return array;
  } catch (err) {
    console.error(err);
  }
};
