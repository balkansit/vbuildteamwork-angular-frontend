import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface SelectorDialogData {
  title: string;
  displayedColumns: string[];
  columnHeaders: { [key: string]: string };
  data: any[];
  pageSize?: number;
  pageLength?: number;
  filterColumns?: { key: string; label: string; type: string; options?: string[] }[];
  onPageChange?: (page: PageEvent) => void;
  onSearchChange?: (columnKey: string, searchText: string) => void;
  enableGlobalSearch?: boolean; // Only Product modal
}


@Component({
  selector: 'app-generic-selector-dialog',
  standalone: false,
  templateUrl: './generic-selector-dialog.component.html',
  styleUrls: ['./generic-selector-dialog.component.css'],
})
export class GenericSelectorDialogComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();
  filterText: string = '';
  filterableColumns: string[] = [];
  pageSize!: number;
  pageLength!: number;
  showSearchInput: boolean = false;
  @Output() searchChange = new EventEmitter<string>();

  filterColumns: {
    key: string;
    label: string;
    type: string;
    options?: string[];
  }[] = [];

  columnHeaders: { [key: string]: string } = {};
  title: string = '';
  selectedRowIndex: number = 0;
  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterValues: any = {}; // store filters for each column

  constructor(
    public dialogRef: MatDialogRef<GenericSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectorDialogData
  ) { }

  ngOnInit(): void {
    if (!this.data) return;

    this.showSearchInput = !!this.data.enableGlobalSearch;

    this.displayedColumns = this.data.displayedColumns;
    this.columnHeaders = this.data.columnHeaders;
    this.dataSource.data = this.data.data;

    this.pageSize = this.data.pageSize || 10;
    this.pageLength = this.data.pageLength || this.data.data.length;
    this.filterColumns = this.data.filterColumns || [];

    this.dataSource.filterPredicate = (item, filter) => {
      const filters = JSON.parse(filter);
      return Object.keys(filters).every((colKey) => {
        if (!filters[colKey]) return true;
        const cellValue = (item[colKey] ?? '').toString().toLowerCase();
        return cellValue.includes(filters[colKey]);
      });
    };
  }

  toggleSearchInput() {
    if (this.data.enableGlobalSearch) {
      this.showSearchInput = !this.showSearchInput;
    }
  }

  onSearch(term: string) {
    if (this.data.enableGlobalSearch) {
      this.searchChange.emit(term);
    }
  }
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.pageSize = this.data.pageSize || 10;
    this.pageLength = this.data.pageLength || this.data.data.length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Data input changed:', this.data);
    if (changes['data'] && changes['data'].currentValue) {
      this.dataSource.data = changes['data'].currentValue;
    }
  }

  updateData(pageLength: number, pageSize: number, newData: any[]) {
    this.dataSource.data = newData;
    this.pageLength = pageLength;
    this.pageSize = pageSize;
  }

  onPageChange(page: PageEvent) {
    if (this.data.onPageChange) {
      this.data.onPageChange(page); // call parent's callback
    }
  }

  // applyFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue;
  // }

  applyFilter(event: any, columnKey: string) {
    const value = event.target.value
      ? event.target.value.trim().toLowerCase()
      : '';

    if (this.data.onSearchChange) {
      this.data.onSearchChange(columnKey, value);
      return;
    }

    this.filterValues[columnKey] = value;

    // Update dataSource filter
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  // Reset all filters
  resetFilters() {
    this.filterValues = {}; // Clear filter values
    this.dataSource.filter = JSON.stringify(this.filterValues); // Reset table filter
  }

  selectItem(item: any): void {
    console.log('Selected item:', item);
    this.dialogRef.close(item); // 🔁 Sends full doctor object
  }

  close(): void {
    this.dialogRef.close();
  }

  clearFilter() {
    this.filterText = '';
    this.dataSource.filter = '';
  }

  onKeyDown(event: KeyboardEvent): void {
    const maxIndex = this.dataSource.data.length - 1;
    console.log('Key pressed:', event.key);

    if (event.key === 'f' || event.key === 'F') {
      event.preventDefault();
      this.searchInputRef.nativeElement.focus();
    }

    if (event.key === 'ArrowDown') {
      this.selectedRowIndex = Math.min(this.selectedRowIndex + 1, maxIndex);
      event.preventDefault();
      this.searchInputRef.nativeElement.blur();
    } else if (event.key === 'ArrowUp') {
      this.selectedRowIndex = Math.max(this.selectedRowIndex - 1, 0);
      event.preventDefault();
      this.searchInputRef.nativeElement.blur();
    } else if (event.key === 'Enter') {
      this.searchInputRef.nativeElement.blur();
      const selectedItem = this.dataSource.data[this.selectedRowIndex];
      if (selectedItem) {
        this.selectItem(selectedItem);
      }
    }
  }
}
