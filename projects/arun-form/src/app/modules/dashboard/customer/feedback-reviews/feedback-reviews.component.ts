import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilterColumn } from '@lib/components/tables/base-table/base-table.component';
import { dropdownValuesTableColumns, getDropdownValueEditFields, getDropdownValueViewFields } from 'projects/arun-form/src/app/models/dbschema/dropdown-values.model';
import { DropdownValuesService } from 'projects/arun-form/src/app/services/apis/dropdown-values.service';
@Component({
  selector: 'app-feedback-reviews',
  templateUrl: './feedback-reviews.component.html',
  styleUrls: ['./feedback-reviews.component.css'],
  standalone: false,
})
export class FeedbackReviewsComponent {
  // --------------------------------------------------- Table configurations --------------------------------------------------- //
  tableColumns = dropdownValuesTableColumns;
  // --------------------------------------------------- Filter configurations --------------------------------------------------- //
  filterColumns: FilterColumn[] = [
    { key: 'column_id', label: 'Column ID', type: 'input' },
    { key: 'value', label: 'Value', type: 'input' },

  ];
  // --------------------------------------------------- Constructor --------------------------------------------------- //
  constructor(private service: DropdownValuesService, private router: Router) {}
  // --------------------------------------------------- API calls --------------------------------------------------- //
  fetchtablerecords = () => this.service.getAll();
  getViewFields = getDropdownValueViewFields;
  getEditFields = getDropdownValueEditFields;
  updateDropdownValue = (id: number, data: any) => this.service.update(id, data);
  deleteDropdownValue = (id: number) => this.service.delete(id);
  // --------------------------------------------------- Navigation --------------------------------------------------- //
  goToAdd = () => this.router.navigate(['/dashboard/customer/create']);
}
