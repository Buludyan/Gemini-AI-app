import React from 'react';
import { v4 as uuid } from 'uuid';
import axios, { AxiosResponse } from 'axios';
import { ChatListItem } from '../interfaces/chat';
import { NavigateFunction } from 'react-router-dom';
import { server } from '../constants';

export const sendMessage = async ({
  id,
  prompt,
  chats,
  setChats,
  navigate,
  abortControllerRef,
  setIsLoading,
}: {
  id: string | undefined;
  prompt: string;
  chats: ChatListItem[];
  setChats(payload: ChatListItem[]): void;
  navigate: NavigateFunction;
  abortControllerRef: React.MutableRefObject<AbortController | null>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (!prompt) return;

  setIsLoading(true);

  try {
    const newId = uuid();

    const response: AxiosResponse<ChatListItem> = await axios.post(
      `${server}/api/chat`,
      {
        prompt,
        chatId: id || newId,
      },
      { signal: abortControllerRef.current?.signal },
    );

    const updatedChat = response.data;

    if (!id || !chats.length) {
      setChats([updatedChat, ...chats]);
      navigate(`/${newId}`);
    } else {
      const updatedChats = chats.map((chat) =>
        chat.id === updatedChat.id ? updatedChat : chat,
      );
      setChats(updatedChats);
    }
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    setIsLoading(false);
  }
};
