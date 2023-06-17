import ChatPeopleList from "./ChatPeopleList";
import {  db } from "../../../../app/firebase/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { State } from "../../../../app/interfaces/interfaces";
import { User } from "../../../../app/interfaces/interfaces";
interface Props {
  open: boolean;
  setOpen: Function;
  searchBar: User[];
  setValue: Function;
}
const add_user_to_chats = async (
  UID: string,
  otherUid: string,
  otherName: string,
  otherPhotoURL: string,
  mixedUID: string
) => {
  try {
    const docRef = doc(db, "users", UID);
    const docSnapshot = await getDoc(docRef);
    const existingData = docSnapshot.data();
    if (existingData) {
      await updateDoc(docRef, {
        chats: {
          ...existingData.chats,
          [otherUid]: {
            uid: otherUid,
            name: otherName,
            photoURL: otherPhotoURL,
            lastChat: { message: "", date: new Date() },
            mixedUID: mixedUID,
          },
        },
      });
    }
  } catch (err) {
    console.error(err);
  }
};
const updateChatDoc = async (currentUser: User, oppUser: User) => {
  //update currentUser
  const mixedUID: string = currentUser.uid + oppUser.uid;
  add_user_to_chats(
    currentUser.uid,
    oppUser.uid,
    oppUser.name,
    oppUser.photoURL,
    mixedUID
  );
  //update oppUser
  add_user_to_chats(
    oppUser.uid,
    currentUser.uid,
    currentUser.name,
    currentUser.photoURL,
    mixedUID
  );
  try {
    //add chats doc data
    const docRef = await setDoc(doc(db, "chats", mixedUID), {});
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
// const updateChatDoc = async (oppUID: string, currentUID: string) => {
//   const date = new Date();
//   try {
//     const docRef = doc(db, "users", currentUID);
//     await updateDoc(docRef, {
//       chats: {
//         [oppUID]: [{ message: "hello, world", time: date, read: false }],
//       },
//     });
//   } catch (err) {
//     // console.error(err);
//   }
// };
export default function SearchResults({
  searchBar,
  open,
  setOpen,
  setValue,
}: Props) {
  const currentUser = useSelector(
    (state: State) => state.CurrentUserInfo.currentUserInfo
  );
  const addUserHandle = (e: HTMLDivElement, item: User) => {
    const oppUser = item;
    updateChatDoc(currentUser, oppUser);
    setOpen(false);
    setValue("");
    //add doc chats firebase users/id/chats:{
    //  opposite user id:{
    //  [message:'hello', time:'12/2/2022', read:false, owner:user.uid]
    //  }
    //}
    //add chats to opposite user
    //user realtime update and get data in chatList from server
    //setOpen to close
  };
  return (
    <>
      {open && (
        <ChatPeopleList
          addUserHandle={addUserHandle}
          chatList={searchBar}
          searchMode
        />
      )}
      <br />
    </>
  );
}
