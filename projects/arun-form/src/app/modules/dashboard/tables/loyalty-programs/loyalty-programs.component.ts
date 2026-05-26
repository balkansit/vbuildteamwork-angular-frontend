import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  getTableRecordEditFormFields,
  getTableRecordViewFields,
  tableRecordsTableColumns,
} from 'projects/arun-form/src/app/models/dbschema/table-records.model';
import { TableRecordsService } from 'projects/arun-form/src/app/services/apis/table-record.service';

@Component({
  selector: 'app-loyalty-programs',
  templateUrl: './loyalty-programs.component.html',
  styleUrls: ['./loyalty-programs.component.css'],
  standalone: false,
})
export class LoyaltyProgramsComponent {
  // --------------------------------------------------- Table configurations --------------------------------------------------- //
  tableColumns = tableRecordsTableColumns;
  // --------------------------------------------------- Filter configurations --------------------------------------------------- //
  filterColumns: any[] = [
    { key: 'name', label: 'tablerecord Name', type: 'input' },
    { key: 'phone', label: 'Contact Number', type: 'input' },
    { key: 'address', label: 'Address', type: 'input' },
    { key: 'email', label: 'Email', type: 'input' },
  ];
  // --------------------------------------------------- Constructor --------------------------------------------------- //
  constructor(private service: TableRecordsService, private router: Router) {}
  // --------------------------------------------------- API calls --------------------------------------------------- //
  fetchtablerecords = () => this.service.getAll();
  getViewFields = getTableRecordViewFields;
  getEditFields = getTableRecordEditFormFields;
  updatetablerecord = (id: number, data: any) => this.service.update(id, data);
  deletetablerecord = (id: number) => this.service.delete(id);
  // --------------------------------------------------- Navigation --------------------------------------------------- //
  goToAdd = () => this.router.navigate(['/dashboard/tablerecord/add']);
}
