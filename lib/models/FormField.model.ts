export interface FormField<T = any> {
  title?: string; // NEW: Section title
  name: Extract<keyof T, string>; // only string keys allowed
  role_id?: Extract<keyof T, string>; // only string keys allowed
  label: string;
  type?: any; // 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio'
  placeholder?: string;
  disabled?: boolean;
  minlength?: number;
  maxlength?: number;
  hidden?: boolean;
  required?: boolean;
  options?: { label: string; value: any }[];
  prefixIcon?: string;
  suffixIcon?: string;
  css?: any;
  defaultValue?: any;
  rows?: number;
  value?: any;
  accept?: string; // NEW: Accepted file types for file inputs
  imageUrl?: string; // NEW: Image URL property
  colSize?: number; // NEW: Bootstrap column size (1-12)
  min?: number;
  step?: number | string;
  openModalOnClick?: boolean;
  // readonly?: boolean;
  // ✅ NEW: Conditional display based on another field
  showWhen?: {
    field: string; // form field name to watch
    value: any; // value that triggers display
  };
  lookupValueProp?: string;
  modalMap?: { [formFieldKey: string]: string }; // Example: { product: 'product_name', price: 'price' }
  validators?: any[]; // Angular validators
  transform?: (value: any, formValues?: any) => any; // optional preprocessing
  previewUrl?: string;
  onChange?: (value: any, formValues?: any) => void; // onChange handler
}
