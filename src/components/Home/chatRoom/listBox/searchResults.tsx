import ChatPeopleList from "./ChatPeopleList";
import { UserInterface } from "../../../../app/firebase/config";
interface Props {
  open: boolean;
  setOpen: Function;
  searchBar: any;
  setValue: Function
}
export default function SearchResults({ searchBar, open, setOpen, setValue }: Props) {
  const addUserHandle = (e:any, index: number)=>{
    console.log(e, index);
    setOpen(false);
    setValue('')
    //add doc chats firebase users/id/chats:{
    //  opposite user id:{
    //  [message:'hello', time:'12/2/2022', read:false, owner:user.uid]
    //  }
    //}
    //add chats to opposite user
    //user realtime update and get data in chatList from server
    //setOpen to close
  }
  return (
    <>
      {open && (
        <ChatPeopleList
          onClick={addUserHandle}
          chatList={searchBar}
          disableRemove
          disableChats
        />
      )}
      <br />
    </>
  );
}
