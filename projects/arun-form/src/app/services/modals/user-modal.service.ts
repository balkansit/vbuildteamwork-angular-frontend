import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericSelectorDialogComponent } from '@lib/features/dialogs/generic-selector-dialog/generic-selector-dialog.component';
import { User } from '../../models/dbschema/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserModalService {
 constructor(private dialog: MatDialog) {}

  open(users: User[]) {
    return this.dialog.open(GenericSelectorDialogComponent, {
      width: '85vw',
      data: {
        title: 'Select User Details',
        data: users,
        displayedColumns: [
          'id',
          'name',
          'email',
          'phone',
          'role_id'
        ],

        columnHeaders: {
          id: 'ID',
          email: 'Email',
          phone: 'Phone',
          name: 'Name',
          role_id: 'Role ID'
        },

        filterableColumns: [
          'phone',
          'role_id',
          'email',
          'id'
        ],

        filterColumns: [
          { key: 'id', label: 'ID', type: 'input' },
          { key: 'email', label: 'Email', type: 'input' },
          { key: 'phone', label: 'Phone', type: 'input' },
          { key: 'role_id', label: 'Role ID', type: 'input' }
        ],
      },
    });
  }
}
