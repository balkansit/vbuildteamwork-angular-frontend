import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseTableComponent } from '@lib/components/tables/base-table/base-table.component';
import { TableService } from 'projects/arun-form/src/app/services/apis/table.service';
import { UserService } from 'projects/arun-form/src/app/services/apis/user.service';
import { AuthService } from '@lib/services/auth/auth.service';
import { SpinnerLoadingService } from '@lib/services/components/spinner-loading.service';
import { AlertData } from '@lib/models/Alert.model';
import { buildTableColumns, buildColumnsWithFilters } from 'projects/arun-form/src/app/models/dbschema/tables.model';
import { TableRecordsService } from 'projects/arun-form/src/app/services/apis/table-record.service';
import { FormField } from '@lib/models/FormField.model';
import { tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  alert: AlertData | null = null;
  users: any[] = [];
  tables: any[] = [];
  
  // Filters
  selectedUserId: number | null = null;
  selectedTableId: number | null = null;
  selectedDate: string = '';

  // Auth Info
  currentUser: any = null;
  isAdmin: boolean = false;
  isGuest: boolean = false;

  // Data
  tableData: any = null;
  tableColumns: any[] = [];
  showTable: boolean = false;
  
  @ViewChild(BaseTableComponent) table!: BaseTableComponent<any>;

  constructor(
    private tableService: TableService,
    private userService: UserService,
    private recordService: TableRecordsService,
    private authService: AuthService,
    private spinner: SpinnerLoadingService
  ) {}

ngOnInit(): void {
  this.currentUser = this.authService.getUser();

  this.isGuest = this.authService.isGuest(); // ✅ FIX
  this.isAdmin = this.authService.isAdmin() || this.authService.isSuperAdmin();

  if (this.isAdmin || this.isGuest) {
    this.fetchUsers();
  } else {
    this.selectedUserId = this.currentUser?.id;
  }

  this.fetchTables();
}
  fetchUsers() {
    this.userService.getAll().subscribe({
      next: (res: any) => {
        let allUsers = res.data?.data || res.data || res;
        
        // Filter out Super Admin and Guest roles for the dropdown
        this.users = allUsers.filter((u: any) => {
           const slug = u.role_slug || u.role_name || (u.role ? u.role.slug || u.role.name : '');
           const normalizedSlug = String(slug).toLowerCase().trim().replace(' ', '_');
           return normalizedSlug !== 'super_admin' && normalizedSlug !== 'guest';
        });
      },
      error: (err: any) => console.error('Failed to fetch users', err)
    });
  }

  deleteItem = (id: number) => {
  return this.recordService.delete(id);
};

  fetchTables() {
    this.tableService.getAll().subscribe({
      next: (res: any) => {
        this.tables = res.data?.data || res.data || [];
      },
      error: (err: any) => console.error('Failed to fetch tables', err)
    });
  }

  fetchReport() {
    this.getReportObservable().subscribe();
  }

  getReportObservable() {
    if (!this.selectedTableId || !this.selectedUserId) {
       this.alert = {
           showAlert: true, type: 'warning', status: 'warning', title: 'Warning',
           description: 'Please select both User and Table.'
       };
       return of({ success: false, message: 'Missing filters' });
    }

    if (this.showTable && this.table) {
        this.table.refresh();
    }
    this.showTable = true;
    return of({ success: true });
  }

  filterRecords(records: any[]) {
    // Frontend filtering is removed, filtering is now handled by the backend API.
  }

  // To display the view format for the table
  getViewFields = (item: any) => {
     return this.tableColumns;
  }
  
  getEditFormFields = (record: any): FormField[] => {
    if (!this.tableData || !this.tableData.columns) return [];
    
    let formFields = buildColumnsWithFilters(this.tableData.columns);

    // Patch values and disable specific fields
    formFields = formFields.map((field: any) => {
      const fieldName = (field.name || '').toLowerCase();
      let val = record[field.name];

      // Disable User ID
      if (fieldName === 'userid' || fieldName === 'user_id') {
        const recordUserId = record.userid || record.user_id || record.UserId || '';
        return { ...field, value: String(recordUserId), disabled: true };
      }

      // Disable Username
      if (fieldName === 'username' || fieldName === 'user_name') {
        const uVal = record.username || record.user_name || '';
        return { ...field, value: String(uVal), disabled: true };
      }

      return { ...field, value: val };
    });

    return formFields;
  }

updateItem = (id: number, formValue: any) => {
  if (this.isGuest) {
    throw new Error('Guest cannot update records');
  }

  if (!this.tableData || !this.tableData.columns) {
    throw new Error('Table data not loaded');
  }

  const formattedValues = this.tableData.columns.map((col: any) => {
    let val = formValue[col.name];
    return {
      column_id: col.id,
      value: val !== null && val !== undefined ? String(val) : '',
    };
  });

  const formData = {
    id: id,
    table_id: this.selectedTableId,
    owner_id: formValue.userid || formValue.user_id || this.currentUser?.id,
    updated_by: this.currentUser?.id,
    values: formattedValues,
  };

  return this.recordService.update(id, formData);
};
  
  // Method called by base-table for backend pagination
  fetchTableData = (params?: any) => {
    if (!this.selectedTableId) return of({ success: false });

    const queryParams: any = { ...params };
    
    if (this.selectedUserId) {
        queryParams.user_id = this.selectedUserId;
    }
    
    if (this.selectedDate) {
        queryParams.date = this.selectedDate;
    }

    return this.tableService.getById(this.selectedTableId, queryParams).pipe(
      tap((res: any) => {
         if (res.success && res.data) {
             const tableData = res.data;
             this.tableData = tableData;
             
             let columns = buildTableColumns(tableData.columns).filter((col: any) => col.key !== 'actions');
             columns = [
               { key: 'created_at', header: 'Date', type: 'date' },
               ...columns
             ];
             this.tableColumns = columns;
             
             if (tableData.records && tableData.records.length === 0) {
                 this.alert = {
                     showAlert: true, type: 'info', status: 'info', title: 'No Data',
                     description: 'No records found for the selected filters.'
                 };
             } else {
                 this.alert = null;
             }
         }
      }),
      map((res: any) => {
         if (res.success && res.data) {
             const tableData = res.data;
             
             const mappedRecords = (tableData.records || []).map((record: any) => {
                 let formattedDate = '-';
                 if (record.created_at) {
                     const d = new Date(record.created_at);
                     if (!isNaN(d.getTime())) {
                         const year = d.getFullYear();
                         const month = String(d.getMonth() + 1).padStart(2, '0');
                         const day = String(d.getDate()).padStart(2, '0');
                         formattedDate = `${year}-${month}-${day}`;
                     }
                 }
                 
                 const flattened = { ...record, created_at: formattedDate };
                 if (record.values && Array.isArray(record.values)) {
                   record.values.forEach((v: any) => {
                     if (v.column && v.column.name) flattened[v.column.name] = v.value;
                     else if (v.column_name) flattened[v.column_name] = v.value;
                   });
                 }
                 return flattened;
             });

             return {
                 success: true,
                 data: {
                     data: mappedRecords,
                     total: tableData.pagination?.total || mappedRecords.length
                 }
             };
         }
         return res;
      })
    );
  };
}
