///------------------------------------------------
/// MONTHLY SALES PURCHASES INTERFACE
///------------------------------------------------
export interface MonthlySalesPurchases {
  label: string; // e.g. 'Jan', 'Feb', ...
  sales: number; // month sales total
  purchases: number; // month purchases total
}
///------------------------------------------------
/// OVERVIEW INTERFACE
///------------------------------------------------
export interface Overview {
  total_purchases_invoices: number;
  total_purchases_monthly: number;
  total_sales_invoices: number;
  total_sales_monthly: number;
  total_customers: number;
  total_doctors: number;
  total_products: number;
  total_suppliers: number;
  total_sales_items: number;
  total_purchase_invoice_items: number;
  total_purchase_orders: number;
  total_purchase_order_items: number;
  total_purchase_returns: number;
  total_purchase_return_items: number;
  total_users: number;
  total_stock_batches: number;
  total_sales: number;
  total_purchases: number;
  total_expenses?: number;
  expired_stock_batches: ExpiredStockBatch[];
  monthly_sales_purchases: MonthlySalesPurchases[];

  // billing status
  total_paid?: number;
  total_unpaid?: number;
  total_overdue?: number;
  total_partially_paid?: number;
}

///------------------------------------------------
/// EXPIRED STOCK BATCH INTERFACE
///------------------------------------------------
export interface ExpiredStockBatch {
  id: number;
  product_id: number;
  tenant_id: number;
  batch_no: string;
  expiry_date: string;
  quantity: number;
  purchase_price: string;
  mrp: string;
  created_at: string;
  updated_at: string;
  product_name: string;
  gst: string;
  category: string;
  brand_name: string;
  hsn_code: string;
  price: number;
  manufactured_date?: string;
}
