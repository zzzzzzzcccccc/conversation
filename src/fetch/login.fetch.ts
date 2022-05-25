import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosCancelToken } from '@/utils'
import { CANCEL_CURRENT_REQUEST } from "@/config/constant";
import { login, LoginPayload } from '@/service';

export const loginFetch = createAsyncThunk('global/loginFetch',
  async (payload: LoginPayload, { signal }) => {
  try {
    const { source } = axiosCancelToken(signal);
    return await login(payload, { cancelToken: source.token })
  } catch (e: any) {
    if (e?.message === CANCEL_CURRENT_REQUEST) return null;
    return Promise.reject(e)
  }
})
