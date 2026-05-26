/// --------------------------------------------------- Purchase View Model --------------------------------------------------- //
export interface PurchaseView {
    id: number;
    supplier_invoice_id: number;
    product_id: number;
    batch_number: string;
    qty: number;
    rack_no: string;
    free_qty: number;
    unit: string;
    price_main_unit: number;
    sale_rate: number;
    mrp: number;
    gst: number;
    sgst: number;
    igst: number;
    gst_amount: number;
    sgst_amount: number;
    igst_amount: number;
    total_amount: number;
    discount_percentage: number;
    discount_amount: number;
    total_discount_amount: number;
    manufacturing_date: string;
    expiry_date: string;
    created_at: string;
    updated_at: string;
    product_name: string;
    hsn_code: string;
    category: string;
    brand_name: string;
    strength: string;
    supplier_invoice_number: number;
    supplier_name: string;
    current_stock: number;
}