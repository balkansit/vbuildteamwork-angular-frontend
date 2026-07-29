import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DayClosingService } from 'projects/arun-form/src/app/services/utils/day-closing.service';
import { SpinnerLoadingService } from '@lib/services/components/spinner-loading.service';
import { AlertData } from '@lib/models/Alert.model';
import { AuthService } from '@lib/services/auth/auth.service';
import { UserService } from 'projects/arun-form/src/app/services/apis/user.service';
import { TableService } from 'projects/arun-form/src/app/services/apis/table.service';
import { ConfirmDialogService } from '@lib/services/components/confirm-dialog.service';

@Component({
  selector: 'app-day-closings',
  standalone: false,
  templateUrl: './day-closings.component.html',
  styleUrls: ['./day-closings.component.css'],
})
export class DayClosingsComponent implements OnInit {
  closings: any[] = [];
  alert: AlertData | null = null;

  users: any[] = [];
  tables: any[] = [];

  selectedUserId: number | null = null;
  selectedTableId: number | null = null;
  selectedDate: string = '';

  currentPage: number = 1;
  pageSize: number = 10;

  currentUser: any = null;
  isAdmin: boolean = false;

  tableColumns = [
    { key: 'date', header: 'Date' },
    { key: 'user.name', header: 'User' },
    { key: 'table.name', header: 'Table' },
    { key: 'is_closed', header: 'Status' },
    { key: 'closer.name', header: 'Closed By' },
    { key: 'reopened_by', header: 'Reopened By' },
    { key: 'reopened_at', header: 'Reopened At' },
  ];

  constructor(
    private dayClosingService: DayClosingService,
    private spinner: SpinnerLoadingService,
    private authService: AuthService,
    private userService: UserService,
    private tableService: TableService,
    private confirmDialog: ConfirmDialogService
  ) {}

  get filteredClosings() {
    return this.closings.filter((c) => {
      // Filter by User
      if (this.selectedUserId) {
        if (c.user_id !== Number(this.selectedUserId)) return false;
      } else if (!this.isAdmin && this.currentUser?.id) {
        if (c.user_id !== this.currentUser.id) return false;
      }

      // Filter by Table
      if (this.selectedTableId) {
        if (c.table_id !== Number(this.selectedTableId)) return false;
      }

      // Filter by Date
      if (this.selectedDate) {
        // Assuming c.date is yyyy-mm-dd format
        const cDateObj = new Date(c.date);
        const selectedDateObj = new Date(this.selectedDate);
        if (
          cDateObj.toISOString().split('T')[0] !==
          selectedDateObj.toISOString().split('T')[0]
        ) {
          return false;
        }
      }

      return true;
    });
  }

  get paginatedClosings() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredClosings.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredClosings.length / this.pageSize);
  }

  get pages(): number[] {
    const pages = [];
    const total = this.totalPages;
    if (total <= 1) return [];

    // Show a limited number of pages if many
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(total, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.isAdmin =
      this.authService.isAdmin() || this.authService.isSuperAdmin();

    if (this.isAdmin) {
      this.fetchUsers();
    } else {
      this.selectedUserId = this.currentUser?.id;
    }

    this.fetchTables();
    this.fetchClosings();
  }

  fetchUsers() {
    this.userService.getAll().subscribe({
      next: (res: any) => {
        this.users = res.data?.data || res.data || res;
      },
      error: (err: any) => console.error('Failed to fetch users', err),
    });
  }

  fetchTables() {
    this.tableService.getAll().subscribe({
      next: (res: any) => {
        this.tables = res.data?.data || res.data || [];
      },
      error: (err: any) => console.error('Failed to fetch tables', err),
    });
  }

  fetchClosings() {
    this.spinner.show('Loading closings...');
    this.dayClosingService.getAllClosings().subscribe({
      next: (res) => {
        this.closings = res.data?.data || res.data || [];
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Failed to fetch closings:', err);
        this.spinner.hide();
        this.alert = {
          showAlert: true,
          status: 'error',
          type: 'danger',
          title: 'Error',
          description: 'Failed to load day closings.',
        };
      },
    });
  }

  reopen(closing: any) {
    const datePipe = new DatePipe('en-US');
    // const formattedDate = datePipe.transform(closing.date, 'dd-MM-yyyy hh:mm a') || closing.date;

    this.confirmDialog
      .confirm(
        'Confirm Reopen',
        `Are you sure you want to reopen the day for ${closing.user?.name} ?`
      )
      .subscribe((confirmed) => {
        if (confirmed) {
          this.spinner.show('Reopening day...');
          this.dayClosingService.reopenDay(closing.id).subscribe({
            next: () => {
              this.fetchClosings();
              this.alert = {
                showAlert: true,
                status: 'success',
                type: 'success',
                title: 'Success',
                description:
                  'Day reopened successfully. The user can now add records.',
              };
            },
            error: (err) => {
              console.error('Failed to reopen day:', err);
              this.spinner.hide();
              this.alert = {
                showAlert: true,
                status: 'error',
                type: 'danger',
                title: 'Error',
                description: 'Failed to reopen day.',
              };
            },
          });
        }
      });
  }

  getLocalTime(date: any): string {
    if (!date) return '';
    // Append 'Z' to ensure it's treated as UTC if it's a raw SQL timestamp
    const dateStr =
      typeof date === 'string' && !date.endsWith('Z') ? date + 'Z' : date;
    return new Date(dateStr).toLocaleString();
  }
}
