import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-manual-payment-processing-bits',
  standalone: false,
  templateUrl: './manual-payment-processing-bits.component.html',
  styleUrls: ['./manual-payment-processing-bits.component.css'],
})
export class ManualPaymentProcessingBitsComponent {
  @Input() show = false;
  @Input() paymentMethod: string = '';
  @Input() amount = 0;
  @Input() description = 'Your payment is being processed, please wait...';
  @Input() loading = false;

  @Output() action = new EventEmitter<string>();

  amountReceived = 0;
  balanceToReturn = 0;

  get paymentMethodIcon(): string {
    switch (this.paymentMethod) {
      case 'cash':
        return 'assets/icons/cash.svg';
      case 'upi':
        return 'assets/icons/upi.svg';
      case 'card':
        return 'assets/icons/card.svg';
      default:
        return '';
    }
  }

  get statusIcon(): string {
    return this.loading
      ? 'fas fa-spinner fa-spin text-primary'
      : 'fas fa-credit-card text-primary';
  }

  calculateBalance() {
    this.balanceToReturn = Math.max(this.amountReceived - this.amount, 0);
  }

  handleAction(actionKey: string) {
    if (actionKey === 'payment-completed') {
      this.action.emit('payment-completed');
    } else {
      this.action.emit(actionKey);
    }
  }
}
