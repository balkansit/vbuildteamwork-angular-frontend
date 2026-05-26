import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'material-table',
  standalone: false,
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css'],
})
export class MaterialTableComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() columns: {
    key: string;
    header: string;
    headerIcon?: string;
    cellIcon?: string;
    label?: string;
    type?: string;
    options?: any[];
  }[] = [];
  @Input() showSelect = false;
  @Input() showActions = false;
  @Input() isSelected?: (id: any) => boolean;
  @Input() actionsTemplate?: TemplateRef<any>;
  @Input() elevation?: string = 'mat-elevation-z8';
  @Input() imageUrl?: string = '';

  @Output() toggleRow = new EventEmitter<any>();
  @Output() toggleAllRows = new EventEmitter<boolean>();
  @Output() cellButtonClick = new EventEmitter<{ row: any; column: string }>();
  @Output() cellLinkClick = new EventEmitter<{ row: any; column: string }>();

  get displayedColumns(): string[] {
    const cols = [...this.columns.map((c) => c.key)];
    if (this.showSelect) cols.unshift('select');
    if (this.showActions) cols.push('actions');
    return cols;
  }

  onToggleAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleAllRows.emit(checked);
  }

  onToggleRow(row: any) {
    this.toggleRow.emit(row);
  }

  onCellButtonClick(row: any, columnKey: string) {
    this.cellButtonClick.emit({ row, column: columnKey });
  }

  onCellLinkClick(row: any, columnKey: string) {
    // Handle link click event
    console.log('Link clicked:', row[columnKey]);
    this.cellLinkClick.emit({ row, column: columnKey });
  }

  getChipClass(status: string, options?: any): string {
    if (!status) return '';
    if (!options) return 'bg-secondary text-white'; // default

    const key = status.toLowerCase(); // normalize
    const value = (options[key] || '').toLowerCase();

    switch (value) {
      case 'success':
        return 'bg-success text-white';
      case 'danger':
        return 'bg-danger text-white';
      case 'warning':
        return 'bg-warning text-dark';
      case 'info':
        return 'bg-info text-dark';
      default:
        return 'bg-secondary text-white';
    }
  }

  getChipLabel(status: string, options?: any): string {
    if (!status) return '';
    if (options) {
      const key = status.toLowerCase();
      return key in options ? key : status; // or options[key] ?? status
    }
    return status;
  }

  getAlertClass(status: string, options?: any): string {
    if (!status) return '';
    if (!options) return 'alert alert-secondary'; // default

    const key = status.toLowerCase(); // normalize
    const value = (options[key] || '').toLowerCase();

    switch (value) {
      case 'primary':
        return 'alert alert-primary';
      case 'secondary':
        return 'alert alert-secondary';
      case 'success':
        return 'alert alert-success';
      case 'danger':
        return 'alert alert-danger';
      case 'warning':
        return 'alert alert-warning';
      case 'info':
        return 'alert alert-info';
      case 'light':
        return 'alert alert-light';
      case 'dark':
        return 'alert alert-dark';
      default:
        return 'alert alert-secondary';
    }
  }

  getAlertLabel(status: string, options?: any): string {
    if (!status) return '';
    if (options) {
      const key = status.toLowerCase();
      return key in options ? key : status; // or options[key] ?? status
    }
    return status;
  }

  getBadgeClass(status: string): string {
    const statusMap: any = {
      'available': 'badge-success',
      'booked': 'badge-danger',
      'maintenance': 'badge-warning',
      'clean': 'badge-success',
      'dirty': 'badge-danger',
      'in-progress': 'badge-warning',
      'in_progress': 'badge-warning'
    };
    return statusMap[status?.toLowerCase()] || 'badge-secondary';
  }

  getBadgeIcon(status: string): string {
    const iconMap: any = {
      'available': 'fa-check-circle',
      'booked': 'fa-door-closed',
      'maintenance': 'fa-tools',
      'clean': 'fa-check-circle',
      'dirty': 'fa-times-circle',
      'in-progress': 'fa-spinner',
      'in_progress': 'fa-spinner'
    };
    return iconMap[status?.toLowerCase()] || 'fa-circle';
  }
}

/*
<material-table
  [dataSource]="supplierDataSource"
  [columns]="tableColumns"
  [showSelect]="true"
  [showActions]="true"
  [isSelected]="isSelected"
  [actionsTemplate]="actionButtons"
  (toggleRow)="toggleSupplier($event)"
  (toggleAllRows)="toggleAllSuppliers($event)">
</material-table>

<ng-template #actionButtons let-supplier>
  <button mat-button color="primary" (click)="editSupplier(supplier)">Edit</button>
  <button mat-button color="warn" (click)="deleteSupplier(supplier)">Delete</button>
</ng-template>


ts
tableColumns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'phone', header: 'Phone' },
];

supplierDataSource = new MatTableDataSource<Supplier>([]);
selectedSuppliers = new Set<number>();

isSelected = (id: number) => this.selectedSuppliers.has(id);

toggleSupplier(supplier: Supplier) {
  if (this.selectedSuppliers.has(supplier.id)) {
    this.selectedSuppliers.delete(supplier.id);
  } else {
    this.selectedSuppliers.add(supplier.id);
  }
}

toggleAllSuppliers(selectAll: boolean) {
  if (selectAll) {
    this.supplierDataSource.data.forEach(s => this.selectedSuppliers.add(s.id));
  } else {
    this.selectedSuppliers.clear();
  }
}

*/
