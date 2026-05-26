import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { dropdownValuesTableColumns } from 'projects/arun-form/src/app/models/dbschema/dropdown-values.model';
import { getTableColumnEditFormFields, getTableColumnViewFields } from 'projects/arun-form/src/app/models/dbschema/table-columns.model';
import { DropdownValuesService } from 'projects/arun-form/src/app/services/apis/dropdown-values.service';

@Component({
  selector: 'app-all-column-value',
  standalone: false,
  templateUrl: './all-column-value.component.html',
  styleUrls: ['./all-column-value.component.css']
})
export class AllColumnValueComponent {


  // --------------------------------------------------- All table configurations --------------------------------------------------- //
  tableColumns = dropdownValuesTableColumns;

  // --------------------------------------------------- All filter configurations --------------------------------------------------- //
  filterColumns = [
    { key: 'id', label: 'ID', filterable: true, type: 'input' },
    { key: 'column_name', label: 'Column Name', filterable: true, type: 'input' },
    { key: 'value', label: 'Value', filterable: true, type: 'input' },
  ];
  userService: any;

  // --------------------------------------------------- Constructor --------------------------------------------------- //
  constructor(private service: DropdownValuesService, private router: Router) { }
  // --------------------------------------------------- All API calls --------------------------------------------------- //
  fetchProducts = () => this.service.getAll();
  getViewFields = getTableColumnViewFields;
  deleteProduct = (id: number) => this.service.delete(id);
  // --------------------------------------------------- Navigation --------------------------------------------------- //
  goToAdd = () => this.router.navigate(['/dashboard/tables/add-table-value']);

  navigateToEdit = (table: any) => {
    this.router.navigate(
      ['/dashboard/tables/edit-table-value', table.id],
      { state: { tableData: table } }
    );
  };

  getEditFields = (user: any) => {
    // Step 1: Initialize fields synchronously
    const fields = getTableColumnEditFormFields(user);
    console.log('Initial fields:', fields);

    // Step 2: Fetch roles asynchronously
    this.service.getAll().subscribe({
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
        // Optionally handle error UI
      }
    });

    return fields;
  };
  updateUser = (id: number, data: any) => this.userService.update(id, data);
}
