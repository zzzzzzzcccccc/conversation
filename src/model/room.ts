export interface Room {
  id: string;
  tenant_id: string;
  room_name: string;
  room_avatar_url: string;
  create_at: string;
  update_at: string;
}

export type PartialRoom = Partial<Room>;
