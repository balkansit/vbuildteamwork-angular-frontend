import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-standard-confirm-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button
        mat-raised-button
        color="warn"
        [mat-dialog-close]="true"
        cdkFocusInitial
      >
        Confirm
      </button>
    </mat-dialog-actions>
  `,
  standalone: false,
})
export class StandardConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StandardConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
