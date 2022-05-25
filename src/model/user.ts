export enum UserStatusEnums {
  offLine,
  onLine,
  busy
}

export enum UserGenderEnums {
  unknown,
  male,
  female
}

export interface User {
  id: string
  tenant_code: string;
  status: UserStatusEnums;
  gender: UserGenderEnums;
  enabled: boolean;
  email: string;
  role_id: string;
  role_name: string;
  birthday: string;
  create_at: string;
  update_at: string;
}

export type PartialUser = Partial<User>;
