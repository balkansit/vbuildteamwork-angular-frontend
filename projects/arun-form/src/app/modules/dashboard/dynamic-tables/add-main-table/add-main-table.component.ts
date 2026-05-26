import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject, Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TableRecordsService } from 'projects/arun-form/src/app/services/apis/table-record.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-main-table',
  standalone: false,
  templateUrl: './add-main-table.component.html',
  styleUrls: ['./add-main-table.component.css']
})
export class AddMainTableComponent implements OnInit {
  form!: FormGroup;
  @Input() tableId!: number;
  @Output() saved = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  // ----------------- Modal Alert -----------------
  showAlert = false;
  alertStatus: 'success' | 'error' | 'warning' = 'success';
  alertTitle = '';
  alertDescription = '';

  constructor(
    private fb: FormBuilder,
    private tableRecordsService: TableRecordsService,
    private dialogRef: MatDialogRef<AddMainTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tableId: number }
  ) {}

  ngOnInit(): void {
    this.tableId = this.data.tableId;

    this.form = this.fb.group({
      table_id: [this.tableId, Validators.required],
      created_by: [null, Validators.required],
      owner_id: [null, Validators.required],
      status: ['Incomplete', Validators.required],
      values: this.fb.array([this.createValueGroup()]),
    });
  }

  createValueGroup(): FormGroup {
    return this.fb.group({
      column_id: [null, Validators.required],
      value: ['', Validators.required],
    });
  }

  get values(): FormArray {
    return this.form.get('values') as FormArray;
  }

  addRow(): void {
    this.values.push(this.createValueGroup());
  }

  removeRow(index: number): void {
    this.values.removeAt(index);
  }

  // ----------------- Modal Alert Helpers -----------------
  showModalAlert(status: 'success' | 'error' | 'warning', title: string, description: string) {
    this.alertStatus = status;
    this.alertTitle = title;
    this.alertDescription = description;
    this.showAlert = true;
  }

  onAlertAction(action: string) {
    if (action === 'close') {
      this.showAlert = false;
    }
  }

  onAlertClosed() {
    this.showAlert = false;
  }

  // ----------------- Submit Form -----------------
  onSubmit(): void {
    if (this.form.invalid) {
      this.showModalAlert('warning', 'Form Incomplete', 'Please fill all required fields.');
      return;
    }

    const formData = this.form.value;

    this.tableRecordsService.create(formData).subscribe({
      next: (res: any) => {
        if (res && res.success) {
          this.showModalAlert('success', 'Success', 'Record added successfully!');
          setTimeout(() => {
            this.dialogRef.close(res.data);
          }, 800);
        } else {
          this.showModalAlert('error', 'Error', 'Something went wrong while saving the record.');
        }
      },
      error: () => {
        this.showModalAlert('error', 'Error', 'Failed to save record. Please try again.');
      },
    });
  }
}
