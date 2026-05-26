// import { Component, ViewEncapsulation } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


// @Component({
//   selector: 'app-invoices',
//   standalone: false,
//   templateUrl: './invoices.component.html',
//   styleUrls: ['./invoices.component.css'],
//   encapsulation: ViewEncapsulation.None
// })
// export class InvoicesComponent {
//   invoiceForm: FormGroup;
//   themes = ['classic', 'modern', 'minimal', 'bold', 'elegant'];
//   selectedTheme = 'classic';
//   invoice: any;

//   constructor(private fb: FormBuilder, private invoicesService: InvoicesService) {
//     this.invoiceForm = this.fb.group({
//       clientName: ['', Validators.required],
//       items: this.fb.array([this.createItem()]),
//       theme: ['classic']
//     });
//   }

//   createItem(): FormGroup {
//     return this.fb.group({
//       description: ['', Validators.required],
//       qty: [1, Validators.required],
//       price: [0, Validators.required]
//     });
//   }

//   get items(): FormArray {
//     return this.invoiceForm.get('items') as FormArray;
//   }

//   addItem() {
//     this.items.push(this.createItem());
//   }

//   calculateTotal() {
//     return this.items.controls
//       .map(c => c.value.qty * c.value.price)
//       .reduce((a, b) => a + b, 0);
//   }

//   onThemeChange(theme: string) {
//     this.selectedTheme = theme;
//     this.invoiceForm.patchValue({ theme });
//   }

//   // printInvoice() {

//   // }

//   printInvoice() {


//     window.print();

//   }


//   downloadInvoicePdf() {
//     this.invoicesService.downloadInvoicePdf().subscribe(blob => {
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = "dummy-invoice.pdf";
//       a.click();
//       window.URL.revokeObjectURL(url);
//     });
//   }



// }
