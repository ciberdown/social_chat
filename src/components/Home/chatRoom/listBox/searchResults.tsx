import ChatPeopleList from "./ChatPeopleList";
import { UserInterface, db } from "../../../../app/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

interface Props {
  open: boolean;
  setOpen: Function;
  searchBar: any;
  setValue: Function;
}
const updateChatDoc = async (oppUID: string, currentUID: string) => {
  const date = new Date();
  try {
    const docRef = doc(db, "users", currentUID);
    await updateDoc(docRef, {
      chats: {
        [oppUID]: [{ message: "hello, world", time: date, read: false }],
      },
    });
  } catch (err) {
    // console.error(err);
  }
};
export default function SearchResults({
  searchBar,
  open,
  setOpen,
  setValue,
}: Props) {
  const currentUser = useSelector(
    (state: any) => state.CurrentUserInfo.currentUserInfo
  );
  const addUserHandle = (e: any, item: any) => {
    const oppUser = item;
    updateChatDoc(oppUser.uid, currentUser.uid);
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
          onClick={addUserHandle}
          chatList={searchBar}
          searchMode
        />
      )}
      <br />
    </>
  );
}