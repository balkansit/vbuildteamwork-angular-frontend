import { FormField } from '@lib/models/FormField.model';

export interface Table {
  id: number; // Unique table ID
  name: string; // Table name (e.g., Customers, Orders)
  owner_id: number; // Primary owner of the table
  status_controlled_by: number; // User/role that controls status transitions
  data_controlled_by: number; // Who controls records/columns
  visibility_controlled_by: number; // Who can see/use this table
  type: 'group1' | 'group2' | 'group3' | 'special'; // Group classification
  created_by: number; // Who created the table
  created_at: string; // Timestamp (ISO string)
  updated_at: string; // Timestamp (ISO string)
}
/// --------------------------------------------------- Table Columns --------------------------------------------------- //
export const dataTableColumns: {
  key: string;
  header: string;
  headerIcon?: string;
}[] = [
  { key: 'id', header: 'ID', headerIcon: 'fa fa-hashtag' },
  { key: 'name', header: 'Table Name', headerIcon: 'fa fa-table' },
  { key: 'type', header: 'Type', headerIcon: 'fa fa-tags' },
  { key: 'owner_id', header: 'Owner', headerIcon: 'fa fa-user' },



];

/// --------------------------------------------------- Table Columns with Filters --------------------------------------------------- //

export const buildColumnsWithFilters = (data: any): any[] => {
  return (
    data?.map((col: any) => {
      // Base column properties
      const column: any = {
        key: col.name,
        name: col.name,
        owner_id: col.owner_id,
        created_by: col.created_by,
        type: col.data_type,
        value: col.value || null,
        is_dropdown: col.is_dropdown,
        disabled: col.disabled || false,
        dropdown_values: col.dropdown_values,
        label: col.name
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (c: string) => c.toUpperCase()), // "column_1" -> "Column 1"
        headerIcon:
          col.data_type === 'string'
            ? 'fa fa-font'
            : col.data_type === 'date'
            ? 'fa fa-calendar'
            : col.data_type === 'enum'
            ? 'fa fa-list'
            : 'fa fa-database',

        // Filter properties
        filterable: true,
        filterType: col.is_dropdown ? 'dropdown2' : 'input',
      };

      let options = [];
      if (
        col.is_dropdown &&
        col.dropdown_values &&
        col.dropdown_values.length
      ) {
        options.push({ label: 'Select...', value: null }); // Add Clear option
        options.push(
          ...col.dropdown_values.map((v: any) => ({
            label: v.value,
            value: v.value,
          }))
        );
      }
      column.options = options;

      return column;
    }) ?? []
  );
};

// --------------------------------------------------- Table Columns (Dynamic Only) --------------------------------------------------- //
export const buildTableColumns = (data: any) => {
  return (
    data?.map((col: any) => {
      const isTotal = String(col.name).toLowerCase() === 'total';
      return {
        key: col.name,
        header: col.name
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (c: string) => c.toUpperCase()), // "column_1" -> "Column 1"
        type: isTotal ? 'number-highlight' : undefined,
        headerIcon:
          col.data_type === 'string'
            ? 'fa fa-font'
            : col.data_type === 'date'
            ? 'fa fa-calendar'
            : col.data_type === 'enum'
            ? 'fa fa-list'
            : 'fa fa-database',
      };
    }) ?? []
  );
};

  // {
  //   key: 'status',
  //   header: 'Status',
  //   headerIcon: 'fa fa-info',
  //   type: 'status-chip',
  //   options: {
  //     completed: 'primary',
  //     ordered: 'info',
  //     danger: 'danger',
  //     partially_received: 'warning',
  //     draft: 'secondary',
  //   },
  // },

interface FilterColumn {
  key: string;
  label: string;
  filterable: boolean;
  type: 'input' | 'dropdown';
  options?: string[];
  disabled?: boolean; // 👈 add this
}

export function buildFilterColumns(columns: any): FilterColumn[] {
  return columns.map(
    (col: {
      name: string;
      is_dropdown: any;
      dropdown_values: any[];
      disabled?: boolean; // 👈 add this
    }) => {
      const filterCol: FilterColumn = {
        key: col.name,
        label: col.name
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        filterable: true,
        type: col.is_dropdown ? 'dropdown' : 'input',
        disabled: col.disabled || false,  // 👈 carry over disabled status
      };

      if (col.is_dropdown && col.dropdown_values.length > 0) {
        filterCol.options = col.dropdown_values.map((v) => v.value);
      }

      return filterCol;
    }
  );
}


