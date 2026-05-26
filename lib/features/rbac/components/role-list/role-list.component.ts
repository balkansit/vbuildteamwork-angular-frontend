import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddEditModalService } from '@lib/services/components/add-edit-modal.service';
import { SpinnerLoadingService } from '@lib/services/components/spinner-loading.service';
import {
  addRoleFormFields,
  dataRoleTableColumns,
  getRoleEditFormFields,
  getRoleViewFields,
  Role,
} from '../../models/role.model';
import { RoleService } from '../../services/role.service';
import { BaseTableComponent } from '@lib/components/tables/base-table/base-table.component';

@Component({
  selector: 'app-role-list',
  standalone: false,
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent {
  @ViewChild(BaseTableComponent) table!: BaseTableComponent<Role>;

  alert: { type: string; message: string } | null = null;
  useModalAlert = true;
  tableColumns = dataRoleTableColumns;

  whoCanEditDelete = ['admin', 'super_admin'];
  whoCanView = ['admin', 'super_admin', 'staff'];

  constructor(
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private addEditModalService: AddEditModalService,
    private spinner: SpinnerLoadingService
  ) {}

  fetchRoles = () => this.roleService.getAll();
  getViewFields = getRoleViewFields;
  getEditFields = getRoleEditFormFields;

  updateRole = (id: number, data: any) => this.roleService.update(id, data);
  deleteRole = (id: number) => this.roleService.delete(id);

  openAddRole() {
    this.addEditModalService.addItem(
      'role',
      () => addRoleFormFields,
      (data: Role) => this.roleService.create(data),
      () => this.table.refresh(),
      this.spinner,
      (a: any) => (this.alert = a),
      this.useModalAlert
    );
  }

  goToEdit(role: Role) {
    this.router.navigate(['edit-role', role.id], { relativeTo: this.route });
  }
}
