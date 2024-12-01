import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchChats } from '../../store/slices/aiChatSlice';
import PromptInput from './PromptInput';
import Messages from './Messages';
import TopBar from '../Topbar';
import Sidebar from '../Sidebar';
import { useParams } from 'react-router-dom';

const AiChat = () => {
  const { id } = useParams();

  const chats = useAppSelector((state) => state.aiChat.chats);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const getChats = async () => {
      try {
        await dispatch(fetchChats()).unwrap();
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    getChats();
  }, [dispatch]);

  const currentChat = React.useMemo(() => {
    if (id) {
      return chats.find((chat) => chat.id === id);
    }
  }, [id, chats]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar currentChat={currentChat} />
      <Sidebar />
      <Messages currentChat={currentChat} />
      <PromptInput />
    </Box>
  );
};

export default AiChat;
