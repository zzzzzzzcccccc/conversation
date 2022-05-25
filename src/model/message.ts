import { PartialUser } from "./user";

export enum MessageStatusEnums {
  pending,
  success,
  error,
  rollback
}

export interface Message {
  id: string;
  tenant_id: string;
  conversation_id: string;
  content: string;
  from_user_id: string;
  from_user_name: string;
  status: MessageStatusEnums;
  create_at: string;
  update_at: string;
  from_user_metadata: PartialUser;
}

export type PartialMessage = Partial<Message>;
