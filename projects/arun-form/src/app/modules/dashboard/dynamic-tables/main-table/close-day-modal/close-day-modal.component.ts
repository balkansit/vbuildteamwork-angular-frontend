import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@lib/services/auth/auth.service';
import { UserService } from 'projects/arun-form/src/app/services/apis/user.service';

@Component({
  selector: 'app-close-day-modal',
  standalone: false,
  templateUrl: './close-day-modal.component.html',
  styleUrls: ['./close-day-modal.component.css']
})
export class CloseDayModalComponent implements OnInit {
  currentUser: any = null;
  users: any[] = [];
  selectedUserId: number | null = null;
  isAdmin = false;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<CloseDayModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tableId: number },
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.isAdmin = this.authService.isAdmin() || this.authService.isSuperAdmin();
    
    if (this.isAdmin) {
      this.fetchUsers();
    } else {
      this.selectedUserId = this.currentUser?.id;
    }
  }

  fetchUsers() {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (res) => {
        this.users = res.data || res;
        this.selectedUserId = this.currentUser?.id; // Default to current user
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
