/**
 * Common print data interfaces for all billing print formats
 * Author: Balkans IT Solutions Private Limited
 * License: MIT
 */

export interface BrandInfo {
  logo?: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  gstin?: string; // For Indian businesses
  fssai?: string; // For food businesses
  dlNo?: string; // Drug License Number for pharmacies
}

export interface BillInfo {
  billNo: string;
  date: string;
  time?: string;
  cashierName?: string;
  paymentMode: string;
  customerName?: string;
  customerPhone?: string;
  customerGSTIN?: string;
}

export interface PrintItem {
  id?: number;
  name: string;
  qty: number;
  rate: number;
  amount: number;
  discount?: number;
  taxRate?: number;
  taxAmount?: number;
  taxPercent?: number; // Tax percentage for product-wise breakdown
  taxableAmount?: number; // Taxable amount for this item
  hsnCode?: string; // HSN/SAC code for GST
  batchNo?: string;
  expiryDate?: string;
}

export interface TaxInfo {
  enabled: boolean;
  taxType?: 'GST' | 'VAT' | 'NONE'; // GST for India, VAT for others
  cgstPercent?: number;
  cgstAmount?: number;
  sgstPercent?: number;
  sgstAmount?: number;
  igstPercent?: number;
  igstAmount?: number;
  cessPercent?: number;
  cessAmount?: number;
  taxableAmount?: number;
  totalTax?: number;
}

export interface BillSummary {
  subtotal: number;
  discount: number;
  discountPercent?: number;
  taxableAmount: number;
  totalTax: number;
  roundOff?: number;
  grandTotal: number;
  amountPaid?: number;
  balance?: number;
}

export interface PrintSettings {
  showLogo: boolean;
  showBarcodeQR: boolean;
  showFooter: boolean;
  footerText?: string;
  showTermsConditions: boolean;
  termsConditions?: string;
  showBankDetails: boolean;
  bankDetails?: {
    bankName?: string;
    accountNo?: string;
    ifsc?: string;
    upiId?: string;
  };
}

export interface BillingPrintData {
  brandInfo: BrandInfo;
  billInfo: BillInfo;
  items: PrintItem[];
  taxInfo: TaxInfo;
  summary: BillSummary;
  settings: PrintSettings;
}
