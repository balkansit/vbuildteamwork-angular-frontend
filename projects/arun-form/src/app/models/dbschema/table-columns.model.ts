import { FormField } from '@lib/models/FormField.model';

export interface TableColumns {
  column_name: any;
  id: number; // Unique column ID
  table_id: number; // Reference to Tables
  name: string; // Column name
  data_type: string; // Data type (string, int, date, boolean, enum, dropdown, password)
  is_dropdown: boolean; // If true, values come from dropdown
  is_unique: boolean; // For enforcing unique values
  owner_id: number; // User who owns the column
  created_by: number; // Who created the column
  created_at: Date; // Timestamp
  updated_at: Date;
  value: any; 
  table_name:any;// Timestamp
}
/// --------------------------------------------------- Table Columns --------------------------------------------------- //
export const tableColumnsTableColumns: {
  key: string;
  header: string;
  headerIcon?: string;
}[] = [
  { key: 'id', header: 'ID', headerIcon: 'fa fa-hashtag' },
  { key: 'table_id', header: 'Table ID', headerIcon: 'fa fa-table' },
  { key: 'name', header: 'Column Name', headerIcon: 'fa fa-columns' },
  { key: 'data_type', header: 'Data Type', headerIcon: 'fa fa-database' },
  { key: 'is_dropdown', header: 'Is Dropdown', headerIcon: 'fa fa-list' },
  { key: 'is_unique', header: 'Is Unique', headerIcon: 'fa fa-key' },
  { key: 'owner_id', header: 'Owner', headerIcon: 'fa fa-user' },
  {
    key: 'created_at',
    header: 'Created At',
    headerIcon: 'fa fa-calendar-plus',
  },
  {
    key: 'updated_at',
    header: 'Updated At',
    headerIcon: 'fa fa-calendar-check',
  },
];
/// --------------------------------------------------- Add Table Column Form Fields --------------------------------------------------- //
export const addTableColumnFormFields: FormField[] = [
{
  name: 'table_id',
  label: 'Table ID',
  type: 'lookup',       // must be 'lookup'
  openModalOnClick: true,
  required: true,
  colSize: 6,
  options: [], // Populate this with actual table options
  modalMap: { table_id: 'id' } // map modal result 'id' → form field 'table_id'
},
{
  name: 'name',
  label: 'Column Name',
    type: 'text',
    required: true,
    colSize: 6,
  },
  {
    name: 'owner_id',
    label: 'Owner',
    type: 'lookup',       // must be 'lookup'
    openModalOnClick: true,
    required: true,
    colSize: 6,
    options: [], // Populate this with actual user options
    modalMap: { owner_id: 'id' } // map modal result 'id' → form field 'owner_id'
  },
  {
    name: 'created_by',
    label: 'Created By',
    type: 'lookup',       // must be 'lookup'
    openModalOnClick: true,
    required: true,
    colSize: 6,
    options: [], // Populate this with actual user options
    modalMap: { created_by: 'id' } // map modal result 'id' → form field 'created_by'
  },
  {
    name: 'data_type',
    label: 'Data Type',
    type: 'dropdown',
    required: true,
    colSize: 6,
    options: [
      { label: 'String', value: 'string' },
      { label: 'Integer', value: 'int' },
      { label: 'Date', value: 'date' },
      { label: 'Boolean', value: 'boolean' },
      { label: 'Enum', value: 'enum' },
      { label: 'Dropdown', value: 'dropdown' },
      { label: 'Password', value: 'password' },
    ],
  },
  {
    name: 'is_dropdown',
    label: 'Is Dropdown',
    type: 'dropdown',
    required: true,
    colSize: 6,
    options: [
      { label: 'Yes', value: 1 },
      { label: 'No', value: 0 },
    ],
  },
  {
    name: 'is_unique',
    label: 'Is Unique',
    type: 'dropdown',
    required: true,
    colSize: 6,
    options: [
      { label: 'Yes', value: 1 },
      { label: 'No', value: 0 },
    ],
  },
];

/// --------------------------------------------------- View & Edit Fields --------------------------------------------------- //
export function getTableColumnViewFields(column: TableColumns): Array<{ name: string; label: string; value: any }> {
  return [  
    { name: 'id', label: 'ID', value: column.id },
    { name: 'table_id', label: 'Table ID', value: column.table_id },
    //{ name: 'name', label: 'Column Name', value: column.name },
   // { name: 'data_type', label: 'Data Type', value: column.data_type },
    //{ name: 'is_dropdown', label: 'Is Dropdown', value: column.is_dropdown ? 'Yes' : 'No' },
    //{ name: 'is_unique', label: 'Is Unique', value: column.is_unique ? 'Yes' : 'No' },
   // { name: 'owner_id', label: 'Owner', value: column.owner_id },
    //{ name: 'created_at', label: 'Created At', value: column.created_at },
   // { name: 'updated_at', label: 'Updated At', value: column.updated_at },
    { name: 'value', label: 'Value', value: column.value },
    {name: 'table_name', label: 'Table Name', value: column.table_name },
    {name: 'column_name', label: 'Column Name', value: column.column_name }
  ];
}

export function getTableColumnEditFormFields(column: TableColumns): FormField[] {
  return [
    { name: 'id', label: 'ID', type: 'number', value: column.id },
    { name: 'table_id', label: 'Table ID', type: 'number', value: column.table_id, required: true, colSize: 6 },
    { name: 'name', label: 'Column Name', type: 'text', value: column.name, required: true, colSize: 6 },
    { name: 'data_type', label: 'Data Type', type: 'dropdown', value: column.data_type, required: true, colSize: 6,
      options: [
        { label: 'String', value: 'string' },
        { label: 'Integer', value: 'int' },
        { label: 'Date', value: 'date' },
        { label: 'Boolean', value: 'boolean' },
        { label: 'Enum', value: 'enum' },
        { label: 'Dropdown', value: 'dropdown' },
        { label: 'Password', value: 'password' },
      ],  
    },
    { name: 'is_dropdown', label: 'Is Dropdown', type: 'dropdown', value: column.is_dropdown ? 1 : 0, required: true, colSize: 6,
      options: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 },
      ],
    },
    { name: 'is_unique', label: 'Is Unique', type: 'dropdown', value: column.is_unique ? 1 : 0, required: true, colSize: 6,
      options: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 },
      ],
    },
    { name: 'owner_id', label: 'Owner', type: 'select', value: column.owner_id, required: true, colSize: 6, options: [] }, // Populate options
    { name: 'created_by', label: 'Created By', type: 'number', value: column.created_by, required: true, colSize: 6 },
  ];
}
