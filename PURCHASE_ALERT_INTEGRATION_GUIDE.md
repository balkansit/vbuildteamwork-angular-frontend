# Purchase Pages Alert Integration Guide

## ✅ Completed Integration

### Pages Updated with Alert Components:
1. **purchase-invoices** - ✅ Complete
2. **purchase-orders** - ✅ Complete

## Pattern to Apply to Remaining Purchase Pages

### For the following pages:
- purchase-invoice-return-items
- wanted-book-list
- create-purchase-order
- create-purchase-invoice
- create-purchase-invoice-return
- purchase-invoice-return-items
- wanted-book

### Step 1: Update Component TypeScript File

Add imports:
```typescript
import { AlertData } from '@lib/models/Alert.model';
```

Add properties:
```typescript
// --------------------------------------------------- Alert Configuration --------------------------------------------------- //
alert: AlertData | null = null;
useModalAlert = true; // Set to false to use bootstrap alert instead
```

Add error handling methods:
```typescript
private showErrorAlert(title: string, description: string): void {
  this.alert = {
    showAlert: true,
    status: 'error',
    type: 'danger',
    title: title,
    description: description,
    autoDismissSeconds: 5
  };
}

private showSuccessAlert(title: string, description: string): void {
  this.alert = {
    showAlert: true,
    status: 'success',
    type: 'success',
    title: title,
    description: description,
    autoDismissSeconds: 3
  };
}

private extractErrorMessage(error: any): string {
  if (error?.error?.message) return error.error.message;
  if (error?.message) return error.message;
  if (error?.statusText) return error.statusText;
  return 'An unexpected error occurred. Please try again.';
}
```

Update error handlers in subscribe() calls:
```typescript
(error) => {
  console.error('Error message:', error);
  this.spinner.hide(); // if spinner is used
  this.showErrorAlert('Operation Failed', this.extractErrorMessage(error));
}
```

### Step 2: Update Component HTML Template

Add alert components at the top:
```html
<div class="container-fluid">
  <!-- Modal Alert -->
  <app-modal-alert 
    *ngIf="useModalAlert && alert?.showAlert" 
    [show]="alert?.showAlert ?? false"
    [status]="alert?.status ?? 'info'" 
    [title]="alert?.title ?? ''" 
    [description]="alert?.description ?? ''"
    [autoDismissSeconds]="alert?.autoDismissSeconds"
    (closed)="alert = null">
  </app-modal-alert>

  <!-- Bootstrap Alert -->
  <app-bootstrap-alert 
    *ngIf="!useModalAlert && alert?.showAlert" 
    [message]="alert?.description ?? null"
    [type]="alert?.type ?? 'info'" 
    (close)="alert = null">
  </app-bootstrap-alert>

  <!-- Your existing content -->
</div>
```

## Alert Properties

### AlertData Interface
```typescript
{
  showAlert: boolean;        // Show/hide alert
  status: 'success' | 'error' | 'warning' | 'info';  // For modal alert
  type: 'success' | 'danger' | 'warning' | 'info';   // For bootstrap alert
  title: string;             // Modal alert title
  description: string;       // Alert message
  autoDismissSeconds?: number; // Auto-dismiss time (optional)
}
```

## Alert Types

### Modal Alert (useModalAlert = true)
- **Status values**: 'success', 'error', 'warning', 'info'
- **Auto-dismiss**: 3-5 seconds recommended
- **Use case**: Important operations, confirmations

### Bootstrap Alert (useModalAlert = false)
- **Type values**: 'success', 'danger', 'warning', 'info'
- **Auto-dismiss**: Optional, usually stays until closed
- **Use case**: Lightweight notifications

## Usage Examples

### Error Alert
```typescript
this.showErrorAlert('Load Failed', this.extractErrorMessage(error));
```

### Success Alert
```typescript
this.showSuccessAlert('Success!', 'Item saved successfully.');
```

### Clear Alert
```typescript
this.alert = null;
```

---

**Note**: The two main components (purchase-invoices and purchase-orders) have been fully updated with this pattern as reference implementations.
