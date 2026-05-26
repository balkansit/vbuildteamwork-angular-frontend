import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/dbschema/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ApiResponse } from 'src/app/models/ApiResponse.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductCacheService } from '../../services/product-cache.service';

@Component({
    selector: 'app-product-dialog',
    templateUrl: './product-dialog.component.html',
    styleUrls: ['./product-dialog.component.css'],
    standalone: false
})
export class ProductDialogComponent {
  displayedColumns: string[] = ['id', 'name', 'hsn'];
  dataSource = new MatTableDataSource<any>();

  // Component properties
  isLoaded: Boolean = false;
  alertMessage: {
    message: string;
    type: 'success' | 'info' | 'warning' | 'danger';
  } | null = null;

  // Cache the products to avoid multiple API calls
  cachedProducts: Product[] | null = null;

  constructor(
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private productCacheService: ProductCacheService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Get the products from the cache or API
    this.getProducts();
  }

  // Get the products from the cache or API
  getProducts(): void {
    this.productCacheService.getProducts().subscribe(
      (products) => {
      if (products && products.length > 0) {
        console.log('Products loaded:', products);
        this.loadTable(products);
        this.productCacheService.cacheProducts(products);  // Cache the products once fetched
      }
      },
      (error) => {
      console.error('Error loading products:', error);
      this.showAlert('Failed to load products. Please try again.', 'danger');
      }
    );
  }

  refreshTable() {
    this.isLoaded = false;
    this.productCacheService.refreshCache();  // Clear the cache
    this.getProducts();  // Fetch the products again
  }

  // Load the table with data
  loadTable(data: Product[]): void {
    this.dataSource.data = data;
    this.isLoaded = true;
  }

  // Select product and pass it to the parent component
  selectProduct(product: any): void {
    this.dialogRef.close(product); // Pass the selected product back to the parent component
  }

  // Apply filter to the table
  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue?.target?.value?.trim().toLowerCase();
  }

  // Search products by HSN code
  searchByHSNCode(filterValue: any) {
    const hsnCode = filterValue?.target?.value;
    this.dataSource.filterPredicate = (data: any, filter: string) =>
      data.hsn_code.trim().toLowerCase().includes(filter);
    this.dataSource.filter = hsnCode.trim().toLowerCase();
  }

  // Show alert messages
  private showAlert(
    message: string,
    type: 'success' | 'info' | 'warning' | 'danger'
  ): void {
    this.alertMessage = { message, type };
    setTimeout(() => (this.alertMessage = null), 5000); // Auto-dismiss after 5 seconds
  }

  // Clear alert messages
  clearAlert(): void {
    this.alertMessage = null;
  }
}
