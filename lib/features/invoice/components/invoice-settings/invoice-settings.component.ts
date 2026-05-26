import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-invoice-settings',
  standalone: false,
  templateUrl: './invoice-settings.component.html',
  styleUrls: ['./invoice-settings.component.css'],
})
export class InvoiceSettingsComponent implements OnInit {
  settingsForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  private initialFormValue: any;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSettings();
  }

  initForm() {
    this.settingsForm = this.fb.group({
      company_name: ['', Validators.required],
      address: [''],
      phone: [''],
      email: ['', Validators.email],
      tax_number: [''],
      currency_code: ['USD', Validators.required],
      tax_enabled: [false],
      default_tax_percent: [0],
      invoice_prefix: ['INV-', Validators.required],
      default_footer_text: [''],
    });
  }

  loadSettings() {
    this.isLoading = true;
    this.invoiceService.getSettings().subscribe({
      next: (settings) => {
        if (settings) {
          this.settingsForm.patchValue(settings);
          this.initialFormValue = this.settingsForm.value;
        }
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  onSubmit() {
    if (this.settingsForm.invalid) return;

    this.isLoading = true;
    this.invoiceService.updateSettings(this.settingsForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Settings saved successfully!';
        this.initialFormValue = this.settingsForm.value;
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: () => (this.isLoading = false),
    });
  }

  onReset() {
    if (this.initialFormValue) {
      this.settingsForm.patchValue(this.initialFormValue);
    }
  }

  onBack() {
    this.router.navigate(['..'], { relativeTo: this.router.routerState.root });
  }
}
