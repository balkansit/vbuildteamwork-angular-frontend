import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice, InvoiceSetting } from '../models/invoice.model';

export const INVOICE_API_URL = new InjectionToken<string>('INVOICE_API_URL');

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  // Base API URL should be injected or tokenized. For now assuming global environment or passed config.
  // We'll use a relative path /api/invoices assuming proxy or interceptor handles the base.
  private settingsUrl = '/bits-invoice-settings';
  private invoicesUrl = '/bits-invoices';

  constructor(
    private http: HttpClient,
    @Inject(INVOICE_API_URL) private readonly apiBaseUrl: string
  ) {}

  getInvoices(filters: any = {}): Observable<Invoice[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params = params.append(key, filters[key]);
      }
    });
    return this.http.get<Invoice[]>(this.apiBaseUrl + this.invoicesUrl, {
      params,
    });
  }

  getInvoice(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(
      `${this.apiBaseUrl}/${this.invoicesUrl}/${id}`
    );
  }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.apiBaseUrl + this.invoicesUrl, invoice);
  }

  updateInvoice(id: number, invoice: Partial<Invoice>): Observable<Invoice> {
    return this.http.put<Invoice>(
      `${this.apiBaseUrl}/${this.invoicesUrl}/${id}`,
      invoice
    );
  }

  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiBaseUrl}/${this.invoicesUrl}/${id}`
    );
  }

  getSettings(): Observable<InvoiceSetting> {
    return this.http.get<InvoiceSetting>(this.apiBaseUrl + this.settingsUrl);
  }

  updateSettings(
    settings: Partial<InvoiceSetting>
  ): Observable<InvoiceSetting> {
    return this.http.post<InvoiceSetting>(
      this.apiBaseUrl + this.settingsUrl,
      settings
    );
  }

  downloadPdf(id: number) {
    // Navigate directly or use window.open
    window.open(
      `${this.apiBaseUrl}/${this.invoicesUrl}/${id}/download`,
      '_blank'
    );
  }

  printInvoice(id: number) {
    window.open(`${this.apiBaseUrl}/${this.invoicesUrl}/${id}/print`, '_blank');
  }
}
