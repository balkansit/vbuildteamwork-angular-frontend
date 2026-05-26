import { FormField } from '@lib/models/FormField.model';

// --------------------------------------------------- Role Model --------------------------------------------------- //
export interface Role {
  id: number;
  name: string;
  tenant_id?: number;
  description?: string;
}

// --------------------------------------------------- Table Columns --------------------------------------------------- //
export const dataRoleTableColumns: {
  key: string;
  header: string;
  headerIcon?: string;
}[] = [
  { key: 'name', header: 'Role Name', headerIcon: 'fa fa-user-tag' },
  { key: 'description', header: 'Description', headerIcon: 'fa fa-align-left' },
];

// --------------------------------------------------- Add Role Form Fields --------------------------------------------------- //
export const addRoleFormFields: FormField[] = [
  {
    name: 'name',
    label: 'Role Name',
    type: 'text',
    required: true,
    colSize: 6,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    colSize: 6,
    rows: 2,
  },
];

// --------------------------------------------------- View & Edit Fields --------------------------------------------------- //
export function getRoleViewFields(role: Role): Array<{
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
      value: role.id,
      labelIcon: 'fas fa-hashtag',
    },
    {
      name: 'name',
      label: 'Role Name',
      value: role.name,
      labelIcon: 'fas fa-user-tag',
    },
    {
      name: 'description',
      label: 'Description',
      value: role.description,
      labelIcon: 'fas fa-align-left',
    },
  ];
}

// --------------------------------------------------- Edit Role Form Fields --------------------------------------------------- //
export function getRoleEditFormFields(item: Role): FormField[] {
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
      name: 'description',
      value: item.description,
      label: 'Description',
      type: 'textarea',
      rows: 2,
      colSize: 6,
      prefixIcon: 'fas fa-align-left',
    },
  ];
}
