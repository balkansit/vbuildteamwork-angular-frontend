import { Routes } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoiceSettingsComponent } from './components/invoice-settings/invoice-settings.component';

export const InvoiceRoutes: Routes = [
  { path: '', component: InvoiceListComponent },
  { path: 'create', component: InvoiceFormComponent },
  { path: 'edit/:id', component: InvoiceFormComponent },
  { path: 'view/:id', component: InvoiceDetailsComponent },
  { path: 'settings', component: InvoiceSettingsComponent },
];
