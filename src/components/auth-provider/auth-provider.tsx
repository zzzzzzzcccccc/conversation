import {AuthProviderContext, AuthProviderProps} from './index';
import {clearAccessToken, setAccessToken} from "@/config/access.token";
import {useAppDispatch, useAppSelector} from '@/store'
import {loginFetch} from '@/fetch/login.fetch';
import {LoginPayload} from "@/service";
import {useNavigate} from 'react-router-dom';
import {BASE_LOGIN_PATH} from "@/config/constant";
import {FetchStatus} from '@/model/fetch.status';

export default function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const { loginStatus } = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginLoading = loginStatus === FetchStatus.pending

  const handleLogin = async (payload: LoginPayload) => {
    if (loginLoading) return
    const res = await dispatch(loginFetch(payload))
    const token = res.payload as string | undefined
    if (token) {
      setAccessToken(token)
    }
    return token
  }

  const handleLoginOut = () => {
    clearAccessToken();
    navigate(BASE_LOGIN_PATH, { replace: true })
  }

  return (
    <AuthProviderContext.Provider
      value={{
        loginLoading,
        handleLogin,
        handleLoginOut }}>
      {children}
    </AuthProviderContext.Provider>
  )
}
