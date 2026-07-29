import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'projects/arun-form/src/app/services/apis/user.service';
import { SpinnerLoadingService } from '@lib/services/components/spinner-loading.service';

@Component({
  selector: 'app-reopen-day-modal',
  standalone: false,
  templateUrl: './reopen-day-modal.component.html',
  styleUrls: ['./reopen-day-modal.component.css']
})
export class ReopenDayModalComponent implements OnInit {
  users: any[] = [];
  selectedUserId: number | null = null;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<ReopenDayModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tableId: number },
    private userService: UserService,
    private spinner: SpinnerLoadingService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (res) => {
        this.users = res.data?.data || res.data || res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch users:', err);
        this.loading = false;
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.selectedUserId) {
      this.dialogRef.close(this.selectedUserId);
    }
  }
}
