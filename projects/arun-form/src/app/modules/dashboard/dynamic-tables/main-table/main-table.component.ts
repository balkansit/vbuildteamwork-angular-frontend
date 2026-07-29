import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormWrapperDialogComponent } from '@lib/layouts/wrappers/dynamic-form-wrapper-dialog/dynamic-form-wrapper-dialog.component';
import { AlertData } from '@lib/models/Alert.model';
import { ApiResponse } from '@lib/models/ApiResponse.model';
import { AuthService } from '@lib/services/auth/auth.service';
import { SpinnerLoadingService } from '@lib/services/components/spinner-loading.service';
import { withLoadingAndAlert } from '@lib/utils/withLoadingAndAlert';
import {
  buildColumnsWithFilters,
  buildTableColumns,
  buildFilterColumns,
} from 'projects/arun-form/src/app/models/dbschema/tables.model';
import { TableRecordsService } from 'projects/arun-form/src/app/services/apis/table-record.service';
import { TableService } from 'projects/arun-form/src/app/services/apis/table.service';
import { TableModalService } from 'projects/arun-form/src/app/services/modals/tables-modal.service';
import { ReopenDayModalComponent } from './reopen-day-modal/reopen-day-modal.component';
import { CloseDayModalComponent } from './close-day-modal/close-day-modal.component';
import { DayClosingService } from 'projects/arun-form/src/app/services/utils/day-closing.service';
import { forkJoin, tap, map } from 'rxjs';
import { StandardConfirmDialogComponent } from '@lib/components/modals/standard-confirm-dialog/standard-confirm-dialog.component';

interface TableColumn {
  id: number;
  name: string;
  data_type: string;
  is_dropdown: number;
  owner_id: number;
  created_by: number;
  dropdown_values: string[];
}

interface TableData {
  id: number;
  name: string;
  title: string;
  type: string;
  created_by: number;
  owner_id: number;
  columns: TableColumn[];
  records: any[];
}

@Component({
  selector: 'app-main-table',
  standalone: false,
  templateUrl: './main-table.component.html',
  styleUrl: './main-table.component.css',
})
export class MainTableComponent {
  // --------------------------------------------------- TABLE configurations --------------------------------------------------- //

  tableColumns: any[] = [];
  tables: any[] = [];
  filterColumns = [
    { key: 'name', label: 'Name', filterable: true, type: 'input' },
    { key: 'owner_id', label: 'Owner ID', filterable: true, type: 'input' },
  ];

  hasEditRoles: string[] = ['admin', 'super_admin', 'user'];
  hasDeleteRoles: string[] = ['admin', 'super_admin'];
  isAdmin: boolean = false;
  // --------------------------------------------------- META Data --------------------------------------------------- //
  tableId: number = 0;
  tableData: TableData | null = null;
  tableName: string = '';
  currentDateDisplay: string = '';
  currentUserId: number | undefined;
  currentUserName: string | undefined;
  selectedTableData: any[] = [];
  canShowAddButton: boolean = false;
  canShowActionsColumn: boolean = false;
  showCloseDayButton: boolean = true;
  isDayClosed: boolean = false;
  closingId: number | null = null; // Store the ID for reopening
  showCloseDayConfirm: boolean = false;

  @Output() dayClosed = new EventEmitter<void>();

  // --------------------------------------------------- All form configurations --------------------------------------------------- //
  columns: any[] = [];

  // --------------------------------------------------- All API calls --------------------------------------------------- //
  fetchTableData = () => {};
  getViewFields = (item: any) => {
    if (!this.tableData) return [];
    const mergedColumns = this.tableData.columns.map((col) => ({
      ...col,
      value: item[col.name] ?? null,
    }));

    return buildColumnsWithFilters(mergedColumns);
  };

