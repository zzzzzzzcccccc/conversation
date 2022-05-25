export interface Tenant {
  id: string;
  tenant_code: string;
  tenant_name: string;
  tenant_tax_no: string;
  tenant_phone_number: string;
  tenant_address: string;
  enabled: boolean;
  lease_deadline_at: string;
  create_at: string;
  update_at: string;
}

export type PartialTenant = Partial<Tenant>;
