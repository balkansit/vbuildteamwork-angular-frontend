import { FormField } from "@lib/models/FormField.model";

/// --------------------------------------------------- Permission Model --------------------------------------------------- //
export interface Permission {
  id: number; // Primary Key
  name: string; // Unique name (e.g., sales.create)
  label: string; // Human-readable (e.g., Create Sales)
  module?: string; // Optional grouping (e.g., sales)
  created_at: Date; // Timestamp when created
  updated_at: Date; // Timestamp when updated
}
/// --------------------------------------------------- Table Columns --------------------------------------------------- //
export const permissionTableColumns: {
  key: string;
  header: string;
  headerIcon?: string;
}[] = [
  { key: 'id', header: 'ID', headerIcon: 'fa fa-hashtag' },
  { key: 'name', header: 'Permission Name', headerIcon: 'fa fa-key' },
  { key: 'label', header: 'Label', headerIcon: 'fa fa-tag' },
  { key: 'module', header: 'Module', headerIcon: 'fa fa-cubes' },
];

/// --------------------------------------------------- View & Edit Fields --------------------------------------------------- //
export function getPermissionViewFields(permission: Permission): Array<{
  name: string;
  label: string;
  value: any;
  labelIcon: string;
  type?: string;
}> {
  return [
    {
      name: 'id',
      label: 'ID',
      value: permission.id,
      labelIcon: 'fas fa-hashtag',
    },
    {
      name: 'name',
      label: 'Permission Name',
      value: permission.name,
      labelIcon: 'fas fa-key',
    },
    {
      name: 'label',
      label: 'Label',
      value: permission.label,
      labelIcon: 'fas fa-tag',
    },
    {
      name: 'module',
      label: 'Module',
      value: permission.module ?? '',
      labelIcon: 'fas fa-cubes',
    },
    {
      name: 'created_at',
      label: 'Created At',
      value: permission.created_at
        ? new Date(permission.created_at).toLocaleDateString()
        : '',
      type: 'date',
      labelIcon: 'fas fa-calendar-plus',
    },
    {
      name: 'updated_at',
      label: 'Updated At',
      value: permission.updated_at
        ? new Date(permission.updated_at).toLocaleDateString()
        : '',
      type: 'date',
      labelIcon: 'fas fa-calendar-check',
    },
  ];
}

export function getPermissionEditFormFields(item: Permission): FormField[] {
  return [
    {
      name: 'id',
      value: item.id,
      label: 'ID',
      type: 'text',
      disabled: true,
      colSize: 6,
      prefixIcon: 'fas fa-hashtag',
    },
    {
      name: 'name',
      value: item.name,
      label: 'Role Name',
      type: 'text',
      required: true,
      placeholder: 'Enter role name',
      colSize: 6,
      prefixIcon: 'fas fa-user-tag',
    },
    {
      name: 'module',
      value: item.module,
      label: 'Module',
      type: 'text',
      placeholder: 'Enter module name',
      colSize: 6,
      prefixIcon: 'fas fa-cubes',
    },
    {
      name: 'label',
      value: item.label,
      label: 'Label',
      type: 'text',
      required: true,
      placeholder: 'Enter label',
      colSize: 6,
      prefixIcon: 'fas fa-tag',
    },
    // Removed 'description' and 'slug' fields as they do not exist on Permission type
  ];
}