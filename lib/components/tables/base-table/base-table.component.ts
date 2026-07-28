import {
  Component,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerLoadingService } from '@lib/services/components/spinner-loading.service';
import { AlertData } from '@lib/models/Alert.model';
import { ApiResponse } from '@lib/models/ApiResponse.model';
import { FormField } from '@lib/models/FormField.model';
import { DynamicFormWrapperDialogComponent } from '@lib/layouts/wrappers/dynamic-form-wrapper-dialog/dynamic-form-wrapper-dialog.component';
import { withLoadingAndAlert } from '@lib/utils/withLoadingAndAlert';
import { finalize } from 'rxjs/operators';
import { AuthService } from '@lib/services/auth/auth.service';

export interface FilterColumn {
  key: string;
  label: string;
  type: string;
  options?: (string | { label: string; value: any })[];
  disabled?: boolean;
}

export interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  type?: string;
}

@Component({
  selector: 'app-base-table',
  standalone: false,
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.css'],
})
export class BaseTableComponent<T> implements OnInit {
  @Input() title = 'List';
  @Input() subtitle = '';
  @Input() resourceName = 'Item';
  @Input() tableColumns: TableColumn[] = [];
  @Input() showActions = true;
  @Input() inLineAdd = false;
  @Input() showCheckbox = false;
  @Input() inLineView? = true;
  @Input() inLineEdit? = true;
  @Input() dbQuery: boolean = false;
  @Input() pageLength: number = 0;
  @Input() pageSize: number = 10;
  @Input() data?: any[] = [];
  @Input() fetchData!: (params?: any) => any;
  @Input() getEditFormFields!: (item: T) => FormField[];
  @Input() getViewFields!: (item: T) => any[];
  @Input() addFormFields: FormField<T>[] = [];
  @Input() createItem!: (data: any) => any;
  @Input() updateItem!: (id: number, data: any) => any;
  @Input() deleteItem!: (id: number) => any;
  @Input() addNavigateTo?: () => void;
  @Input() actionButtons: any[] = [];
  @Input() ModalActionButtons: any[] = [];
  @Input() showAddButton: boolean = true; // default true
  @Input() filterColumns: FilterColumn[] = [];
  @Input() hasRoles: string[] = ['admin', 'super_admin'];
  @Input() showMoveToPoButton?: boolean = false;
  @Input() showExport: boolean = true;
  @Input() backendPagination: boolean = false;
  @Input() enableGlobalSearch: boolean = false;
  @Input() showBulkDelete: boolean = true;
  @Input() showExpiryFilter: boolean = false; // default false
  activeExpiryFilter: string = '';
  @Input() showDateRangeFilter: boolean = false;
  @Input() hasViewRoles: string[] = ['admin', 'super_admin', 'guest'];
  @Input() hasEditRoles: string[] = ['admin', 'super_admin'];
  @Input() hasDeleteRoles: string[] = ['admin', 'super_admin'];
  @Input() baseUrl: string = '';
  @Input() showCloseDay: boolean = false;
  @Input() imageUrl: string = '';
  /** Admin control to reopen a closed day */
  @Input() showReopenDay: boolean = false;
  @Output() globalSearch = new EventEmitter<string>();

  @Output() pageChange = new EventEmitter<any>();
  @Output() moveToPoClicked = new EventEmitter<T[]>();
  @Output() goToAddClicked = new EventEmitter<void>();
  @Output() bulkDeleteClicked = new EventEmitter<number[]>();
  @Output() generateReportClicked = new EventEmitter<void>();
  @Output() closeDayClicked = new EventEmitter<void>();
  @Output() reopenDayClicked = new EventEmitter<void>();
  @Output() applyFiltersClicked = new EventEmitter<{
    value: string;
    columnKey: string;
  }>();

  @Output() viewItemClicked = new EventEmitter<any>();
  @Output() editItemClicked = new EventEmitter<any>();
  @Output() cellButtonClickBase = new EventEmitter<{
    row: any;
    column: string;
  }>();

