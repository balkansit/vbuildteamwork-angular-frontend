import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BillingPrintData } from '../print-data.interface';

@Component({
  selector: 'app-billing-a4-print',
  templateUrl: './billing-a4-print.component.html',
  styleUrls: ['./billing-a4-print.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class BillingA4PrintComponent implements OnInit {
  @Input() printData?: BillingPrintData;
  @Input() preview = true;

  ngOnInit(): void {
    console.log('🧾 A4 Print Data:', this.printData);
  }

  get subtotal(): number {
    return this.printData?.summary?.subtotal || 0;
  }

  get discountAmount(): number {
    return this.printData?.summary?.discount || 0;
  }

  get taxableAmount(): number {
    return this.printData?.summary?.taxableAmount || 0;
  }

  get totalTax(): number {
    return this.printData?.summary?.totalTax || 0;
  }

  get grandTotal(): number {
    return this.printData?.summary?.grandTotal || 0;
  }

  get isTaxEnabled(): boolean {
    return this.printData?.taxInfo?.enabled || false;
  }

  printBill(): void {
    window.print();
  }
}
