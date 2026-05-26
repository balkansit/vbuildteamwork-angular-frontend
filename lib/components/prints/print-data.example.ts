/**
 * Example usage of the new BillingPrintData interface
 * This demonstrates how to construct print data for all print formats
 */

import { BillingPrintData } from './print-data.interface';

// Example: Complete print data for Indian pharmacy/shop
export const samplePrintData: BillingPrintData = {
  brandInfo: {
    logo: 'assets/images/logo.png',
    name: 'Arun Form Pharmacy',
    address: '123, MG Road, Bangalore - 560001, Karnataka, India',
    phone: '+91 9876543210',
    email: 'info@arunform.com',
    website: 'www.arunform.com',
    gstin: '29ABCDE1234F1Z5',
    fssai: '12345678901234',
    dlNo: 'KA-BLR-20/21-12345',
  },

  billInfo: {
    billNo: 'INV-2025-00123',
    date: '21-12-2025',
    time: '02:30 PM',
    cashierName: 'Rajesh Kumar',
    paymentMode: 'UPI',
    customerName: 'Amit Sharma',
    customerPhone: '+91 98765 43210',
    customerGSTIN: '29XYZAB5678G1H2',
  },

  items: [
    {
      id: 1,
      name: 'Paracetamol 500mg - 10 Tablets',
      qty: 2,
      rate: 25.0,
      amount: 50.0,
      discount: 0,
      taxRate: 12,
      taxAmount: 6.0,
      hsnCode: '30049099',
      batchNo: 'PCM2024A123',
      expiryDate: '12/2026',
    },
    {
      id: 2,
      name: 'Crocin Advance - 15 Tablets',
      qty: 1,
      rate: 45.0,
      amount: 45.0,
      taxRate: 12,
      taxAmount: 5.4,
      hsnCode: '30049099',
      batchNo: 'CRC2024B456',
      expiryDate: '03/2027',
    },
    {
      id: 3,
      name: 'Dettol Handwash 200ml',
      qty: 1,
      rate: 80.0,
      amount: 80.0,
      taxRate: 18,
      taxAmount: 14.4,
      hsnCode: '34011190',
      batchNo: 'DET2024C789',
      expiryDate: '06/2026',
    },
  ],

  taxInfo: {
    enabled: true,
    taxType: 'GST',
    cgstPercent: 9,
    cgstAmount: 15.75,
    sgstPercent: 9,
    sgstAmount: 15.75,
    taxableAmount: 175.0,
    totalTax: 31.5,
  },

  summary: {
    subtotal: 175.0,
    discount: 5.0,
    discountPercent: 2.86,
    taxableAmount: 170.0,
    totalTax: 31.5,
    roundOff: 0.5,
    grandTotal: 202.0,
    amountPaid: 202.0,
    balance: 0,
  },

  settings: {
    showLogo: true,
    showBarcodeQR: true,
    showFooter: true,
    footerText: 'Thank you for shopping with us! Stay healthy, stay safe.',
    showTermsConditions: true,
    termsConditions:
      'Goods once sold cannot be returned. Medicines should be consumed as per prescription only.',
    showBankDetails: true,
    bankDetails: {
      bankName: 'HDFC Bank',
      accountNo: '1234567890',
      ifsc: 'HDFC0001234',
      upiId: 'arunform@hdfcbank',
    },
  },
};

// Example: Simple bill without tax (for non-GST businesses)
export const simplePrintData: BillingPrintData = {
  brandInfo: {
    name: 'Local General Store',
    address: 'Shop No. 45, Main Market, Village XYZ',
    phone: '+91 9876543210',
  },

  billInfo: {
    billNo: 'BILL-001',
    date: '21-12-2025',
    paymentMode: 'Cash',
  },

  items: [
    {
      name: 'Rice 1kg',
      qty: 2,
      rate: 50.0,
      amount: 100.0,
    },
    {
      name: 'Sugar 1kg',
      qty: 1,
      rate: 45.0,
      amount: 45.0,
    },
  ],

  taxInfo: {
    enabled: false, // No tax display
  },

  summary: {
    subtotal: 145.0,
    discount: 0,
    taxableAmount: 145.0,
    totalTax: 0,
    grandTotal: 145.0,
  },

  settings: {
    showLogo: false,
    showBarcodeQR: false,
    showFooter: true,
    footerText: 'Thank you! Visit again.',
    showTermsConditions: false,
    showBankDetails: false,
  },
};
