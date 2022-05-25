import { PartialUser } from "./user";
import { PartialRoom } from "./room";

export enum ConversationStatusEnums {
  hide,
  display
}

export enum ConversationTargetTypeEnums {
  unknown,
  user,
  room
}

export interface Conversation {
  id: string;
  tenant_id: string;
  user_id: string;
  target_id: string;
  target_type: ConversationTargetTypeEnums;
  target_name: string;
  status: ConversationStatusEnums;
  create_at: string;
  update_at: string;
  target_metadata: PartialUser | PartialRoom;
}

export type PartialConversation = Partial<Conversation>
