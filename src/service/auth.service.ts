import { AxiosRequestConfig } from 'axios';
import { httpClient } from '@/config/http.client';
import { PartialUser } from '@/model/user';
import { PartialTenant } from '@/model/tenant'

export interface LoginPayload {
  tenant_tax_no: string;
  email: string;
  password: string;
}

export interface ProfileData {
  user?: PartialUser;
  tenant?: PartialTenant;
}

export async function login(payload: LoginPayload, config?: AxiosRequestConfig) {
  const response = await httpClient.instance.post<string | null>('/auth/login', payload, config)
  return response.data;
}

export async function profile(config?: AxiosRequestConfig) {
  const response = await httpClient.instance.get<ProfileData | null>('/auth/profile', config)
  return response.data;
}

export async function refreshToken(config?: AxiosRequestConfig) {
  const response = await httpClient.instance.get<string | null>('/auth/refresh-token', config)
  return response.data;
}
