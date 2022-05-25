import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosCancelToken } from '@/utils'
import { CANCEL_CURRENT_REQUEST } from "@/config/constant";
import { profile } from '@/service';

export const profileFetch = createAsyncThunk('global/profileFetch',
  async (_, { signal }) => {
  try {
    const { source } = axiosCancelToken(signal);
    return await profile({ cancelToken: source.token })
  } catch (e: any) {
    if (e?.message === CANCEL_CURRENT_REQUEST) return null;
    return Promise.reject(e)
  }
})
