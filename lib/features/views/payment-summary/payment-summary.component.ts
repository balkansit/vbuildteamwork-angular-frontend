import { Component, input, Input } from '@angular/core';

export interface PaymentSummaryViewItem {
  label: string;
  value: number | string;
  isBold?: boolean;
  isHighlight?: boolean;
}

@Component({
  selector: 'app-payment-summary',
  standalone: false,
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.css'],
})
export class PaymentSummaryComponent {
  @Input() title = 'Payment Info';
  @Input() items: PaymentSummaryViewItem[] = [];
  @Input() total = 0;
}
