import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  dataTableColumns,
  getTableEditFormFields,
  getTableViewFields,
} from 'projects/arun-form/src/app/models/dbschema/tables.model';
import { TableService } from 'projects/arun-form/src/app/services/apis/table.service';

@Component({
  selector: 'app-all-tables',
  templateUrl: './all-tables.component.html',
  styleUrls: ['./all-tables.component.css'],
  standalone: false,
})
export class AllTablesComponent {
  // --------------------------------------------------- All table configurations --------------------------------------------------- //
  tableColumns = dataTableColumns;
  // --------------------------------------------------- All filter configurations --------------------------------------------------- //
  filterColumns = [
    { key: 'name', label: 'Name', filterable: true, type: 'input' },
    { key: 'owner_id', label: 'Owner ID', filterable: true, type: 'input' },
    {
      key: 'status_controlled_by',
      label: 'Status Controlled By',
      filterable: true,
      type: 'input',
    },
    {
      key: 'type',
      label: 'Type',
      filterable: true,
      type: 'dropdown',
      options: ['group1', 'group2', 'group3', 'special'],
    },
  ];

  // --------------------------------------------------- Constructor --------------------------------------------------- //
  constructor(private service: TableService, private router: Router) { }
  // --------------------------------------------------- All API calls --------------------------------------------------- //
  fetchProducts = () => this.service.getAll();
  getEditFields = (table: any) => {
    return getTableEditFormFields(table);
  };

  getViewFields = (table: any) => getTableViewFields(table);

  deleteProduct = (id: number) => this.service.delete(id);
  // --------------------------------------------------- Navigation --------------------------------------------------- //
  goToAdd = () => this.router.navigate(['/dashboard/tables/table-view']);

  navigateToEdit = (table: any) => {
    this.router.navigate(['/dashboard/tables/table-view', table.id], {
      queryParams: { mode: 'edit' },
    });
  };

  navigateToView = (table: any) => {
    this.router.navigate(['/dashboard/tables/table-view', table.id], {
      queryParams: { mode: 'view' },
    });
  };
}
