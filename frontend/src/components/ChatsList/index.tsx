import { useAppSelector } from '../../store/store';
import { ChatListItem } from '../../interfaces/chat';
import ChatsListItem from './ChatsListItem';
import { List } from '@mui/material';

const ChatsList = () => {
  const chats = useAppSelector((state) => state.aiChat.chats);

  return (
    <List sx={{ paddingTop: 0 }}>
      {chats.map((chatListItem: ChatListItem) => {
        return (
          <ChatsListItem key={chatListItem.id} chatListItem={chatListItem} />
        );
      })}
    </List>
  );
};

export default ChatsList;
