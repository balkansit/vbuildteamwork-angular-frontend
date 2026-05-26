import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  showChip?: boolean;
  width?: string;
  cellClass?: string;
  headerClass?: string;
}

@Component({
  selector: 'app-bootstrap-table',
  standalone: false,
  templateUrl: './bootstrap-table.component.html',
  styleUrls: ['./bootstrap-table.component.css'],
})
export class BootstrapTableComponent<T extends Record<string, any>>
  implements OnChanges
{
  @Input() columns: TableColumn[] = [];
  @Input() data: T[] = [];

  @Input() showActions = false;
  @Input() showSelect = false;
  @Input() highlightRowOnHover = true;
  @Input() stripedRows = false;
  @Input() borderRadius = false;
  @Input() elevation = false;
  @Input() sortable = false;
  @Input() pagination = false;
  @Input() pageSizeOptions = [10, 25, 50];
  @Input() defaultPageSize = 10;

  @Output() rowSelected = new EventEmitter<T[]>();
  @Output() actionClicked = new EventEmitter<{ action: string; row: T }>();

  displayedData: T[] = [];
  currentPage = 1;
  pageSize = this.defaultPageSize;
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  selectedRows = new Set<T>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.currentPage = 1;
      this.selectedRows.clear();
    }
    this.applySortingAndPagination();
  }

  sort(field: string) {
    if (!this.sortable) return;
    if (this.sortColumn === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = field;
      this.sortDirection = 'asc';
    }
    this.applySortingAndPagination();
  }

  applySortingAndPagination() {
    let sortedData = [...this.data];
    if (this.sortColumn) {
      sortedData.sort((a, b) => {
        const valA = a[this.sortColumn!];
        const valB = b[this.sortColumn!];
        if (valA == null) return 1;
        if (valB == null) return -1;
        if (valA === valB) return 0;
        if (this.sortDirection === 'asc') return valA > valB ? 1 : -1;
        else return valA < valB ? 1 : -1;
      });
    }

    if (this.pagination) {
      const start = (this.currentPage - 1) * this.pageSize;
      this.displayedData = sortedData.slice(start, start + this.pageSize);
    } else {
      this.displayedData = sortedData;
    }
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage = page;
    this.applySortingAndPagination();
  }

  totalPages() {
    return Math.ceil(this.data.length / this.pageSize);
  }

  totalPagesArray() {
    return Array(this.totalPages())
      .fill(0)
      .map((_, i) => i + 1);
  }

  toggleRowSelection(row: T) {
    if (this.selectedRows.has(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
    }
    this.emitSelectedRows();
  }

  isSelected(row: T): boolean {
    return this.selectedRows.has(row);
  }

  toggleSelectAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.data.forEach((row) => this.selectedRows.add(row));
    } else {
      this.selectedRows.clear();
    }
    this.emitSelectedRows();
  }

  emitSelectedRows() {
    this.rowSelected.emit(Array.from(this.selectedRows));
  }

  onAction(action: string, row: T) {
    this.actionClicked.emit({ action, row });
  }
}
