import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';

export interface ModalAlert {
  show: boolean;
  status: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description: string;
  iconClass?: string; // Optional icon class for custom icons
  buttons?: AlertButton[]; // Array of buttons to display
  autoDismissSeconds?: number; // Auto-dismiss after X seconds
  closed?: () => void; // Callback when alert is closed
}

export interface AlertButton {
  label: string;
  class?: string; // e.g. btn-primary, btn-danger
  action: string; // emitted action key
}

@Component({
  selector: 'app-modal-alert',
  standalone: false,
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.css'],
})
export class ModalAlertComponent implements OnInit, OnDestroy {
  @Input() show = false;
  @Input() status: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() title = '';
  @Input() description = '';
  @Input() buttons: AlertButton[] = [
    { label: 'Close', class: 'btn-primary', action: 'close' },
  ];
  @Input() autoDismissSeconds?: number;

  @Output() action = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();

  private timer: any;

  ngOnInit() {
    if (this.autoDismissSeconds) {
      this.timer = setTimeout(
        () => this.handleAction('auto-close'),
        this.autoDismissSeconds * 1000
      );
    }
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }

  handleAction(actionKey: string) {
    this.action.emit(actionKey);
    this.close();
  }

  close() {
    this.closed.emit();
  }

  get iconClass(): string {
    switch (this.status) {
      case 'success':
        return 'fas fa-check-circle text-success';
      case 'error':
        return 'fas fa-times-circle text-danger';
      case 'warning':
        return 'fas fa-exclamation-triangle text-warning';
      default:
        return 'fas fa-info-circle text-primary';
    }
  }
}

/*
Example usage in a parent component template:

<app-modal-alert
  [show]="showAlert"
  [status]="'warning'"
  [title]="'Delete Item'"
  [description]="'Are you sure you want to delete this item?'"
  [buttons]="[
    { label: 'Cancel', class: 'btn-secondary', action: 'cancel' },
    { label: 'Delete', class: 'btn-danger', action: 'delete' }
  ]"
  [autoDismissSeconds]="10"
  (action)="onAlertAction($event)"
  (closed)="onAlertClosed()"
></app-modal-alert>

In the parent component TypeScript:

showAlert = true;

onAlertAction(action: string) {
  if (action === 'delete') {
    // perform delete logic
  }
  this.showAlert = false;
}

onAlertClosed() {
  this.showAlert = false;
}
*/