  useModalAlert = false;
  // --------------------------------------------------- Navigation --------------------------------------------------- //
  alert: AlertData | null = null;
  tableOwnerId: number | undefined;
  // --------------------------------------------------- Constructor --------------------------------------------------- //
  constructor(
    private service: TableService,
    private router: Router,
    private route: ActivatedRoute,
    private tableModalService: TableModalService,
    private dialog: MatDialog,
    private recordService: TableRecordsService,
    private authService: AuthService,
    private dayClosingService: DayClosingService,
    private spinner: SpinnerLoadingService
  ) {}

  ngOnInit(): void {
    const tableId = this.route.snapshot.paramMap.get('id');
    if (tableId) {
      this.tableId = +tableId;
    }
    let user = this.authService.getUser();
    this.currentUserId = user?.id;
    this.currentUserName = user?.name;
    this.isAdmin =
      this.authService.isAdmin() || this.authService.isSuperAdmin();

    const today = new Date();
    const dStr = String(today.getDate()).padStart(2, '0');
    const mStr = String(today.getMonth() + 1).padStart(2, '0');
    const yStr = String(today.getFullYear()).slice(-2);
    this.currentDateDisplay = `Date: ${dStr}/${mStr}/${yStr}`;

    this.getTables();

    this.route.paramMap.subscribe((params) => {
      const tableId = params.get('id');
      if (tableId) {
        this.loadTableData(+tableId);
      }
    });
  }

  loadTableData(id: number): void {
    this.tableId = id;
    this.fetchTableData = (params?: any) => this.getTableData(id, params);

    // Fetch table schema to populate columns and render app-base-table
    this.service.getById(id).subscribe({
      next: (res: ApiResponse) => {
        if (res?.success && res.data) {
          this.assignTableData(res.data);
        }
      },
      error: (err) => {
        console.error('Failed to load table schema:', err);
      }
    });
  }

  checkDayClosedStatus() {
    if (!this.currentUserId || !this.tableId) return;

    if (this.isAdmin) {
      // For Admins: isDayClosed should be true if ANYONE has this table closed today
      this.dayClosingService.getAllClosings().subscribe((res) => {
        const today = new Date().toISOString().split('T')[0];
        const closingsForThisTable = (res.data || []).filter(
          (c: any) =>
            c.table_id === this.tableId && c.date === today && c.is_closed
        );

        this.isDayClosed = closingsForThisTable.length > 0;
        this.updateAddButtonVisibility();
      });
    } else {
      // For Normal Users: check only their own status
      this.dayClosingService
        .isDayClosed(this.currentUserId, this.tableId)
        .subscribe((res) => {
          this.isDayClosed = res.is_closed;
          this.closingId = res.closing_id;
          this.updateAddButtonVisibility();
        });
    }
  }

  updateAddButtonVisibility() {
    const isGuest = this.authService.isGuest();
    this.isAdmin =
      this.authService.isAdmin() || this.authService.isSuperAdmin();

    if (this.isDayClosed || isGuest) {
      this.canShowAddButton = false;
    } else {
      this.canShowAddButton = true;
    }

    if (isGuest) {
      this.showCloseDayButton = false;
    }

    // Show actions if the user is an admin/super-admin OR if the day is not closed
    this.canShowActionsColumn = this.isAdmin || !this.isDayClosed;
  }

  // getStatusController(id: number): void {
  //   const user = this.authService.getUser();
  //   if (!user || !user.role_name) return;

  //   let tableRole = `statuscontrollerform${id}`;
  //   let tableOwner = `form${id}_user`;
  //   this.hasEditRoles = this.hasEditRoles.filter(
  //     (role) => !role.includes('statuscontrollerform')
  //   );
  //   this.hasEditRoles.push(tableRole);
  //   this.hasEditRoles.push(tableOwner);
  // }

getTableOwnerId(): void {
  return;
}

  // --------------------------------------------------- API Calls --------------------------------------------------- //
  getTableData(id: number, params?: any): any {
    return this.recordService.getAll({ table_id: id, per_page: 15, ...params }).pipe(
      tap((recordResponse: ApiResponse) => {
        if (this.tableData) {
          const rawRecords = recordResponse.data?.data || recordResponse.data || [];
          this.assignTableData({ ...this.tableData, records: rawRecords });
        }
      }),
      map((recordResponse: ApiResponse) => {
        return {
          ...recordResponse,
          data: {
            ...(typeof recordResponse.data === 'object' ? recordResponse.data : {}),
            data: this.selectedTableData
          }
        };
      })
    );
  }

