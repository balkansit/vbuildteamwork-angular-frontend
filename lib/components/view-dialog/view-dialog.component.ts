import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-view-dialog',
    templateUrl: './view-dialog.component.html',
    styleUrls: ['./view-dialog.component.css'],
    standalone: false
})
export class ViewDialogComponent {
  objectKeys = Object.keys;

  constructor(
    public dialogRef: MatDialogRef<ViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; item: any }
  ) {}


  close(): void {
    this.dialogRef.close();
  }
}
