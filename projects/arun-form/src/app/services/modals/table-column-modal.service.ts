import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericSelectorDialogComponent } from '@lib/features/dialogs/generic-selector-dialog/generic-selector-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class TableColumnModalService {
  constructor(private dialog: MatDialog) {}

  open(tables: any[]) {
    return this.dialog.open(GenericSelectorDialogComponent, {
      width: '85vw',
      data: {
        title: 'Select Table Details',
        data: tables,
        displayedColumns: [
          'id',
          'name',
          'owner_id',
          'data_type',
          'is_dropdown',
          'is_unique',
        ],

        columnHeaders: {
          id: 'ID',
          name: 'Table Name',
          owner_id: 'Owner ID',
          data_type: 'Data Type',
          is_dropdown: 'Is Dropdown',
          is_unique: 'Is Unique',
        },

        filterableColumns: ['owner_id', 'id'],

        filterColumns: [
          { key: 'id', label: 'ID', type: 'input' },
          { key: 'owner_id', label: 'Owner ID', type: 'input' },
          { key: 'data_type', label: 'Data Type', type: 'input' },
          {
            key: 'is_dropdown',
            label: 'Is Dropdown',
            type: 'input',
          },
          {
            key: 'is_unique',
            label: 'Is Unique',
            type: 'input',
          },
        ],
      },
    });
  }
}
