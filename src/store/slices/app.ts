import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { PartialConversation } from '@/model/conversation'
import { FetchStatus } from "@/model/fetch.status";
import { conversationsFetch } from '@/fetch/conversations.fetch';
import { PartialMessage } from "@/model/message";

export interface ConversationMessagesRecord {
  loadStatus: FetchStatus;
  messages: PartialMessage[];
}

export interface AppState {
  conversations: PartialConversation[]
  conversationsStatus: FetchStatus;
  conversationMessages: Record<string | number, ConversationMessagesRecord>;
}

const initialState: AppState = {
  conversations: [],
  conversationsStatus: FetchStatus.fulfilled,
  conversationMessages: {}
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<AppState['conversations']>) => {
      const conversations = action.payload
      const initialConversationMessages: AppState['conversationMessages'] = {}
      conversations.forEach(record => {
        if (record.id) {
          initialConversationMessages[record.id] = {
            messages: [],
            loadStatus: FetchStatus.fulfilled
          }
        }
      })
      state.conversations = conversations
      state.conversationMessages = initialConversationMessages
    },
    setConversationMessages: (state, action: PayloadAction<{ conversationId: string | number; messages: ConversationMessagesRecord['messages'] }>) => {
      const defaultRecord = state.conversationMessages[action.payload.conversationId]
      state.conversationMessages[action.payload.conversationId] = {
        ...defaultRecord,
        messages: action.payload.messages,
        loadStatus: FetchStatus.fulfilled
      }
    },
    setConversationMessagesLoadStatus: (state, action: PayloadAction<{ conversationId: string | number; loadStatus: FetchStatus }>) => {
      const defaultRecord = state.conversationMessages[action.payload.conversationId]
      state.conversationMessages[action.payload.conversationId] = {
        ...defaultRecord,
        loadStatus: action.payload.loadStatus
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(conversationsFetch.pending, (state) => {
        state.conversationsStatus = FetchStatus.pending
      })
      .addCase(conversationsFetch.fulfilled, (state) => {
        state.conversationsStatus = FetchStatus.fulfilled
      })
      .addCase(conversationsFetch.rejected, (state) => {
        state.conversationsStatus = FetchStatus.rejected
      })
  }
})

export const { setConversations, setConversationMessages, setConversationMessagesLoadStatus } = appSlice.actions;
export default appSlice.reducer
