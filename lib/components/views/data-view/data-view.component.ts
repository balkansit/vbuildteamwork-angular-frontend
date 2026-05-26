import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ViewType = 'form' | 'table';

export interface DataField {
  name: string;
  label: string;
  value: any;
  type?:
    | 'text'
    | 'date'
    | 'email'
    | 'phone'
    | 'password'
    | 'textarea'
    | 'image'
    | 'dropdown';
  labelIcon?: string; // <== NEW
  options?: { label: string; value: any }[];
  formatFn?: (value: any) => string;
  rows?: number;
}

export interface ActionButton<T = any> {
  iconClass?: string;
  label?: string;
  tooltip?: string;
  click: (row?: T) => void; // <-- allow optional row
  variant?: string;
}

@Component({
  selector: 'app-data-view',
  standalone: false,
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css'],
})
export class DataViewComponent {
  @Input() show = false;
  @Input() title = '';
  @Input() iconClass = '';
  @Input() viewType: ViewType = 'form'; // 'form' | 'table'
  @Input() dataFields: DataField[] = [];
  @Input() actionButtons: ActionButton[] = [];
  @Input() rowData?: any; // <-- row/object that action buttons can use
  @Input() imageUrl: string = ''; // <-- base URL for images

  @Input() closeButtonPosition: 'center' | 'right' = 'right';

  @Output() closed = new EventEmitter<void>();

  onClose() {
    this.closed.emit();
  }

  getButtonLabel(btn: any, row: any): string {
    if (!btn?.label) return '';
    return typeof btn.label === 'function' ? btn.label(row) : btn.label;
  }

  getDisplayValue(field: DataField): string {
    const value = field.value;
    if (value == null || value === '') return '-';

    switch (field.type) {
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'dropdown':
        return field.options?.find((opt) => opt.value === value)?.label || '-';
      case 'password':
        return '••••••••';
      default:
        return field.formatFn ? field.formatFn(value) : value.toString();
    }
  }
}
