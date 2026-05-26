import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Address {
  id: string | number;
  name: string;
  street: string;
  city: string;
  state?: string;
  zip?: string;
  country?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-address-card',
  standalone: false,
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css'],
})
export class AddressCardComponent {
  @Input() addresses: Address[] = [];
  @Input() selectedAddressId: string | number | null = null;

  @Input() showSelect: boolean = true;
  @Input() showEdit: boolean = true;
  @Input() showDelete: boolean = true;

  @Input() customClass: string | null = null;

  @Output() select = new EventEmitter<string | number>();
  @Output() edit = new EventEmitter<string | number>();
  @Output() delete = new EventEmitter<string | number>();

  onSelect(id: string | number) {
    this.select.emit(id);
  }

  onEdit(id: string | number) {
    this.edit.emit(id);
  }

  onDelete(id: string | number) {
    this.delete.emit(id);
  }
}

// This component is a reusable address card that can display a list of addresses.
// It allows for selecting, editing, and deleting addresses.
// Example usage:

// <app-address-card
//   [addresses]="myAddresses"
//   [showSelect]="false"
//   [showEdit]="true"
//   [showDelete]="true"
//   (edit)="onAddressEdit($event)"
//   (delete)="onAddressDelete($event)"
// ></app-address-card>

// General use (all features):

// <app-address-card
//   [addresses]="myAddresses"
//   [selectedAddressId]="selectedAddressId"
//   [showSelect]="true"
//   [showEdit]="true"
//   [showDelete]="true"
//   (select)="onAddressSelected($event)"
//   (edit)="onAddressEdit($event)"
//   (delete)="onAddressDelete($event)"
// ></app-address-card>

// checkout address card:
// <app-address-card
//   [addresses]="myAddresses"
//   [selectedAddressId]="selectedAddressId"
//   [showSelect]="true"
//   [showEdit]="false"
//   [showDelete]="false"
//   (select)="onAddressSelected($event)"
// ></app-address-card>
