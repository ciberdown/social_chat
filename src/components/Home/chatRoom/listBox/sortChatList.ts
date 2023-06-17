//input: currentUser or CUser
const sort_chats_by_lastChat = (CUser: any) => {
  if (CUser.chats !== undefined) {
    const list = Object.values(CUser.chats);
    list.sort((a: any, b: any) => {
      return b.lastChat.date - a.lastChat.date;
    });
    return list;
  } else return [];
};
export default sort_chats_by_lastChat;
