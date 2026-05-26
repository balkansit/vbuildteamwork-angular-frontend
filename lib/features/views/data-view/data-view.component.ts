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
    return typeof btn.label === 'function'
      ? btn.label(row)
      : btn.label;
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

/*
<app-data-view
  [show]="showUserModal"
  [title]="'User Details'"
  [iconClass]="'fas fa-user text-primary'"
  [viewType]="'form'"
  [dataFields]="userFields"
  [actionButtons]="actionButtons"
  closeButtonPosition="right"
  (closed)="showUserModal = false">
</app-data-view>


showUserModal = true;

userFields: DataField[] = [
  { name: 'name', label: 'Name', value: 'Jane Doe', labelIcon: 'fas fa-user' },
  { name: 'email', label: 'Email', value: 'jane@example.com', type: 'email', labelIcon: 'fas fa-envelope' },
  { name: 'phone', label: 'Phone', value: '+49 123 4567', type: 'phone', labelIcon: 'fas fa-phone' },
  { name: 'dob', label: 'Date of Birth', value: '1990-07-04', type: 'date', labelIcon: 'fas fa-calendar-alt' },
  { name: 'bio', label: 'Bio', value: 'Great user.', type: 'textarea', labelIcon: 'fas fa-comment' },
  {
    name: 'role', label: 'Role', value: 'admin', type: 'dropdown', labelIcon: 'fas fa-user-shield',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' }
    ]
  }
];

actionButtons: ActionButton[] = [
  {
    iconClass: 'fas fa-print',
    tooltip: 'Print',
    variant: 'outline-primary',
    click: () => window.print()
  },
  {
    iconClass: 'fas fa-star',
    tooltip: 'Favorite',
    variant: 'outline-warning',
    click: () => alert('Favorited!')
  }
];


export class MyComponent {
  showUserModal = true;

  userFields: DataField[] = [];

  actionButtons: ActionButton[] = [
    {
      iconClass: 'fas fa-print',
      tooltip: 'Print',
      variant: 'outline-primary',
      click: () => this.printUser()
    },
    {
      iconClass: 'fas fa-envelope',
      tooltip: 'Email',
      variant: 'outline-success',
      click: () => this.sendEmail()
    },
    {
      iconClass: 'fas fa-star',
      tooltip: 'Favorite',
      variant: 'outline-warning',
      click: () => this.toggleFavorite()
    }
  ];

  printUser() {
    // real print logic here
    window.print();
  }

  sendEmail() {
    // actual email logic here
    console.log('Send email to', this.userFields.find(f => f.name === 'email')?.value);
  }

  toggleFavorite() {
    // your real favorite toggle logic here
    console.log('Toggled favorite for user');
  }
}


*/
