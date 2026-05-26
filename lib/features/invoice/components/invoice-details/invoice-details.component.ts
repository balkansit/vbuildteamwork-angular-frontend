import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'lib-invoice-details',
  standalone: false,
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent implements OnInit {
  invoice: Invoice | null = null;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadInvoice(+id);
    }
  }

  loadInvoice(id: number) {
    this.isLoading = true;
    this.invoiceService.getInvoice(id).subscribe({
      next: (inv) => {
        this.invoice = inv;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  print() {
    if (this.invoice?.id) {
      this.invoiceService.printInvoice(this.invoice.id);
    }
  }

  download() {
    if (this.invoice?.id) {
      this.invoiceService.downloadPdf(this.invoice.id);
    }
  }

  edit() {
    if (this.invoice?.id) {
      this.router.navigate(['../../edit', this.invoice.id], {
        relativeTo: this.route,
      });
    }
  }

  onBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
