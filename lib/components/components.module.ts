import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { HasRoleDirective } from '@lib/core/auth/has-role.directive';
import { NgChartsModule } from 'ng2-charts';

// ✅ All your components
import { PasswordInputComponent } from './inputs/password-input/password-input.component';
import { CartAddressCardComponent } from './carts/cart-address-card/cart-address-card.component';
import { AddressCardComponent } from './cards/address-card/address-card.component';
import { PaymentMethodComponent } from './payments/payment-method/payment-method.component';
import { IncrementButtonComponent } from './buttons/increment-button/increment-button.component';
import { RatingsComponent } from './ratings/ratings.component';
import { TagBadgeComponent } from './badges/tag-badge/tag-badge.component';
import { ProductCardComponent } from './cards/product-card/product-card.component';
import { PaginationComponent } from './paginations/pagination/pagination.component';
import { CartItemCardComponent } from './carts/cart-item-card/cart-item-card.component';
import { SelectableButtonGroupComponent } from './buttons/selectable-button-group/selectable-button-group.component';
import { ButtonComponent } from './buttons/button/button.component';
import { IconComponent } from './icons/icon/icon.component';
import { BootstrapButtonComponent } from './buttons/bootstrap-button/bootstrap-button.component';
import { IconInputComponent } from './inputs/icon-input/icon-input.component';
import { BootstrapAutocompleteComponent } from './autocomplete/bootstrap-autocomplete/bootstrap-autocomplete.component';
import { BootstrapFormInputComponent } from './inputs/bootstrap-form-input/bootstrap-form-input.component';
import { BootstrapAlertComponent } from './alerts/bootstrap-alert/bootstrap-alert.component';
import { ModalAlertComponent } from './alerts/modal-alert/modal-alert.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { BootstrapDropdownComponent } from './dropdowns/bootstrap-dropdown/bootstrap-dropdown.component';
import { BootstrapTextareaComponent } from './inputs/bootstrap-textarea/bootstrap-textarea.component';
import { BootstrapDateInputComponent } from './inputs/bootstrap-date-input/bootstrap-date-input.component';
import { LoadingSpinnerModalComponent } from './loadings/loading-spinner-modal/loading-spinner-modal.component';
import { MaterialTableComponent } from './tables/material-table/material-table.component';
import { BootstrapTableComponent } from './tables/bootstrap-table/bootstrap-table.component';
import { PieChartOneComponent } from './charts/pie-charts/pie-chart-one/pie-chart-one.component';
import { BarChartBitsOneComponent } from './charts/bar-charts/bar-chart-bits-one/bar-chart-bits-one.component';
import { LineChartOneComponent } from './charts/line-charts/line-chart-one/line-chart-one.component';
import { BillingThermalPrintComponent } from './prints/billing-thermal-print/billing-thermal-print.component';
import { BillingA4PrintComponent } from './prints/billing-a4-print/billing-a4-print.component';
import { BillingA5PrintComponent } from './prints/billing-a5-print/billing-a5-print.component';
import { ManualPaymentProcessingBitsComponent } from './modals/manual-payment-processing-bits/manual-payment-processing-bits.component';
import { DownloadCsvModalComponent } from './modals/download-csv-modal/download-csv-modal.component';
import { ChipSelectorComponent } from './chip-selector/chip-selector.component';
import { ToggleButtonComponent } from './buttons/toggle-button/toggle-button.component';
import { BannerWithFilterComponent } from './banner-with-filter/banner-with-filter/banner-with-filter.component';
import { StandardConfirmDialogComponent } from './modals/standard-confirm-dialog/standard-confirm-dialog.component';
import { GlobalSearchComponent } from './inputs/global-search/global-search.component';

import { BaseTableComponent } from './tables/base-table/base-table.component';
import { GenericCrudFormComponent } from './forms/generic-crud-form/generic-crud-form.component';
import { TableHeaderComponent } from './tables/table-header/table-header.component';
import { FormHeaderComponent } from './forms/form-header/form-header.component';
import { DataViewComponent } from './views/data-view/data-view.component';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DynamicFormWrapperDialogComponent } from '@lib/layouts/wrappers/dynamic-form-wrapper-dialog/dynamic-form-wrapper-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule, // ✅ Needed for dropdown
    MatFormFieldModule, // ✅ Needed for form field styling
    MatButtonModule, // ✅ Needed for buttons
    NgChartsModule,
    HasRoleDirective,
    MatMenuModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  declarations: [
    BaseTableComponent,
    GenericCrudFormComponent,
    TableHeaderComponent, // Added
    FormHeaderComponent, // Added
    DataViewComponent, // Added
    DynamicFormComponent, // Added
    DynamicFormWrapperDialogComponent,
    PasswordInputComponent,
    CartAddressCardComponent,
    AddressCardComponent,
    PaymentMethodComponent,
    IncrementButtonComponent,
    RatingsComponent,
    ProductCardComponent,
    TagBadgeComponent,
    PaginationComponent,
    CartItemCardComponent,
    SelectableButtonGroupComponent,
    ButtonComponent,
    IconComponent,
    BootstrapButtonComponent,
    IconInputComponent,
    BootstrapAutocompleteComponent,
    BootstrapFormInputComponent,
    BootstrapAlertComponent,
    ModalAlertComponent,
    ConfirmModalComponent,
    BootstrapDropdownComponent,
    BootstrapTextareaComponent,
    BootstrapDateInputComponent,
    LoadingSpinnerModalComponent,
    MaterialTableComponent,
    BootstrapTableComponent,
    PieChartOneComponent,
    BarChartBitsOneComponent,
    LineChartOneComponent,
    BillingThermalPrintComponent,
    BillingA4PrintComponent,
    BillingA5PrintComponent,
    ManualPaymentProcessingBitsComponent,
    DownloadCsvModalComponent,
    ChipSelectorComponent,
    ToggleButtonComponent,
    BannerWithFilterComponent,
    GlobalSearchComponent,
    StandardConfirmDialogComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    NgChartsModule,
    HasRoleDirective,
    MatMenuModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTooltipModule,
    BaseTableComponent,
    GenericCrudFormComponent,
    TableHeaderComponent, // Added
    FormHeaderComponent, // Added
    DataViewComponent, // Added
    DynamicFormComponent, // Added
    DynamicFormWrapperDialogComponent,
    PasswordInputComponent,
    CartAddressCardComponent,
    AddressCardComponent,
    PaymentMethodComponent,
    IncrementButtonComponent,
    RatingsComponent,
    TagBadgeComponent,
    ProductCardComponent,
    PaginationComponent,
    CartItemCardComponent,
    SelectableButtonGroupComponent,
    ButtonComponent,
    IconComponent,
    BootstrapButtonComponent,
    IconInputComponent,
    BootstrapAutocompleteComponent,
    BootstrapFormInputComponent,
    BootstrapAlertComponent,
    ModalAlertComponent,
    ConfirmModalComponent,
    BootstrapDropdownComponent,
    BootstrapTextareaComponent,
    BootstrapDateInputComponent,
    LoadingSpinnerModalComponent,
    MaterialTableComponent,
    BootstrapTableComponent,
    PieChartOneComponent,
    BarChartBitsOneComponent,
    LineChartOneComponent,
    BillingThermalPrintComponent,
    BillingA4PrintComponent,
    BillingA5PrintComponent,
    ManualPaymentProcessingBitsComponent,
    ChipSelectorComponent,
    ToggleButtonComponent,
    BannerWithFilterComponent,
    GlobalSearchComponent,
    StandardConfirmDialogComponent,
  ],
})
export class ComponentsModule {}
