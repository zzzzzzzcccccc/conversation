import React from "react";
import AuthProvider from './auth-provider';
import {LoginPayload} from "@/service";

export interface IAuthProviderContext {
  handleLogin: (payload: LoginPayload) => Promise<string | undefined>;
  handleLoginOut: (user_id: string | number) => void;
  loginLoading: boolean;
}

export interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProviderContext = React.createContext<IAuthProviderContext | null>(null)

export default AuthProvider;
