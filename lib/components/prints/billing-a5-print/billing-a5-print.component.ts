import { Component, Input } from '@angular/core';
import { BillingPrintData } from '../print-data.interface';

@Component({
  selector: 'app-billing-a5-print',
  templateUrl: './billing-a5-print.component.html',
  styleUrls: ['./billing-a5-print.component.css'],
  standalone: false,
})
export class BillingA5PrintComponent {
  @Input() printData?: BillingPrintData;
  @Input() preview = true;

  get subtotal(): number {
    return this.printData?.summary?.subtotal || 0;
  }

  get discountAmount(): number {
    return this.printData?.summary?.discount || 0;
  }

  get taxableAmount(): number {
    return this.printData?.summary?.taxableAmount || 0;
  }

  get grandTotal(): number {
    return this.printData?.summary?.grandTotal || 0;
  }

  get isTaxEnabled(): boolean {
    return this.printData?.taxInfo?.enabled || false;
  }

  printBill() {
    window.print();
  }
}
