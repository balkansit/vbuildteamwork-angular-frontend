import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice, InvoiceItem } from '../../models/invoice.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'lib-invoice-form',
  standalone: false,
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm!: FormGroup;
  isEditMode = false;
  invoiceId: number | null = null;
  isLoading = false;

  // For Preview
  previewData: Partial<Invoice> = {
    invoice_no: 'INV-NEW',
    invoice_date: new Date().toISOString(),
    currency_code: 'USD',
    sub_total: 0,
    tax_total: 0,
    discount_total: 0,
    grand_total: 0,
    items: [],
    status: 'draft',
  };

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.invoiceId = +id;
        this.loadInvoice(this.invoiceId);
      } else {
        // Load settings to set defaults (prefix, currency, tax)
        this.loadSettings();
      }
    });

    // Live calculations
    this.invoiceForm.valueChanges.pipe(debounceTime(300)).subscribe((val) => {
      this.calculateTotals();
      this.updatePreview(val);
    });
  }

  initForm() {
    this.invoiceForm = this.fb.group({
      invoice_type: ['invoice', Validators.required],
      invoice_no: ['', Validators.required],
      invoice_date: [
        new Date().toISOString().split('T')[0],
        Validators.required,
      ],
      due_date: [''],
      customer_id: [''], // Can be improved with select
      currency_code: ['USD', Validators.required],
      status: ['draft', Validators.required],
      notes: [''],
      terms: [''],
      discount_total: [0],
      bill_from: this.fb.group({
        name: [''],
        address: [''],
        phone: [''],
        email: [''],
        tax_number: [''],
      }),
      bill_to: this.fb.group({
        name: [''],
        address: [''],
        phone: [''],
        email: [''],
      }),
      footer_text: [''],
      items: this.fb.array([]),
    });

    // Add one empty item by default for new invoice
    if (!this.isEditMode) {
      this.addItem();
    }
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  newItem(): FormGroup {
    return this.fb.group({
      item_name: ['', Validators.required],
      description: [''],
      quantity: [1, [Validators.required, Validators.min(0.01)]],
      unit_price: [0, [Validators.required, Validators.min(0)]],
      tax_percent: [0],
      tax_amount: [0],
      total: [0],
    });
  }

  addItem() {
    this.items.push(this.newItem());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.calculateTotals();
  }

  loadSettings() {
    this.invoiceService.getSettings().subscribe((settings) => {
      if (settings) {
        this.invoiceForm.patchValue({
          currency_code: settings.currency_code,
          footer_text: settings.default_footer_text,
          bill_from: {
            name: settings.company_name,
            address: settings.address,
            phone: settings.phone,
            email: settings.email,
            tax_number: settings.tax_number,
          },
        });
      }
    });
  }

  loadInvoice(id: number) {
    this.isLoading = true;
    this.invoiceService.getInvoice(id).subscribe((invoice) => {
      this.invoiceForm.patchValue({
        invoice_type: invoice.invoice_type,
        invoice_no: invoice.invoice_no,
        invoice_date: invoice.invoice_date,
        due_date: invoice.due_date,
        customer_id: invoice.customer_id,
        currency_code: invoice.currency_code,
        status: invoice.status,
        notes: invoice.notes,
        terms: invoice.terms,
        discount_total: invoice.discount_total,
        footer_text: invoice.footer_text,
      });

      if (invoice.bill_from) {
        this.invoiceForm.get('bill_from')?.patchValue(invoice.bill_from);
      }
      if (invoice.bill_to) {
        this.invoiceForm.get('bill_to')?.patchValue(invoice.bill_to);
      }

      this.items.clear();
      invoice.items?.forEach((item) => {
        const itemGroup = this.newItem();
        itemGroup.patchValue(item);
        this.items.push(itemGroup);
      });

      this.updatePreview(this.invoiceForm.value);
      this.isLoading = false;
    });
  }

  calculateTotals() {
    let subTotal = 0;
    let taxTotal = 0;
    const items = this.items.controls;

    items.forEach((control) => {
      const qty = control.get('quantity')?.value || 0;
      const price = control.get('unit_price')?.value || 0;
      const taxPercent = control.get('tax_percent')?.value || 0;

      const lineTotal = qty * price;
      const taxAmount = lineTotal * (taxPercent / 100);

      const total = lineTotal + taxAmount;

      // Update control values without emitting event loop (emitEvent: false)
      control.patchValue(
        {
          tax_amount: parseFloat(taxAmount.toFixed(2)),
          total: parseFloat(total.toFixed(2)),
        },
        { emitEvent: false }
      );

      subTotal += lineTotal;
      taxTotal += taxAmount;
    });

    const discount = this.invoiceForm.get('discount_total')?.value || 0;
    const grandTotal = subTotal + taxTotal - discount;

    // We store totals in the form? The backend calculates them too, but good for preview.
    // The main form doesn't have total controls, but we update the preview object.

    this.previewData = {
      ...this.previewData,
      sub_total: subTotal,
      tax_total: taxTotal,
      discount_total: discount,
      grand_total: grandTotal,
    };
  }

  updatePreview(val: any) {
    // Sync form values to preview object
    this.previewData = {
      ...this.previewData,
      ...val,
      // items are already handled in calculateTotals implicitly via form array check,
      // but let's sync them for display
      items: (val.items || []).map((item: any) => ({
        ...item,
        total: item.quantity * item.unit_price * (1 + item.tax_percent / 100),
      })),
    };
  }

  onSubmit() {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      return;
    }

    const formValue = this.invoiceForm.getRawValue();
    // Use preview totals or let backend recalc. Backend expects basic data.

    if (this.isEditMode && this.invoiceId) {
      this.invoiceService
        .updateInvoice(this.invoiceId, formValue)
        .subscribe(() => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        });
    } else {
      this.invoiceService.createInvoice(formValue).subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    }
  }
}
