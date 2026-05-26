import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TableColumn } from '@lib/components/tables/base-table/base-table.component';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  dataUserColumns: TableColumn[] = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    { key: 'created_at', header: 'Created At', sortable: true, type: 'date' },
  ];

  fetchUsers = () => this.userService.getAll();

  constructor(public userService: UserService) {}
}
