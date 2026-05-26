import { FormField } from '@lib/models/FormField.model';

export interface TableRecord {
  id: number; // Unique record ID
  table_id: number; // Reference to Tables
  owner_id: number; // User who owns the record
  created_by: number; // Who inserted the record
  status: 'Complete' | 'Incomplete'; // Record status
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}
/// --------------------------------------------------- Table Columns --------------------------------------------------- //
export const tableRecordsTableColumns: {
  key: string;
  header: string;
  headerIcon?: string;
}[] = [
  { key: 'id', header: 'ID', headerIcon: 'fa fa-hashtag' },
  { key: 'table_id', header: 'Table ID', headerIcon: 'fa fa-table' },
  { key: 'owner_id', header: 'Owner ID', headerIcon: 'fa fa-user' },
  { key: 'created_by', header: 'Created By', headerIcon: 'fa fa-user' },
  { key: 'status', header: 'Status', headerIcon: 'fa fa-info-circle' },
];
/// --------------------------------------------------- Add Table Record Form Fields --------------------------------------------------- //
export const addTableRecordFormFields: FormField[] = [
  {
    name: 'table_id',
    label: 'Table ID',
    type: 'number',
    openModalOnClick: true,   // VERY important
    required: true,
    colSize: 6,
    options: [],              // populate if needed
    modalMap: { table_id: 'id' },  // map modal result 'id' → form field 'table_id'
  },
  {
    name: 'created_by',
    label: 'Created By',
    type: 'number',
    required: true,
    colSize: 6,
  },
  {
    name: 'owner_id',
    label: 'Owner ID',
    type: 'number',
    required: true,
    colSize: 6,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'dropdown',
    required: true,
    colSize: 6,
    options: [
      { label: 'Complete', value: 'Complete' },
      { label: 'Incomplete', value: 'Incomplete' },
    ],
  },
//    {
//     name: 'values',
//     label: 'Values',
//     type: 'array', // handled by your form library
//     required: true,
//     colSize: 12,
//     fields: [
//       { name: 'column_id', label: 'Column ID', type: 'number', required: true, colSize: 6 },
//       { name: 'value', label: 'Value', type: 'text', required: true, colSize: 6 },
//     ],
//   },
];

export function getDynamicFormFields(
  columns: Array<{
    name: string;
    data_type: string;
    is_dropdown?: boolean;
    dropdown_values?: Array<{ id: any; value: string }>;
  }>
): FormField[] {
  return columns.map((col) => {
    let fieldType = 'text'; // default

    // Determine type based on data_type
    if (col.data_type === 'date') fieldType = 'date';
    else if (col.data_type === 'enum' || col.is_dropdown)
      fieldType = 'dropdown';

    // Prepare dropdown options if needed
    let options: { label: string; value: any }[] = [];
    if (
      col.is_dropdown &&
      col.dropdown_values &&
      col.dropdown_values.length > 0
    ) {
      options = col.dropdown_values.map((v) => ({
        label: v.value,
        value: v.id,
      }));
    }

    return {
      name: col.name,
      label: col.name
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      type: fieldType,
      colSize: 6,
      options: options,
    };
  });
}


/// --------------------------------------------------- View & Edit Fields --------------------------------------------------- //
export function getTableRecordViewFields(
  record: TableRecord
): Array<{ name: string; label: string; value: any }> {
  return [
    { name: 'id', label: 'ID', value: record.id },
    { name: 'table_id', label: 'Table ID', value: record.table_id },
    { name: 'owner_id', label: 'Owner ID', value: record.owner_id },
    { name: 'status', label: 'Status', value: record.status },
    { name: 'created_at', label: 'Created At', value: record.created_at },
    { name: 'updated_at', label: 'Updated At', value: record.updated_at },
  ];
}
export function getTableRecordEditFormFields(record: TableRecord): FormField[] {
  return [
    {
      name: 'id',
      label: 'ID',
      type: 'number',
      required: true,
      colSize: 6,
      value: record.id,
    },
    {
      name: 'table_id',
      label: 'Table ID',
      type: 'number',
      required: true,
      colSize: 6,
      value: record.table_id,
    },
    {
      name: 'owner_id',
      label: 'Owner ID',
      type: 'number',
      required: true,
      colSize: 6,
      value: record.owner_id,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'dropdown',
      required: true,
      colSize: 6,
      options: [
        { label: 'Complete', value: 'Complete' },
        { label: 'Incomplete', value: 'Incomplete' },
      ],
      value: record.status,
    },
  ];
}
