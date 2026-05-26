export interface InvoiceItem {
  id?: number;
  item_name: string;
  description?: string;
  quantity: number;
  unit_price: number;
  tax_percent: number;
  tax_amount: number;
  total: number;
}

export interface Invoice {
  id?: number;
  invoice_type: 'invoice' | 'quotation';
  invoice_no: string;
  reference_no?: string;
  invoice_date: string; // ISO date
  due_date?: string;
  customer_id?: number | null;
  customer_name?: string; // Optional if joined
  customer_details?: any; // Snapshot
  bill_from?: any; // Snapshot
  bill_to?: any; // Snapshot
  currency_code: string;
  sub_total: number;
  tax_total: number;
  discount_total: number;
  grand_total: number;
  status: 'draft' | 'sent' | 'paid' | 'cancelled';
  notes?: string;
  terms?: string;
  footer_text?: string;
  items?: InvoiceItem[];
  created_at?: string;
  updated_at?: string;
}

export interface InvoiceSetting {
  id?: number;
  tenant_id: number;
  company_name: string;
  company_logo?: string;
  address?: string;
  phone?: string;
  email?: string;
  tax_number?: string;
  currency_code: string;
  tax_enabled: boolean;
  default_tax_percent?: number;
  invoice_prefix?: string;
  default_footer_text?: string;
}
