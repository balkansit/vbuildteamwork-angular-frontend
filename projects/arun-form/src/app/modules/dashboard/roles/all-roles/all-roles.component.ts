import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddEditModalService } from '@lib/services/components/add-edit-modal.service';
import { SpinnerLoadingService } from '@lib/services/components/spinner-loading.service';
import {
  addRoleFormFields,
  dataRoleTableColumns,
  getRoleEditFormFields,
  getRoleViewFields,
  Role,
} from 'projects/arun-form/src/app/models/dbschema/roles.model';
import { RoleService } from 'projects/arun-form/src/app/services/apis/role.service';

@Component({
  selector: 'app-all-roles',
  standalone: false,
  templateUrl: './all-roles.component.html',
  styleUrl: './all-roles.component.css',
})
export class AllRolesComponent {
  // --------------------------------------------------- Alert configurations --------------------------------------------------- //
  alert: { type: string; message: string } | null = null;
  useModalAlert = true;
  // --------------------------------------------------- Table configurations --------------------------------------------------- //
  tableColumns = dataRoleTableColumns;
  // --------------------------------------------------- Role-based access configurations --------------------------------------------------- //
  whoCanEditDelete = ['admin', 'super_admin'];
  whoCanView = ['admin', 'super_admin', 'staff'];
  // --------------------------------------------------- All filter configurations --------------------------------------------------- //
  filterColumns = [
    { key: 'id', label: 'ID', filterable: true, type: 'input' },
    { key: 'name', label: 'Role Name', filterable: true, type: 'input' },
    { key: 'slug', label: 'Slug', filterable: true, type: 'input' },
  ];
  roles: Role[] = [];

  // --------------------------------------------------- Constructor --------------------------------------------------- //
  constructor(
    private roleService: RoleService,
    private router: Router,
    private addEditModalService: AddEditModalService,
    private spinner: SpinnerLoadingService
  ) {}
  // --------------------------------------------------- API calls --------------------------------------------------- //
  
   fetchRoles() {
  this.spinner.show(); // show spinner
  this.roleService.getAll().subscribe({
    next: (res) => {
      this.roles = res.data; // update roles array
    },
    error: (err) => {
      console.error('Error fetching roles:', err);
    },
    complete: () => {
      this.spinner.hide(); // hide spinner
      console.log('Fetch roles completed');
    }
  });
}

  ngOnInit() {
    this.fetchRoles(); // initial fetch
  }
  getViewFields = getRoleViewFields;
  getEditFields = getRoleEditFormFields;
  updateRole = (id: number, data: any) => this.roleService.update(id, data);
  deleteRole = (id: number) => this.roleService.delete(id);
  // --------------------------------------------------- Navigation --------------------------------------------------- //
  goToAdd = () => this.router.navigate(['/dashboard/roles/add-new-role']);

  openAddRole() {
    this.addEditModalService.addItem(
      'role',
      () => addRoleFormFields, // Use the addRoleFormFields instead of getUserEditFormFields
      (data: Role) => this.roleService.create(data), // create only
      () => this.getRoles(),
      this.spinner,
      (a: any) => (this.alert = a),
      this.useModalAlert
    );
  }

  getRoles() {
    this.fetchRoles();
  }

  navigateToEdit = (role: any) => {
    this.router.navigate(['/dashboard/roles/edit-role', role.id]);
  };
}
