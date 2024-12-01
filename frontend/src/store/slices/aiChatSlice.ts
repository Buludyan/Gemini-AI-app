import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { AIChatState } from '../../interfaces/store';
import { ChatListItem } from '../../interfaces/chat';
import { server } from '../../constants';

const initialState: AIChatState = {
  chats: [],
  status: 'idle',
  isMobileSidebarOpen: false,
};

export const fetchChats = createAsyncThunk(
  'aiChat/fetchChats',
  async (_, { rejectWithValue }) => {
    const response: AxiosResponse<ChatListItem[]> = await axios.get(
      `${server}/api/chats`,
    );

    if (!response.data) {
      return rejectWithValue('Error');
    }

    return response.data;
  },
);

const aiChatSlice = createSlice({
  name: 'aiChat',
  initialState,
  reducers: {
    setChats: (state, action: { payload: ChatListItem[] }) => {
      state.chats = action.payload;
    },
    setMobileSideBarOpen: (state, action: { payload: boolean }) => {
      state.isMobileSidebarOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = 'idle';
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const aiChatActions = aiChatSlice.actions;

export default aiChatSlice.reducer;