  getTables() {
    this.service.getAll().subscribe((data: ApiResponse) => {
      if (data && data.success) {
        // Handle both paginated and unpaginated responses
        this.tables = data.data?.data || data.data; 
      } else {
        console.error('Failed to fetch tables');
      }
    });
  }

  // --------------------------------------------------- Data Handlers --------------------------------------------------- //
  assignTableData(data: TableData) {
    this.tableData = data;
    this.tableId = data.id;
    this.tableName = data.title;
    this.tableOwnerId = data.owner_id;
    this.checkDayClosedStatus();
    this.updateAddButtonVisibility();

    this.columns = this.checkEditPermissions(data.columns);
    this.tableColumns = buildTableColumns(data.columns);
    this.filterColumns = buildFilterColumns(data.columns);

    // Add previous day date to Old Stock column header
    const todayObj = new Date();
    const prevDateObj = new Date(todayObj);
    prevDateObj.setDate(todayObj.getDate() - 1);
    const pdStr = String(prevDateObj.getDate()).padStart(2, '0');
    const pmStr = String(prevDateObj.getMonth() + 1).padStart(2, '0');
    const pyStr = String(prevDateObj.getFullYear()).slice(-2);
    const prevDateStr = `${pmStr}/${pdStr}/${pyStr}`;

    this.tableColumns.forEach((col) => {
      const headerName = (col.header || '').toLowerCase();
      if (
        headerName === 'old stock' ||
        headerName === 'old_stock' ||
        headerName === 'oldstock'
      ) {
        col.header = `${col.header} (${prevDateStr})`;
      }
    });

    // Normalize records to handle all variations of userId/user_id/username/user_name
    const todayStr = new Date().toISOString().split('T')[0];

    const flattenedRecords = (data.records || []).map((record: any) => {
      const flatRecord = { ...record };
      if (Array.isArray(record.values)) {
        record.values.forEach((v: any) => {
          if (v.column && v.column.name) {
            flatRecord[v.column.name] = v.value;
          }
        });
      }
      return flatRecord;
    });

    this.selectedTableData = flattenedRecords
      .filter((record: any) => {
        const keys = Object.keys(record);

        // Date Filter: ensure record belongs to today using 'created_at' field
        const createdAtKey = keys.find((k) => k.toLowerCase() === 'created_at');
        if (createdAtKey && record[createdAtKey]) {
          const recordDate = new Date(record[createdAtKey])
            .toISOString()
            .split('T')[0];
          if (recordDate !== todayStr) {
            return false;
          }
        }

        const user = this.authService.getUser();
        const isAdmin = this.authService.isAdmin();
        const isSuperAdmin = this.authService.isSuperAdmin();
        const isGuest = this.authService.isGuest();

        if (isAdmin || isSuperAdmin || isGuest) return true;

        const userIdKey = keys.find(
          (k) => k.toLowerCase() === 'userid' || k.toLowerCase() === 'user_id'
        );

        const recordUserId = userIdKey ? record[userIdKey] : null;

        return recordUserId == user?.id;
      })
      .map((record: any) => {
        const normalized = { ...record };
        const keys = Object.keys(record);

        // Find best match for User ID
        const userIdKey = keys.find(
          (k) => k.toLowerCase() === 'userid' || k.toLowerCase() === 'user_id'
        );
        if (userIdKey) {
          normalized.userId = record[userIdKey];
          normalized.user_id = record[userIdKey];
          normalized.UserId = record[userIdKey];
        }

        // Find best match for Username
        const userNameKey = keys.find(
          (k) =>
            k.toLowerCase() === 'username' || k.toLowerCase() === 'user_name'
        );
        if (userNameKey) {
          normalized.username = record[userNameKey];
          normalized.user_name = record[userNameKey];
          normalized.UserName = record[userNameKey];
        }

        return normalized;
      });
  }

