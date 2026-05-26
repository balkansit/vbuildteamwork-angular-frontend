// --------------------------------------------------- Role Permissions Model --------------------------------------------------- //
export interface RolePermissions {
    id: number; // Primary Key
    role_id: number; // FK to roles table
    permission_id: number; // FK to permissions table
    tenant_id: number; // FK to tenants for scoped permissions
    created_at: string; // ISO timestamp string
    updated_at: string; // ISO timestamp string
}