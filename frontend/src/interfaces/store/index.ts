import { ChatListItem } from '../chat';

export interface AIChatState {
  chats: ChatListItem[];
  status: 'idle' | 'loading' | 'failed';
  isMobileSidebarOpen: boolean;
}
