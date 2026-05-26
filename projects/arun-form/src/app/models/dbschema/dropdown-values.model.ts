import { FormField } from "@lib/models/FormField.model";

export interface DropdownValue {
  id: number;               // Unique dropdown option (Primary Key)
  column_id: number;        // References the column it belongs to (Foreign Key)
  value: string;            // Dropdown text
  created_by: number;       // User who added it (Foreign Key)
  created_at: string;
  table_name?: string;
}
/// --------------------------------------------------- Table Columns --------------------------------------------------- //
export const dropdownValuesTableColumns: { key: string; header: string; headerIcon?: string }[] = [
  { key: 'id', header: 'ID', headerIcon: 'fa fa-hashtag' },
  
  {key: 'column_name', header: 'Column Name', headerIcon: 'fa fa-list-alt' },
  { key: 'value', header: 'Value', headerIcon: 'fa fa-text' },
  { key: 'table_name', header: 'Name', headerIcon: 'fa fa-list' }
];

/// --------------------------------------------------- Add Dropdown Value Form Fields --------------------------------------------------- //
export const addDropdownValueFormFields: FormField[] = [
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
    name: 'column_id',
    label: 'Column ID',
    type: 'lookup',
    openModalOnClick: true,
    options: [],
    modalMap: { column_id: 'id' }, // map modal result 'id' → form field 'column_id'
    required: true,
    colSize: 6,
  },
  {
    name: 'created_by',
    label: 'Created By',
    type: 'lookup',
    openModalOnClick: true,
    options: [],
    modalMap: { created_by: 'id' }, // map modal result 'id' → form field 'created_by'
    required: true,
    colSize: 6,
  },
  {
    name: 'value',
    label: 'Value',
    type: 'input',
    required: true,
    colSize: 6,
    showWhen: { field: 'is_dropdown', value: 1 }, // ✅ Show only if 'is_dropdown' = Yes
  },
];


/// --------------------------------------------------- View & Edit Fields --------------------------------------------------- //
export function getDropdownValueViewFields(value: DropdownValue): Array<{ name: string; label: string; value: any; labelIcon: string; type?: string }> {
  return [
    { name: 'column_id', label: 'Column ID', value: value.column_id, labelIcon: 'fa fa-columns' },
    { name: 'value', label: 'Value', value: value.value, labelIcon: 'fa fa-text' },
    { name: 'table_name', label: 'Table Name', value: value.table_name, labelIcon: 'fa fa-table' }
  ];
}

export function getDropdownValueEditFields(value: DropdownValue): FormField[] {
  return [
    { name: 'column_id', label: 'Column ID', type: 'input', value: value.column_id },
    { name: 'value', label: 'Value', type: 'input', value: value.value },
  ];
}