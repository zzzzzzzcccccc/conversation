import { AxiosRequestConfig } from 'axios';
import { httpClient } from '@/config/http.client';
import { PartialConversation } from '@/model/conversation';

export async function userConversations(config?: AxiosRequestConfig) {
  const response = await httpClient.instance.get<PartialConversation[] | null>('/conversations', config)
  return response.data
}