  @Output() cellLinkClick = new EventEmitter<{
    row: any;
    column: string;
  }>();
  private _paginator!: MatPaginator;
  @ViewChild(MatPaginator) set paginator(mp: MatPaginator) {
    this._paginator = mp;
    if (this.dataSource && !this.backendPagination) {
      this.dataSource.paginator = this._paginator;
    }
  }
  get paginator(): MatPaginator {
    return this._paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<T>([]);
  selectedItems = new Set<number>();
  isSelected = (id: number) => this.selectedItems.has(id);
  filterValues: any = {}; // store filters for each column
  selectedRows: any[] = [];

  alert: AlertData | null = null;
  useModalAlert = false;

  showModal = false;
  modalFields: any[] = [];

  showConfirm = false;
  itemToDelete: T | null = null;
  showExpiryButtons: any;
  showResetButton: any;
  selectedExpiry: 'current' | 'nextMonth' | 'nextYear' = 'current';
  activeDateRange:
    | 'lastMonth'
    | 'last6Months'
    | 'lastYear'
    | 'last3Months'
    | '' = '';

  selectedRow: T | null = null;

  constructor(
    private dialog: MatDialog,
    private spinner: SpinnerLoadingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isGuest()) {
      this.showAddButton = false;
      this.showBulkDelete = false;
      this.showCloseDay = false;
      this.showReopenDay = false;
      this.showMoveToPoButton = false;
      // Ensure guest is not in edit/delete roles
      this.hasEditRoles = this.hasEditRoles.filter((r) => r !== 'guest');
      this.hasDeleteRoles = this.hasDeleteRoles.filter((r) => r !== 'guest');
    }

    console.log('Data input to table:', this.pageLength, this.pageSize);

    this.refresh();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchTerms = JSON.parse(filter);
      return Object.keys(searchTerms).every((key) => {
        if (!searchTerms[key]) return true; // skip empty filters
        return data[key]?.toString().toLowerCase().includes(searchTerms[key]);
      });
    };
  }

  private _searchValue = '';

  applyGlobalSearch(value: string) {
    this.globalSearch.emit(value);
  }

  applySearchFilter() {
    if (!this._searchValue) {
      this.dataSource.filter = '';
      return;
    }

    this.dataSource.filterPredicate = (row: any) => {
      return Object.values(row)
        .filter((v) => typeof v === 'string')
        .some((v) => v.toLowerCase().includes(this._searchValue));
    };

    this.dataSource.filter = Math.random().toString(); // trigger table filter
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Data input changed:', this.data);
    if (changes['data'] && changes['data'].currentValue) {
      this.loadTable(this.data ?? []);
    }
  }

  refresh(params?: any) {
    if (!this.fetchData) {
      console.error('fetchData function is not provided.');
      return;
    }

    this.fetchData(params)
      .pipe(
        withLoadingAndAlert(this.spinner, (a) => (this.alert = a), {
          useModal: this.useModalAlert,
          showSuccess: false,
          loadingMessage: `Loading ${this.resourceName}s...`,
          successMessage: `${this.resourceName}s loaded successfully!`,
          errorMessage: `Failed to load ${this.resourceName}s.`,
        })
      )
      .subscribe((res: ApiResponse) => {
        if (res.success && res.data) {
          let items = res.data;
          
          if (res.data && typeof res.data === 'object' && 'data' in res.data && Array.isArray(res.data.data)) {
            items = res.data.data;
            if (this.backendPagination && this.paginator) {
              this.paginator.length = res.data.total || 0;
            }
          }
          
          this.loadTable(items);
        }
      });
  }

  onPageChange(event: any) {
    this.pageChange.emit(event);
    if (this.backendPagination) {
      this.refresh({ page: event.pageIndex + 1, per_page: event.pageSize });
    }
  }

  onBulkDelete() {
    const selectedIds = Array.from(this.selectedItems); // already tracking selected rows
    if (selectedIds.length === 0) {
      alert('Please select at least one item to delete.');
      return;
    }
    this.bulkDeleteClicked.emit(selectedIds);
  }

  loadTable(data: any[]) {
    this.dataSource = new MatTableDataSource(data ?? []);
    if (!this.backendPagination) this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Important: set filter predicate
    this.dataSource.filterPredicate = (row: any, filter: string) => {
      if (!filter) return true;
      const searchTerms = JSON.parse(filter);
      return Object.keys(searchTerms).every((key) => {
        const rowValue = row[key] ? row[key].toString().toLowerCase() : '';
        return rowValue.includes(searchTerms[key]);
      });
    };

    // Reapply existing filters if any
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  getOptions(data: string[] | undefined): { label: string; value: string }[] {
    return data?.map((item) => ({ label: item, value: item })) || [];
  }

  // Reset all filters
  resetFilters() {
    // 1. Clear filter values object
    this.filterValues = {};
    this.activeExpiryFilter = '';

    // 2. Clear datasource filter
    if (this.dataSource) {
      this.dataSource.filter = '';
    }

    // 3. Reset all filter form inputs manually
    const filterInputs = document.querySelectorAll<
      HTMLInputElement | HTMLSelectElement
    >('.bits-table-filterbox input, .bits-table-filterbox select');
    filterInputs.forEach((el) => {
      if (el instanceof HTMLSelectElement) {
        el.selectedIndex = 0; // reset dropdown to first option
      } else {
        el.value = ''; // reset text/date input
      }
    });
  }
  handleCellButtonClick(event: { row: any; column: string }) {
    console.log(
      'Button clicked in column:',
      event.column,
      'for row:',
      event.row
    );
    this.cellButtonClickBase.emit(event);
  }

  handleCellLinkClick(event: { row: any; column: string }) {
    console.log('Link clicked in column:', event.column, 'for row:', event.row);
    this.cellLinkClick.emit(event);
  }

  applyFilter(event: any, columnKey: string) {
    let value = event?.target?.value ?? '';
    value = value.toString().trim().toLowerCase();

    if (this.dbQuery) {
      this.applyFiltersClicked.emit({ value, columnKey });
      return;
    }

    if (value) {
      this.filterValues[columnKey] = value;
    } else {
      delete this.filterValues[columnKey];
    }

    if (columnKey === 'fromDate' || columnKey === 'toDate') {
      this.filterByDateRange(); // call new function
    } else {
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  }

  clearAllFilters() {
    // Reset filter values
    this.filterValues = {};
    this.dataSource.filter = '';

    // Clear all input values
    const filterInputs = document.querySelectorAll(
      '.filter-input-wrapper input, .form-select, input[type="date"]'
    );
    filterInputs.forEach((input: any) => {
      input.value = '';
    });

    // If using db query, emit event to parent
    if (this.dbQuery) {
      this.applyFiltersClicked.emit({ value: '', columnKey: 'all' });
      // Reload data from backend
      this.refresh();
    }
  }

  filterStatus(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.dataSource.filterPredicate =
      value === 'all'
        ? () => true
        : (data: any) => data.status.toLowerCase() === value;
    this.dataSource.filter = value;
  }

  toggleItem(item: any) {
    const id = item.id;
    this.selectedItems.has(id)
      ? this.selectedItems.delete(id)
      : this.selectedItems.add(id);
  }

  toggleAll(selectAll: boolean) {
    selectAll
      ? this.dataSource.data.forEach((d: any) =>
          this.selectedItems.add((d as any).id)
        )
      : this.selectedItems.clear();
  }

  viewItem(item: T) {
    if (this.inLineView) {
      this.modalFields = this.getViewFields(item);
      this.showModal = true;
      this.selectedRow = item;
    } else {
      this.viewItemClicked.emit(item);
    }
  }

  // new one for edit
  editItem(item: T) {
    if (this.inLineEdit) {
      // Default: dialog edit
      const fields = this.getEditFormFields(item);
      const dialogRef = this.dialog.open(DynamicFormWrapperDialogComponent, {
        data: { title: `Edit ${this.resourceName}`, fields },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result?.success) {
          this.updateItem((item as any).id, result.data)
            .pipe(
              withLoadingAndAlert(this.spinner, (a) => (this.alert = a), {
                useModal: this.useModalAlert,
                showSuccess: true,
                loadingMessage: `Updating ${this.resourceName}`,
                successMessage: `${this.resourceName} updated!`,
                errorMessage: `Failed to update ${this.resourceName}`,
              })
            )
            .subscribe(() => this.refresh());
        }
      });
    } else {
      this.editItemClicked.emit(item);
    }
  }

  addItem() {
    if (this.inLineAdd) {
      // Default: dialog edit
      const fields = this.addFormFields;
      console.log('Add Form Fields:', fields);
      const dialogRef = this.dialog.open(DynamicFormWrapperDialogComponent, {
        data: { title: `Add ${this.resourceName}`, fields },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result?.success) {
          this.createItem(result.data)
            .pipe(
              withLoadingAndAlert(this.spinner, (a) => (this.alert = a), {
                useModal: this.useModalAlert,
                showSuccess: true,
                loadingMessage: `Creating ${this.resourceName}`,
                successMessage: `${this.resourceName} updated!`,
                errorMessage: `Failed to update ${this.resourceName}`,
              })
            )
            .subscribe(() => this.refresh());
        }
      });
    }
  }

  confirmDelete(item: T) {
    this.itemToDelete = item;
    this.showConfirm = true;
  }

  onDeleteConfirm(action: string) {
    if (action === 'confirm' && this.itemToDelete) {
      this.showConfirm = false;

      const id = (this.itemToDelete as any).id;

      this.deleteItem(id)
        .pipe(
          withLoadingAndAlert(this.spinner, (a) => (this.alert = a), {
            loadingMessage: `Deleting ${this.resourceName}`,
            successMessage: `${this.resourceName} deleted.`,
            errorMessage: `Failed to delete ${this.resourceName}`,
          }),
          finalize(() => {
            this.itemToDelete = null;
          })
        )
        .subscribe(() => this.refresh());
    } else {
      this.showConfirm = false;
    }
  }

  exportToCSV() {
    this.generateReportClicked.emit();

    // const dialogRef = this.dialog.open(DownloadCsvModalComponent, {
    //   width: '400px',
    // });

    // dialogRef.afterClosed().subscribe((selectedRange) => {
    //   if (!selectedRange) return;

    //   // Determine date range based on selection
    //   const today = new Date();
    //   let startDate: Date;

    //   if (selectedRange === 'lastMonth') {
    //     startDate = new Date(
    //       today.getFullYear(),
    //       today.getMonth() - 1,
    //       today.getDate()
    //     );
    //   } else if (selectedRange === 'last3Months') {
    //     startDate = new Date(
    //       today.getFullYear(),
    //       today.getMonth() - 3,
    //       today.getDate()
    //     );
    //   } else if (selectedRange === 'last6Months') {
    //     startDate = new Date(
    //       today.getFullYear(),
    //       today.getMonth() - 6,
    //       today.getDate()
    //     );
    //   } else {
    //     startDate = new Date(
    //       today.getFullYear() - 1,
    //       today.getMonth(),
    //       today.getDate()
    //     );
    //   }

    //   const filteredData = this.dataSource.data.filter((item: any) => {
    //     const createdAt = new Date(item.invoice_date || item.created_at);
    //     return createdAt >= startDate && createdAt <= today;
    //   }) as Record<string, any>[];

    //   if (filteredData.length === 0) {
    //     alert('No data found for the selected period.');
    //     return;
    //   }

    //   const headers = Object.keys(filteredData[0]);
    //   const rows = filteredData.map((item) => headers.map((key) => item[key]));
    //   const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join(
    //     '\r\n'
    //   );

    //   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.setAttribute('href', url);
    //   a.setAttribute(
    //     'download',
    //     `${this.resourceName.toLowerCase()}_${selectedRange}.csv`
    //   );
    //   a.click();
    // });
  }

  filterByDateRange() {
    const from = this.filterValues['fromDate']
      ? new Date(this.filterValues['fromDate'])
      : null;
    const to = this.filterValues['toDate']
      ? new Date(this.filterValues['toDate'])
      : null;

    this.dataSource.filterPredicate = (row: any) => {
      if (!from && !to) return true;

      const rowDate = new Date(row['invoice_date']); // or 'created_at' as per your table

      if (from && to) {
        return rowDate >= from && rowDate <= to;
      } else if (from) {
        return rowDate >= from;
      } else if (to) {
        return rowDate <= to;
      }
      return true;
    };

    this.dataSource.filter = Math.random().toString(); // just to trigger filtering
  }

  goToAdd() {
    if (this.addNavigateTo) {
      this.addNavigateTo();
    } else if (this.inLineAdd) {
      this.addItem();
    } else {
      this.goToAddClicked.emit();
    }
  }

  toggleSelection(row: any, event: any) {
    if (event.target.checked) {
      this.selectedRows.push(row);
    } else {
      this.selectedRows = this.selectedRows.filter((r) => r.id !== row.id);
    }
  }

  moveToPO() {
    if (!this.dataSource || !this.dataSource.data) return; // safety check

    const selectedData = this.dataSource.data.filter((item) =>
      this.selectedItems.has((item as any).id)
    );

    if (selectedData.length === 0) {
      alert('Please select at least one item to move to PO.');
      return;
    }

    this.moveToPoClicked.emit(selectedData); // <-- emit selected rows

    console.log('Moving to PO:', selectedData);
  }

  // Filter by expiry date

  filterByExpiry(type: 'current' | 'nextMonth' | 'nextYear') {
    const today = new Date();
    let start: Date;
    let end: Date;

    if (type === 'current') {
      // Current month
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (type === 'nextMonth') {
      // Next month
      start = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      end = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    } else {
      // Next year
      start = new Date(today.getFullYear() + 1, 0, 1);
      end = new Date(today.getFullYear() + 1, 11, 31);
    }

    // Save filter
    this.filterValues['expiry_date'] = { start, end };

    // Table filter
    if (this.dataSource) {
      this.dataSource.filterPredicate = (row: any, filter: string) => {
        const filters = JSON.parse(filter);

        // expiry_date filter check
        if (filters['expiry_date']) {
          const expiry = new Date(row['expiry_date']);
          return (
            expiry >= new Date(filters['expiry_date'].start) &&
            expiry <= new Date(filters['expiry_date'].end)
          );
        }
        return true;
      };

      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  }

  setExpiryFilter(type: 'current' | 'nextMonth' | 'nextYear') {
    this.activeExpiryFilter = type;
    this.filterByExpiry(type);
  }

  // date range filter

  setDateRange(range: 'lastMonth' | 'last6Months' | 'lastYear') {
    this.activeDateRange = range;

    const today = new Date();
    let startDate: Date;

    if (range === 'lastMonth') {
      startDate = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
      );
    } else if (range === 'last6Months') {
      startDate = new Date(
        today.getFullYear(),
        today.getMonth() - 6,
        today.getDate()
      );
    } else {
      startDate = new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        today.getDate()
      );
    }

    this.filterValues['date_range'] = { startDate, endDate: today };

    // define how filtering works
    this.dataSource.filterPredicate = (row: any, filter: string) => {
      const filters = JSON.parse(filter);
      if (filters['date_range']) {
        const fieldName = 'invoice_date'; // <-- change this to your date column name
        const rowDate = new Date(row[fieldName]);
        return (
          rowDate >= new Date(filters['date_range'].startDate) &&
          rowDate <= new Date(filters['date_range'].endDate)
        );
      }
      return true;
    };

    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  isOptionObject(option: any): boolean {
    return (
      typeof option === 'object' &&
      option !== null &&
      'label' in option &&
      'value' in option
    );
  }
}
