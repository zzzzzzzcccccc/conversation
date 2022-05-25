import { createSlice } from '@reduxjs/toolkit';
import { PartialTenant } from '@/model/tenant';
import { FetchStatus } from '@/model/fetch.status';
import { PartialUser } from '@/model/user';
import { loginFetch } from '@/fetch/login.fetch';
import { profileFetch } from '@/fetch/profile.fetch';

export interface GlobalState {
  user: PartialUser;
  tenant: PartialTenant;
  loginStatus: FetchStatus;
  profileStatus: FetchStatus;
}

const initialState: GlobalState = {
  user: {},
  tenant: {},
  loginStatus: FetchStatus.fulfilled,
  profileStatus: FetchStatus.pending,
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(loginFetch.pending, (state) => {
        state.loginStatus = FetchStatus.pending
      })
      .addCase(loginFetch.fulfilled, (state) => {
        state.loginStatus = FetchStatus.fulfilled
      })
      .addCase(loginFetch.rejected, (state) => {
        state.loginStatus = FetchStatus.rejected
      })

      .addCase(profileFetch.pending, (state) => {
        state.profileStatus = FetchStatus.pending
      })
      .addCase(profileFetch.fulfilled, (state, action) => {
        state.profileStatus = FetchStatus.fulfilled
        state.user = { ...state.user, ...action?.payload?.user }
        state.tenant = { ...state.tenant, ...action?.payload?.tenant }
      })
      .addCase(profileFetch.rejected, (state) => {
        state.profileStatus = FetchStatus.rejected
      })
  }
})

export default globalSlice.reducer
