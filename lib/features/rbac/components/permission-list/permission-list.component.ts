import { Component } from '@angular/core';
import { PermissionService } from '../../services/permission.service';
import { TableColumn } from '@lib/components/tables/base-table/base-table.component';

@Component({
  selector: 'app-permission-list',
  standalone: false,
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css'],
})
export class PermissionListComponent {
  dataPermissionColumns: TableColumn[] = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Permission Name', sortable: true },
    { key: 'guard_name', header: 'Guard Name', sortable: true },
    { key: 'created_at', header: 'Created At', sortable: true, type: 'date' },
  ];

  fetchPermissions = () => this.permissionService.getAll();

  constructor(public permissionService: PermissionService) {}
}
