import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingSpinnerModalComponent } from 'lib/components/loadings/loading-spinner-modal/loading-spinner-modal.component';

@Injectable({ providedIn: 'root' })
export class SpinnerLoadingService {
  private dialogRef: MatDialogRef<LoadingSpinnerModalComponent> | null = null;
  private autoDismissTimeoutId: any;

  constructor(private dialog: MatDialog) {}

  show(
    message: string = 'Loading, please wait',
    color?: string,
    spinnerSize: number = 70,
    strokeWidth: number = 8,
    autoDismissMs?: number
  ) {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(LoadingSpinnerModalComponent, {
        disableClose: true,
        panelClass: 'custom-spinner-dialog',
        data: {
          color: color || 'var(--primary-color)',
          message,
          spinnerSize,
          strokeWidth,
          autoDismissMs,
        },
      });

      if (autoDismissMs && autoDismissMs > 0) {
        this.autoDismissTimeoutId = setTimeout(() => {
          this.hide();
        }, autoDismissMs);
      }
    }
  }

  hide() {
    if (this.autoDismissTimeoutId) {
      clearTimeout(this.autoDismissTimeoutId);
      this.autoDismissTimeoutId = null;
    }

    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }

  setLoading(
    state: boolean,
    options?: {
      color?: string;
      message?: string;
      spinnerSize?: number;
      strokeWidth?: number;
      autoDismissMs?: number;
    }
  ) {
    if (state) {
      this.show(
        options?.message || 'Loading, please wait',
        options?.color,
        options?.spinnerSize || 70,
        options?.strokeWidth || 8,
        options?.autoDismissMs
      );
    } else {
      this.hide();
    }
  }
}