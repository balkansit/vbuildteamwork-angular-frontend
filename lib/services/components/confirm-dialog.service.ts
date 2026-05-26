import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StandardConfirmDialogComponent } from '@lib/components/modals/standard-confirm-dialog/standard-confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}

  confirm(title: string, message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(StandardConfirmDialogComponent, {
      width: '400px',
      data: { title, message },
    });

    return dialogRef.afterClosed();
  }
}
