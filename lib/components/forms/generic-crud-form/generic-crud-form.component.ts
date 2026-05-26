// generic-crud-form.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormField } from '@lib/models/FormField.model';
import { Router } from '@angular/router';
import { SpinnerLoadingService } from '@lib/services/components/spinner-loading.service';
import { AlertData } from '@lib/models/Alert.model';
import { withLoadingAndAlert } from '@lib/utils/withLoadingAndAlert';

@Component({
  selector: 'app-generic-crud-form',
  standalone: false,
  templateUrl: './generic-crud-form.component.html',
  styleUrls: ['./generic-crud-form.component.css'],
})
export class GenericCrudFormComponent {
  @Input() title: string = 'Form';
  @Input() subtitle: string = '';
  @Input() formFields: FormField[] = [];

  @Input() submitFn!: (formData: any) => any; // must return Observable
  @Input() buttonLabel: string = 'Save';
  @Input() successRedirect: string = '';
  @Input() useModalAlert: boolean = true;

  // Output event for modal clicks
  @Output() openModal = new EventEmitter<{
    rowIndex: number;
    colKey: string;
    callback: (data: any) => void;
  }>();

  @Output() formDataChange = new EventEmitter<any>();

  alert: AlertData | null = null;
  triggerReset: boolean = false;

  constructor(
    private router: Router,
    private spinnerLoadingService: SpinnerLoadingService
  ) {}

  // ---------------- Submit ----------------
  onSubmit(data: any): void {
    if (!this.submitFn || !data) {
      this.formDataChange.emit(data);
      return;
    }

    this.submitFn(data)
      .pipe(
        withLoadingAndAlert(
          this.spinnerLoadingService,
          (alert) => (this.alert = alert),
          {
            useModal: this.useModalAlert,
            showSuccess: true,
            loadingMessage: 'Saving...',
            successMessage: `${this.title} saved!`,
            errorMessage: `Failed to save ${this.title.toLowerCase()}.`,
          }
        )
      )
      .subscribe((res: any) => {
        if (res?.success && this.successRedirect) {
          this.router.navigate([this.successRedirect]);
        }
      });
  }

  // ---------------- Reset Form ----------------
  resetForm() {
    this.triggerReset = true;
    setTimeout(() => (this.triggerReset = false), 0);
  }

  // ---------------- Cancel ----------------
  onCancel() {
    if (this.successRedirect) {
      this.router.navigate([this.successRedirect]);
    } else {
      window.history.back();
    }
  }

  // ---------------- Alert Closed ----------------
  onAlertClosed() {
    this.alert = null;
  }

  // ---------------- Open Modal ----------------
  openModalClick(event: any) {
    this.openModal.emit(event);
  }
}
