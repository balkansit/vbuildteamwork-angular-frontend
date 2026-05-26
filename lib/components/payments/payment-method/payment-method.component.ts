import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';

export interface PaymentMethod {
  id: string;
  name: string;
  icon?: string;
  isDefault?: boolean;
}

@Component({
  selector: 'app-payment-method',
  standalone: false,
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'],
})
export class PaymentMethodComponent {
  @Input() methods: PaymentMethod[] = [];
  @Input() selectedMethodId?: string;
  @Input() showRadio: boolean = true;
  @Input() disabledMethodIds: string[] = [];
  @Input() layout: 'column' | 'row' = 'column'; // affects direction
  @Output() methodSelected = new EventEmitter<string>();

  isDisabled(id: string): boolean {
    return this.disabledMethodIds.includes(id);
  }

  selectMethod(id: string) {
    if (!this.isDisabled(id)) {
      this.methodSelected.emit(id);
    }
  }
}

// Example usage in a parent component:

// paymentMethods = [
//   { id: 'card', name: 'Credit Card', icon: 'assets/icons/card.svg', isDefault: true },
//   { id: 'upi', name: 'UPI', icon: 'assets/icons/upi.svg' },
//   { id: 'paypal', name: 'PayPal', icon: 'assets/icons/paypal.svg' },
// ];

// selectedId = 'card';

// onMethodSelect(id: string) {
//   this.selectedId = id;
// }

// <app-payment-method
//   [methods]="paymentMethods"
//   [selectedMethodId]="selectedId"
//   [disabledMethodIds]="['paypal']"
//   [layout]="'row'"
//   [showRadio]="true"
//   (methodSelected)="onMethodSelect($event)"
// ></app-payment-method>