  checkEditPermissions(cols: any[]): any[] {
    return cols.map((col) => this.setColumnEditPermission(col));
  }

  setColumnEditPermission(col: any): any {
    const fieldName = (col.name || '').toLowerCase();

    // Check if it's one of the strictly system-controlled fields
    if (
      fieldName === 'userid' ||
      fieldName === 'user_id' ||
      fieldName === 'username' ||
      fieldName === 'user_name' ||
      fieldName === 'total'
    ) {
      col.canEdit = false;
      col.disabled = true;
      return col;
    }

    // For all other fields, they should remain fully editable
    col.canEdit = true;
    col.disabled = false;

    return col;
  }

  // --------------------------------------------------- Record Handlers --------------------------------------------------- //
  addRecord(data: any) {
    this.recordService
      .createTableRecord(data)
      .pipe(
        withLoadingAndAlert(this.spinner, (a) => (this.alert = a), {
          useModal: false,
          showSuccess: false,
          color: '#078787',
          loadingMessage: 'Saving record...',
          successMessage: `Record added successfully!`,
          errorMessage: `Failed to load records .`,
        })
      )
      .subscribe({
        next: (res) => {
          console.log('Record added successfully:', res);
          this.alert = {
            showAlert: true,
            description: 'Record added successfully!',
            type: 'success',
            status: 'success',
            title: 'Success',
          };
          // Optionally refresh table
          const obs: any = this.fetchTableData();
          if (obs && obs.subscribe) { obs.subscribe(); }
        },
        error: (err) => {
          console.error('Failed to add record:', err);
        },
      });
  }

  updateRecord(id: number, data: any) {
    this.recordService
      .update(id, data)
      .pipe(
        withLoadingAndAlert(this.spinner, (a) => (this.alert = a), {
          useModal: false,
          showSuccess: false,
          color: 'var(--primary-color)',
          loadingMessage: 'Updating record...',
          successMessage: `Record updated successfully!`,
          errorMessage: `Failed to load records.`,
        })
      )
      .subscribe({
        next: (res) => {
          console.log('Record updated successfully:', res);
          this.alert = {
            showAlert: true,
            description: 'Record updated successfully!',
            type: 'success',
            status: 'success',
            title: 'Success',
          };
          // Optionally refresh table
          const obs: any = this.fetchTableData();
          if (obs && obs.subscribe) { obs.subscribe(); }
        },
        error: (err) => {
          console.error('Failed to update record:', err);
        },
      });
  }

  deleteRecord = (id: number) => {
    let isAdmin = this.authService.isAdmin();
    let isSuperAdmin = this.authService.isSuperAdmin();
    if (!isAdmin && !isSuperAdmin) {
      return;
    }

    return this.recordService.delete(id);
  };

