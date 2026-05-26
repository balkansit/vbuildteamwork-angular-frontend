import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-header',
  standalone: false,
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css'],
})
export class TableHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() elevation: boolean = false;
  // Show or hide the button
  @Input() showExport: boolean = true;

  // Enable or disable the button
  @Input() canExport: boolean = true;

  @Input() showBulkDelete: boolean = true;
  @Input() showAddButton: boolean = true; // default true
  @Input() showCloseDay: boolean = false;
  @Input() showReopenDay: boolean = false;

  @Output() refresh = new EventEmitter<void>();
  @Output() export = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();
  @Output() closeDay = new EventEmitter<void>();
  @Output() reopenDay = new EventEmitter<void>();
  @Output() bulkDelete = new EventEmitter<void>();
}
