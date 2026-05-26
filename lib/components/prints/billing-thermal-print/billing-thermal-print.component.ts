import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BillingPrintData } from '../print-data.interface';

@Component({
  selector: 'app-billing-thermal-print',
  standalone: false,
  templateUrl: './billing-thermal-print.component.html',
  styleUrls: ['./billing-thermal-print.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BillingThermalPrintComponent {
  @Input() printData?: BillingPrintData;
  @Input() preview = true;
  groupedTaxData = [
    { gstPercent: 5, taxable: 1000, taxAmount: 50 },
    { gstPercent: 12, taxable: 2000, taxAmount: 240 },
    { gstPercent: 18, taxable: 1500, taxAmount: 270 },
  ];

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
