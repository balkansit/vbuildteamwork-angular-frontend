import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface SingleSelectDialogData {
  title: string;                    // Dialog title
  displayedColumns: string[];       // Keys of columns to show
  columnHeaders: { [key: string]: string }; // Column header labels
  data: any[];                      // Array of data objects
}

@Component({
  selector: 'app-single-select-dialog',
  templateUrl: './single-selector-dialog.component.html',
  styleUrls: ['./single-selector-dialog.component.css'],
  standalone: false
})

export class SingleSelectorDialogComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();
  filterText: string = '';
  columnHeaders: { [key: string]: string } = {};
  title: string = '';
  selectedItem: any = null;
  displayedColumnsWithSelect: string[] = [];


  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<SingleSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SingleSelectDialogData
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
    return Object.values(item).some(val =>
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
    this.selectedItem = this.selectedItem === row ? null : row;
  }

  confirmSelection() {
    if (this.selectedItem) this.dialogRef.close(this.selectedItem);
  }

  close() {
    this.dialogRef.close();
  }
}
