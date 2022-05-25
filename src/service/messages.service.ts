import {AxiosRequestConfig} from "axios";
import {httpClient} from '@/config/http.client'
import {PartialMessage} from "@/model/message";

export async function conversationMessages(conversationId: string | number, config?: AxiosRequestConfig) {
  const response = await httpClient.instance.get<PartialMessage[] | null>(`/messages/${conversationId}`, config)
  return response.data
}
