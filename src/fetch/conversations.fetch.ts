import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosCancelToken } from '@/utils'
import { CANCEL_CURRENT_REQUEST } from "@/config/constant";
import { userConversations } from '@/service';
import { setConversations } from '@/store/slices/app';

export const conversationsFetch = createAsyncThunk('app/conversationsFetch',
  async (_, { signal, dispatch }) => {
  try {
    const { source } = axiosCancelToken(signal);
    const result = await userConversations({ cancelToken: source.token })
    if (result) {
      dispatch(setConversations(result))
    }
    return result
  } catch (e: any) {
    if (e?.message === CANCEL_CURRENT_REQUEST) return null;
    return Promise.reject(e)
  }
})
