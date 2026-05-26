import { FormField } from '@lib/models/FormField.model';
/// --------------------------------------------------- User Model --------------------------------------------------- //
export interface User {
  id: number; // Primary Key
  name: string; // Full name
  email: string; // Unique login email
  phone: string; // Contact number
  password: string; // Encrypted password
  role_id: number; // FK to roles
  role_name?: string; // (Optional) Role name for display
  is_active: boolean; // Active/Inactive
  last_login_at?: Date; // (Optional) Last login time
}
/// --------------------------------------------------- Table Columns --------------------------------------------------- //
export const dataUserTableColumns: { key: string; header: string; headerIcon: string }[] = [
  { key: 'id', header: 'ID', headerIcon: 'fa fa-hashtag' },
  { key: 'name', header: 'Name', headerIcon: 'fas fa-user' },
  { key: 'email', header: 'Email', headerIcon: 'fas fa-envelope' },
  { key: 'phone', header: 'Phone', headerIcon: 'fas fa-phone' },
  { key: 'role_name', header: 'Role Name', headerIcon: 'fas fa-user-tag' },
];
/// --------------------------------------------------- Add User Form Fields --------------------------------------------------- //
export const addUserFormFields: FormField[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    required: true,
    colSize: 6,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    colSize: 6,
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    colSize: 6,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    colSize: 6,
  },
  {
    name: 'role_id',
    label: 'Role',
    type: 'dropdown',
    required: true,
    colSize: 6,
    options: [], // Populate with roles
  },
  {
    name: 'is_active',
    label: 'Active',
    type: 'dropdown',
    options: [
      { label: 'Active', value: 1 },
      { label: 'Inactive', value: 2 },
    ],
    colSize: 6,
  },
];
/// --------------------------------------------------- View & Edit Fields --------------------------------------------------- //
export function getUserViewFields(user: User): Array<{
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
      value: user.id,
      labelIcon: 'fas fa-hashtag',
    },
    {
      name: 'name',
      label: 'Full Name',
      value: user.name,
      labelIcon: 'fas fa-user',
    },
    {
      name: 'email',
      label: 'Email',
      value: user.email,
      labelIcon: 'fas fa-envelope',
    },
    {
      name: 'phone',
      label: 'Phone',
      value: user.phone,
      labelIcon: 'fas fa-phone',
    },
    {
      name: 'role_id',
      label: 'Role',
      value: user.role_name,
      labelIcon: 'fas fa-user-tag',
    },
    {
      name: 'password',
      label: 'Password',
      value: user.password,
      labelIcon: 'fas fa-lock',
    },
    {
      name: 'is_active',
      label: 'Active',
      value: user.is_active ? 'Yes' : 'No',
      labelIcon: 'fas fa-toggle-on',
    },
    {
      name: 'last_login_at',
      label: 'Last Login',
      value: user.last_login_at ? user.last_login_at.toLocaleString() : 'Never',
      labelIcon: 'fas fa-clock',
    },
  ];
}
/// --------------------------------------------------- Edit User Form Fields --------------------------------------------------- //
export function getUserEditFormFields(item: User): FormField[] {
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
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter full name',
      colSize: 6,
      prefixIcon: 'fas fa-user',
    },
    {
      name: 'email',
      value: item.email,
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Enter email',
      colSize: 6,
      prefixIcon: 'fas fa-envelope',
    },
    {
      name: 'phone',
      value: item.phone,
      label: 'Phone',
      type: 'text',
      placeholder: 'Enter phone number',
      colSize: 6,
      prefixIcon: 'fas fa-phone',
    },
    {
      name: 'password',
      value: item.password,
      label: 'Password',
      type: 'password',
      required: true,
      placeholder: 'Enter password',
      colSize: 6,
      prefixIcon: 'fas fa-lock',
    },
    {
      name: 'role_id',
      value: item.role_id,
      label: 'Role',
      type: 'dropdown2',
      required: true,
      colSize: 6,
      prefixIcon: 'fas fa-user-tag',
      options: [], // Populate with roles
    },
    {
      name: 'is_active',
      value: item.is_active,
      label: 'Active',
      type: 'dropdown',
      colSize: 6,
      prefixIcon: 'fas fa-toggle-on',
      options: [
        { label: 'Active', value: 1 },
        { label: 'Inactive', value: 0 },
      ],
    },
  ];
}
