import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface MultiSelectDialogData {
  title: string;
  displayedColumns: string[];
  columnHeaders: { [key: string]: string };
  data: any[];
}

@Component({
  selector: 'app-multi-selector-dialog',
  standalone: false,
  templateUrl: './multi-selector-dialog.component.html',
  styleUrls: ['./multi-selector-dialog.component.css'],
})
export class MultiSelectorDialogComponent {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();
  filterText: string = '';
  columnHeaders: { [key: string]: string } = {};
  title: string = '';
  selectedItems: any[] = [];
  displayedColumnsWithSelect: string[] = [];

  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<MultiSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MultiSelectDialogData
  ) {}

  ngOnInit(): void {
    if (!this.data) return;

    this.title = this.data.title;
    this.displayedColumns = this.data.displayedColumns;
    this.columnHeaders = this.data.columnHeaders;
    this.dataSource.data = this.data.data;

    this.displayedColumnsWithSelect = ['select', ...this.displayedColumns];

    // Global search filter
    this.dataSource.filterPredicate = (item, filter) => {
      return Object.values(item).some((val) =>
        (val ?? '').toString().toLowerCase().includes(filter)
      );
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilterGlobal(event: any) {
    this.filterText = event.target.value.trim().toLowerCase();
    this.dataSource.filter = this.filterText;
  }

  toggleSelection(row: any) {
    const index = this.selectedItems.indexOf(row);
    if (index >= 0) {
      this.selectedItems.splice(index, 1); // remove if already selected
    } else {
      this.selectedItems.push(row); // add if not selected
    }
  }

  isAllSelected(): boolean {
    return (
      this.selectedItems.length === this.dataSource.data.length &&
      this.dataSource.data.length > 0
    );
  }

  isIndeterminate(): boolean {
    return (
      this.selectedItems.length > 0 &&
      this.selectedItems.length < this.dataSource.data.length
    );
  }

  toggleSelectAll(event: any): void {
    if (event.target.checked) {
      this.selectedItems = [...this.dataSource.data]; // select all
    } else {
      this.selectedItems = []; // deselect all
    }
  }

  confirmSelection() {
    if (this.selectedItems.length > 0) this.dialogRef.close(this.selectedItems);
  }

  close() {
    this.dialogRef.close();
  }
}
