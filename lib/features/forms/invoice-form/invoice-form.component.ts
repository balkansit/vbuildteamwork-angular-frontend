import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  standalone: false,
  templateUrl: './invoice-form.component.html',
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm!: FormGroup;

  @Output() formChanges = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.invoiceForm = this.fb.group({
      logoUrl: ['assets/images/Invoicegen.png', Validators.required],
      companyName: ['Invoxa Inc.', Validators.required],
      invoiceNumber: ['INV-2025-0001', Validators.required],
      title: ['Invoice', Validators.required],
      issueDate: [new Date(), Validators.required],
      dueDate: [
        new Date(new Date().setDate(new Date().getDate() + 30)),
        Validators.required,
      ],
      billFrom: this.fb.group({
        name: ['Invoxa HQ', Validators.required],
        address: ['123 Main St.', Validators.required],
        city: ['Berlin', Validators.required],
        state: [''],
        zip: ['10115', Validators.required],
        country: ['Germany', Validators.required],
      }),
      billTo: this.fb.group({
        name: ['John Doe', Validators.required],
        address: ['456 Elm St.', Validators.required],
        city: ['Munich', Validators.required],
        state: [''],
        zip: ['80331', Validators.required],
        country: ['Germany', Validators.required],
      }),
      items: this.fb.array([]),
      subtotal: [0],
      taxRate: [19],
      taxAmount: [0],
      discount: [0],
      total: [0],
      paymentInfo: [
        'Please transfer the total amount to IBAN DE1234567890, BIC: ABCDDEFF',
      ],
      terms: ['Payment is due within 30 days from the invoice date.'],
    });

    // Initialize items with example data
    const initialItems = [
      { name: 'Web Design', qty: 1, price: 1500 },
      { name: 'Hosting (12 months)', qty: 1, price: 240 },
    ];
    initialItems.forEach((item) => this.addItem(item));

    // Calculate totals initially and on form changes
    this.calculateTotals();
    this.invoiceForm.valueChanges.subscribe(() => {
      this.calculateTotals();
      this.formChanges.emit(this.invoiceForm.value);
    });
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(item?: any) {
    this.items.push(
      this.fb.group({
        name: [item?.name || '', Validators.required],
        qty: [item?.qty || 1, [Validators.required, Validators.min(1)]],
        price: [item?.price || 0, [Validators.required, Validators.min(0)]],
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  calculateTotals() {
    const items = this.invoiceForm.value.items;
    const subtotal = items.reduce(
      (sum: number, i: any) => sum + i.qty * i.price,
      0
    );
    const taxAmount = (subtotal * this.invoiceForm.value.taxRate) / 100;
    const discount = this.invoiceForm.value.discount || 0;
    const total = subtotal + taxAmount - discount;

    this.invoiceForm.patchValue(
      {
        subtotal,
        taxAmount,
        total,
      },
      { emitEvent: false }
    );
  }
}
