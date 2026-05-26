import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-supplier-selection-modal',
    templateUrl: './supplier-selection-modal.component.html',
    styleUrls: ['./supplier-selection-modal.component.css'],
    standalone: false
})
export class SupplierSelectionModalComponent {
  filteredSuppliers: any;
  suppliers: any;
  constructor(
    public dialogRef: MatDialogRef<SupplierSelectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  selectSupplier(supplier: any): void {
    // Close the dialog and pass the selected supplier back to the parent
    // this.dialogRef.close(supplier);
    this.filteredSuppliers = this.suppliers;
  }

  close(): void {
    // Close the modal without returning anything
    this.dialogRef.close();
  }
}
