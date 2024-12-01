export interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
}

export interface ChatListItem {
  id: string;
  messages: Message[];
  title: string;
}
