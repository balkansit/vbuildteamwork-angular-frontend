import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: false,
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent {
  @Input() show = false;
  @Input() title = 'Are you sure?';
  @Input() description = '';
  @Input() iconClass = 'fas fa-question-circle text-warning';
  @Input() buttons: { label: string; class: string; action: string }[] = [
    { label: 'Cancel', class: 'btn-outline-secondary', action: 'cancel' },
    { label: 'Confirm', class: 'btn-primary', action: 'confirm' },
  ];

  @Output() action = new EventEmitter<string>();

  handleAction(type: string) {
    this.action.emit(type);
  }
}

/*
Example usage in a parent component template:

<app-confirm-modal
  [show]="showConfirm"
  [title]="'Delete Item'"
  [description]="'Are you sure you want to delete this item?'"
  [iconClass]="'fas fa-exclamation-triangle text-danger'"
  [buttons]="[
    { label: 'No', class: 'btn-outline-secondary', action: 'cancel' },
    { label: 'Yes, Delete', class: 'btn-danger', action: 'confirm' }
  ]"
  (action)="onConfirmAction($event)">
</app-confirm-modal>

And in the parent component TypeScript:

showConfirm = false;

onConfirmAction(action: string) {
  if (action === 'confirm') {
    // Perform the delete action
  }
  this.showConfirm = false;
}
*/