  bulkDeleteRecords(ids: number[]) {
    // Relying on native confirm to match user request constraint of not heavily modifying UI,
    // though a material dialog could be used. Let's use the material dialog component.
    const dialogRef = this.dialog.open(StandardConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Bulk Delete',
        message: `Are you sure you want to delete ${ids.length} selected records?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.spinner.show('Deleting selected records...');
        const deleteRequests = ids.map((id) => this.recordService.delete(id));

        forkJoin(deleteRequests).subscribe({
          next: () => {
            this.alert = {
              showAlert: true,
              description: `${ids.length} records successfully deleted.`,
              type: 'success',
              status: 'success',
              title: 'Success',
            };
            const obs: any = this.fetchTableData();
            if (obs && obs.subscribe) { obs.subscribe(); }
            this.spinner.hide();
          },
          error: (err) => {
            console.error('Failed to execute bulk delete:', err);
            this.spinner.hide();
            this.alert = {
              showAlert: true,
              description: 'Failed to delete some records.',
              type: 'danger',
              status: 'error',
              title: 'Error',
            };
          },
        });
      }
    });
  }

  // --------------------------------------------------- Modal Handlers --------------------------------------------------- //

  openViewModal(record: any) {
    if (this.tableId === 0) {
      console.error('Table ID is not set. Cannot view record.');
      return;
    }
  }

  selectTable() {
    const dialogRef = this.tableModalService.open(this.tables);
    dialogRef.afterClosed().subscribe((selectedTable) => {
      if (selectedTable) {
        this.tableId = selectedTable.id;
        this.checkDayClosedStatus();
        this.getTableData(selectedTable?.id || 0);
      }
    });
  }

  onChipsSubmit(selected: string[]) {
    console.log('Selected Chips:', selected);
    // You can send it to API or store in form
  }

  // --------------------------------------------------- Show Add Button Logic --------------------------------------------------- //
  showAddButton(): boolean {
    // Admin and super_admin always have add permission
    const user = this.authService.getUser();
    if (!user || !user.role_name) return false;

    const isAdmin = this.authService.isAdmin();
    const isSuperAdmin = this.authService.isSuperAdmin();

    if (isAdmin || isSuperAdmin) {
      return true;
    }

    // Check for status controller roles matching current table ID
    const roles = user.role_name.split(',').map((r: string) => r.trim());

    const controllers = roles.filter((r: string) => {
      // Case-insensitive match (i flag)
      const match = r.match(/statuscontrollerform(\d+)/i);
      if (!match) return false;

      const roleTableId = parseInt(match[1], 10);

      return roleTableId === this.tableId;
    });

    return controllers.length > 0;
  }

  openAddRecordModal() {
    if (this.tableId === 0) {
      console.error('Table ID is not set. Cannot add record.');
      return;
    }

    // Step 1: Build form fields from columns
    let formFields = buildColumnsWithFilters(this.columns);

    const user = this.authService.getUser();

    // Step 2: Patch userId, username, and status based on role
    formFields = formFields.map((field: any) => {
      const fieldName = (field.name || '').toLowerCase();
      // Patch userId field
      if (fieldName === 'userid' || fieldName === 'user_id') {
        const val =
          this.currentUserId != null ? String(this.currentUserId) : '';
        return { ...field, value: val, disabled: true };
      }

      // Patch username field
      if (fieldName === 'username' || fieldName === 'user_name') {
        const val =
          this.currentUserName != null ? String(this.currentUserName) : '';
        return { ...field, value: val, disabled: true };
      }

      return field;
    });

    // Step 3: Open Dynamic Form Dialog
    const dialogRef = this.dialog.open(DynamicFormWrapperDialogComponent, {
      data: { title: `Add Record`, fields: formFields },
    });

    // Step 4: After dialog close
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result?.success) return;

      let formValue = result.data;

      // Step 5: Prepare formatted values for backend
      const formattedValues = this.columns.map((col) => {
        let val = formValue[col.name];
        const colName = col.name.toLowerCase();

        // Patch userId & username
        if (colName === 'userid' || colName === 'user_id')
          val = String(this.currentUserId);
        if (colName === 'username' || colName === 'user_name')
          val = this.currentUserName;

        if (col.name === 'column1' && (!val || val === '')) {
          val = '---';
        }
        if (col.name === 'column2' && (!val || val === '')) {
          val = '---';
        }

        return {
          column_id: col.id,
          value: val !== null && val !== undefined ? String(val) : '',
        };
      });

      // Step 6: Final payload
      const formData = {
        table_id: this.tableId,
        owner_id: this.tableData?.owner_id || this.currentUserId,
        created_by: this.currentUserId,
        values: formattedValues,
      };

      // Step 7: Submit
      this.addRecord(formData);
    });
  }

  openEditRecordModal(record: any) {
    if (!record || !record.id) {
      console.error('Record is not valid. Cannot edit.');
      return;
    }

    // Step 1: Build form fields from columns
    let formFields = buildColumnsWithFilters(this.columns);

    const user = this.authService.getUser();
    const userRoleName = user?.role_name?.toLowerCase() || '';
    const tableRole = `form${this.tableId}_user`.toLowerCase();
    const isAdmin = this.authService.isAdmin();
    const isSuperAdmin = this.authService.isSuperAdmin();

    // Determine current record's owner (userId)
    const recordUserId = record.userid || record.user_id || record.UserId || '';

    // Step 2: Patch values into form fields
    formFields = formFields.map((field: any) => {
      const fieldName = (field.name || '').toLowerCase();
      let val = record[field.name];

      // Patch userId field (always protected)
      if (fieldName === 'userid' || fieldName === 'user_id') {
        return { ...field, value: String(recordUserId), disabled: true };
      }

      // Patch username field (always protected)
      if (fieldName === 'username' || fieldName === 'user_name') {
        const uVal = record.username || record.user_name || '';
        return { ...field, value: String(uVal), disabled: true };
      }

      return { ...field, value: val };
    });

    // Step 3: Open Dynamic Form Dialog
    const dialogRef = this.dialog.open(DynamicFormWrapperDialogComponent, {
      data: { title: `Edit Record`, fields: formFields },
    });

    // Step 4: After dialog close
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result?.success) return;

      let formValue = result.data;

      // Step 5: Prepare formatted values for backend
      const formattedValues = this.columns.map((col) => {
        let val = formValue[col.name];

        if (val === undefined || val === null || val === '') {
          val = record[col.name];
        }

        return {
          column_id: col.id,
          value: val !== null && val !== undefined ? String(val) : '',
        };
      });

      // Step 6: Final payload
      const formData = {
        id: record.id,
        table_id: this.tableId,
        owner_id:
          record.userid ||
          record.user_id ||
          record.UserId ||
          this.currentUserId,
        updated_by: this.currentUserId,
        values: formattedValues,
      };

      // Step 7: Submit
      this.updateRecord(record.id, formData);
    });
  }

  // --------------------------------------------------- Utility Methods --------------------------------------------------- //
  mapFormValuesToBackendFormat(formValue: any) {
    const formattedValues = Object.keys(formValue)
      .map((key) => {
        const col = this.columns.find((c) => c.name === key);
        return col
          ? { column_id: col.id, value: formValue[key] ?? null }
          : null;
      })
      .filter((v) => v !== null);
    return formattedValues;
  }

  handleCloseDay() {
    const dialogRef = this.dialog.open(CloseDayModalComponent, {
      width: '400px',
      data: { tableId: this.tableId },
    });

    dialogRef.afterClosed().subscribe((userId) => {
      if (userId && this.tableId) {
        this.spinner.show('Closing day operations...');
        this.dayClosingService.closeDay(userId, this.tableId).subscribe({
          next: (res) => {
            this.isDayClosed = true;
            this.checkDayClosedStatus();
            this.dayClosed.emit();
            this.spinner.hide();
            this.alert = {
              showAlert: true,
              status: 'success',
              type: 'success',
              title: 'Success',
              description: 'Day closed successfully for the selected user.',
            };
          },
          error: (err) => {
            console.error('Failed to close day:', err);
            this.spinner.hide();
          },
        });
      }
    });
  }

  onCloseDayConfirm(action: string) {
    // This method is now replaced by handleCloseDay modal flow
  }

  handleReopenDay() {
    const dialogRef = this.dialog.open(ReopenDayModalComponent, {
      width: '400px',
      data: { tableId: this.tableId },
    });

    dialogRef.afterClosed().subscribe((userId) => {
      if (userId && this.tableId) {
        this.spinner.show('Reopening day...');
        this.dayClosingService.reopenDayByUser(userId, this.tableId).subscribe({
          next: () => {
            this.checkDayClosedStatus();
            this.spinner.hide();
            this.alert = {
              showAlert: true,
              status: 'success',
              type: 'success',
              title: 'Success',
              description: 'Day reopened successfully for the selected user.',
            };
          },
          error: (err) => {
            console.error('Failed to reopen day:', err);
            this.spinner.hide();
          },
        });
      }
    });
  }

  onReopenConfirm(action: string) {
    // This method is now replaced by handleReopenDay modal flow
  }
}