/// --------------------------------------------------- Add Table Form Fields --------------------------------------------------- //
export const addTableFormFields: FormField[] = [
  {
    name: 'name',
    label: 'Table Name',
    type: 'text',
    required: true,
    colSize: 6,
  },
  {
    name: 'created_by',
    label: 'Created By',
    type: 'lookup',
    required: true,
    
    colSize: 6,
    openModalOnClick: true,
    options: [],
    modalMap: { created_by: 'id' }, // map modal result 'id' → form field 'created_by'
  },
  {
    name: 'owner_id',
    label: 'Owner',
    type: 'lookup',
    required: true,
    colSize: 6,
    openModalOnClick: true,
    options: [],
    modalMap: { owner_id: 'id' }, // map modal result 'id' → form field 'owner_id'
  },

  {
    name: 'status_controlled_by',
    label: 'Status Controlled By',
    type: 'lookup',
    openModalOnClick: true,
    required: true,
    colSize: 6,
    options: [], // Populate this with actual user options
    modalMap: { status_controlled_by: 'id' }, // map modal result 'id' → form field 'status_controlled_by'
  },
  {
    name: 'data_controlled_by',
    label: 'Data Controlled By',
    type: 'lookup',
    openModalOnClick: true,
    required: true,
    colSize: 6,
    options: [], // Populate this with actual user options
    modalMap: { data_controlled_by: 'id' }, // map modal result 'id' → form field 'data_controlled_by'
  },
  {
    name: 'visibility_controlled_by',
    label: 'Visibility Controlled By',
    type: 'lookup',
    openModalOnClick: true,
    required: true,
    colSize: 6,
    options: [], // Populate this with actual user options
    modalMap: { visibility_controlled_by: 'id' }, // map modal result 'id' → form field 'visibility_controlled_by'
  },
  {
    name: 'type',
    label: 'Type',
    type: 'dropdown',
    required: true,
    colSize: 6,
    options: [
      { label: 'Group 1', value: 'group1' },
      { label: 'Group 2', value: 'group2' },
      { label: 'Group 3', value: 'group3' },
      { label: 'Special', value: 'special' },
    ],
  },
];

/// --------------------------------------------------- View & Edit Fields --------------------------------------------------- //
export function getTableViewFields(table: Table): Array<{
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
      value: table.id,
      labelIcon: 'fas fa-hashtag',
    },
    {
      name: 'name',
      label: 'Table Name',
      value: table.name,
      labelIcon: 'fas fa-table',
    },
    {
      name: 'type',
      label: 'Type',
      value: table.type,
      labelIcon: 'fas fa-tags',
    },
    {
      name: 'owner_id',
      label: 'Owner',
      value: table.owner_id,
      labelIcon: 'fas fa-user',
    },
    // {
    //   name: 'status_controlled_by',
    //   label: 'Status Controlled By',

    //   value: table.status_controlled_by,
    //   labelIcon: 'fas fa-user-shield',
    // },
    // {
    //   name: 'data_controlled_by',
    //   label: 'Data Controlled By',
    //   value: table.data_controlled_by,
    //   labelIcon: 'fas fa-user-cog',
    // },
    {
      name: 'visibility_controlled_by',
      label: 'Visibility Controlled By',
      value: table.visibility_controlled_by,
      labelIcon: 'fas fa-user-lock',
    },
  ];
}

export function getTableEditFormFields(table: Table): FormField<Table>[] {
  return [
    {
      name: 'name',
      label: 'Table Name',
      type: 'text',
      required: true,
      colSize: 6,
      value: table.name,
    },
    {
      name: 'created_by',
      label: 'Created By',
      type: 'number',
      required: true,
      colSize: 6,
      value: table.created_by,
    },
    {
      name: 'owner_id',
      label: 'Owner',
      type: 'select',
      required: true,
      colSize: 6,
      options: [], // Populate this with actual user options
      value: table.owner_id,
    },
    {
      name: 'status_controlled_by',
      label: 'Status Controlled By',
      type: 'select',
      required: true,
      colSize: 6,
      options: [], // Populate this with actual user options
      value: table.status_controlled_by,
    },
    {
      name: 'data_controlled_by',
      label: 'Data Controlled By',
      type: 'select',
      required: true,
      colSize: 6,
      options: [], // Populate this with actual user options
      value: table.data_controlled_by,
    },
    {
      name: 'visibility_controlled_by',
      label: 'Visibility Controlled By',
      type: 'select',
      required: true,
      colSize: 6,
      options: [], // Populate this with actual user options
      value: table.visibility_controlled_by,
    },
    {
      name: 'type',
      label: 'Type',
      type: 'dropdown',
      required: true,
      colSize: 6,
      options: [
        { label: 'Group 1', value: 'group1' },
        { label: 'Group 2', value: 'group2' },
        { label: 'Group 3', value: 'group3' },
        { label: 'Special', value: 'special' },
      ],
      value: table.type,
    },
  ];
}
