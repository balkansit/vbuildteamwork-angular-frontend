import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/models/ApiResponse.model';
import { Supplier } from 'src/app/models/dbschema/supplier.model';
import { PurchasePreOrderService } from 'src/app/services/purchase-pre-order';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
    selector: 'app-supplier-dialog',
    templateUrl: './supplier-dialog.component.html',
    styleUrls: ['./supplier-dialog.component.css'],
    standalone: false
})
export class SupplierDialogComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<any>();

  isLoaded: Boolean = false;
  alertMessage: {
    message: string;
    type: 'success' | 'info' | 'warning' | 'danger';
  } | null = null;

  cachedSuppliers: Supplier[] | null = null;

  constructor(
    private dialogRef: MatDialogRef<SupplierDialogComponent>,
    private supplierService: SupplierService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getPurchasePreOrdersSuppliers();
  }

  getPurchasePreOrdersSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(
      (response: ApiResponse) => {
        const suppliers: any = response.data;
        if (suppliers && suppliers.length > 0) {
          this.loadTable(suppliers);
          console.log('suppliers fetched data :', suppliers);
          // this.purchaseViewService.cacheSuppliers(suppliers);
        }
      },
      (error: any) => {
        console.error('Error loading suppliers:', error);
        this.showAlert('Failed to load suppliers. Please try again.', 'danger');
      }
    );
  }

  refreshTable() {
    this.isLoaded = false;
    // this.purchaseViewService.refreshCache();
    this.getPurchasePreOrdersSuppliers();
  }

  loadTable(data: Supplier[]): void {
    this.dataSource.data = data;
    this.isLoaded = true;
  }

  selectSupplier(supplier: any): void {
    this.dialogRef.close(supplier);
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue?.target?.value?.trim().toLowerCase();
  }

  searchByContact(filterValue: any) {
    const contact = filterValue?.target?.value;
    this.dataSource.filterPredicate = (data: any, filter: string) =>
      data.contact.trim().toLowerCase().includes(filter);
    this.dataSource.filter = contact.trim().toLowerCase();
  }

  private showAlert(
    message: string,
    type: 'success' | 'info' | 'warning' | 'danger'
  ): void {
    this.alertMessage = { message, type };
    setTimeout(() => (this.alertMessage = null), 5000);
  }

  clearAlert(): void {
    this.alertMessage = null;
  }
}
