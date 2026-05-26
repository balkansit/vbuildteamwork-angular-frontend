import { Component } from '@angular/core';
import { FormField } from '@lib/models/FormField.model';
import { AddEditModalService } from '@lib/services/components/add-edit-modal.service';
import { SpinnerLoadingService } from '@lib/services/components/spinner-loading.service';
import { addUserFormFields, dataUserTableColumns, getUserEditFormFields, getUserViewFields, User } from 'projects/arun-form/src/app/models/dbschema/users.model';
import { RoleService } from 'projects/arun-form/src/app/services/apis/role.service';
import { UserService } from 'projects/arun-form/src/app/services/apis/user.service';

@Component({
  selector: 'app-all-user',
  standalone: false,
  templateUrl: './all-user.component.html',
  styleUrl: './all-user.component.css',
})
export class AllUserComponent {
   // --------------------------------------------------- Alert configurations --------------------------------------------------- //
    alert: { type: string; message: string } | null = null;
    useModalAlert = true;
    // --------------------------------------------------- All table configurations --------------------------------------------------- //
    tableColumns = dataUserTableColumns;
    // --------------------------------------------------- Role-based access configurations --------------------------------------------------- //
    whoCanEditDelete = ['admin', 'super_admin'];
    whoCanView = ['admin', 'super_admin', 'staff'];
    // --------------------------------------------------- All filter configurations --------------------------------------------------- //
    filterColumns = [
      { key: 'id', label: 'ID', filterable: true, type: 'input' },
      { key: 'email', label: 'Email', filterable: true, type: 'input' },
      { key: 'phone', label: 'Phone', filterable: true, type: 'input' },
    ];
  
    // --------------------------------------------------- Constructor --------------------------------------------------- //
    constructor(private userService: UserService, private roleService: RoleService, private addEditModalService: AddEditModalService, private spinner: SpinnerLoadingService) { }
    // --------------------------------------------------- All API calls --------------------------------------------------- //
    fetchUsers = () => this.userService.getAll();
    getViewFields = getUserViewFields;
    getEditFields = (user: User): FormField<User>[] => {
      // Step 1: Initialize fields synchronously
      const fields = getUserEditFormFields(user);
      console.log('Initial fields:', fields);
  
      // Step 2: Fetch roles asynchronously
      this.roleService.getAll().subscribe({
        next: (res) => {
          const roleOptions = res.data.map((r: { name: any; id: any; }) => ({
            label: r.name,
            value: r.id,
          }));
  
          // Step 3: Find role_id field
          const roleField = fields.find(f => f.name === 'role_id');
          if (roleField) {
            // Step 4: Set options
            roleField.options = roleOptions;
  
            // Step 5: Ensure correct role is selected by matching id
            const matched = roleOptions.find((o: { value: number; }) => o.value === user.role_id);
            if (matched) {
              roleField.value = matched.value;
            }
          }
        },
        error: (err) => {
          console.error('Failed to fetch roles:', err);
          this.alert = { type: 'danger', message: 'Failed to load roles!' };
        }
      });
  
      return fields;
    };
    updateUser = (id: number, data: any) => this.userService.update(id, data);
    deleteUser = (id: number) => this.userService.delete(id);
    // --------------------------------------------------- Add User Modal --------------------------------------------------- //
  
    openAddUser() {
      this.roleService.getAll().subscribe({
        next: (roles) => {
          // Map roles into dropdown format
          const roleOptions = roles.data.map((r: any) => ({
            label: r.name,   
            value: r.id
          }));
  
          // Clone addUserFormFields and inject role options
          const formFields = addUserFormFields.map((field) => {
            if (field.name === 'role_id') {
              return { ...field, options: roleOptions };
            }
            return field;
          });
  
          this.addEditModalService.addItem(
            'user',
            () => formFields,
            (data: User) => this.userService.create(data),
            () => this.fetchUsers(),
            this.spinner,
            (a: any) => (this.alert = a),
            this.useModalAlert
          );
        },
        error: (err) => {
          console.error('Failed to fetch roles:', err);
          this.alert = { type: 'danger', message: 'Failed to load roles!' };
        }
      });
    }
  
}


