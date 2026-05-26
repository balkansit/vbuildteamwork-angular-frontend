import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericSelectorDialogComponent } from '@lib/features/dialogs/generic-selector-dialog/generic-selector-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class TableModalService {
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
          'type',
          'status_controlled_by',
          'data_controlled_by',
          'visibility_controlled_by',
        ],

        columnHeaders: {
          id: 'ID',
          name: 'Table Name',
          owner_id: 'Owner ID',
          type: 'Type',
          status_controlled_by: 'Status Controlled By',
          data_controlled_by: 'Data Controlled By',
          visibility_controlled_by: 'Visibility Controlled By',
        },

        filterableColumns: ['owner_id', 'id'],

        filterColumns: [
          { key: 'id', label: 'ID', type: 'input' },
          { key: 'owner_id', label: 'Owner ID', type: 'input' },
          { key: 'type', label: 'Type', type: 'input' },
          {
            key: 'status_controlled_by',
            label: 'Status Controlled By',
            type: 'input',
          },
          {
            key: 'data_controlled_by',
            label: 'Data Controlled By',
            type: 'input',
          },
          {
            key: 'visibility_controlled_by',
            label: 'Visibility Controlled By',
            type: 'input',
          },
        ],
      },
    });
  }
}
