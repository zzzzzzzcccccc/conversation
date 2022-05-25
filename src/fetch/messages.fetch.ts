import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosCancelToken} from '@/utils'
import {CANCEL_CURRENT_REQUEST} from "@/config/constant";
import {conversationMessages} from '@/service';
import {setConversationMessages, setConversationMessagesLoadStatus} from '@/store/slices/app';
import {FetchStatus} from "@/model/fetch.status";

export const messagesFetch = createAsyncThunk('app/messagesFetch',
  async (conversationId: string | number, { signal, dispatch }) => {
    dispatch(setConversationMessagesLoadStatus({ conversationId, loadStatus: FetchStatus.pending }))
    try {
      const { source } = axiosCancelToken(signal);
      const result = await conversationMessages(conversationId, { cancelToken: source.token })
      if (result) {
        dispatch(setConversationMessages({ conversationId, messages: result }))
      }
      return result
    } catch (e: any) {
      if (e?.message === CANCEL_CURRENT_REQUEST) {
        dispatch(setConversationMessagesLoadStatus({ conversationId, loadStatus: FetchStatus.fulfilled }))
        return null
      }
      dispatch(setConversationMessagesLoadStatus({ conversationId, loadStatus: FetchStatus.rejected }))
      return Promise.reject(e)
    }
})
