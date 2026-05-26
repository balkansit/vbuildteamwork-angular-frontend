import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface AuthFormField {
  name: string;
  label: string;
  placeholder?: string;
  type: string; // text, email, password, phone, number, etc.
  required?: boolean;
  validators?: any[];
  value?: any;
  prefixIcon?: string; // optional fontawesome icon class for prefix
  suffixIcon?: string; // optional fontawesome icon class for suffix
}

@Component({
  selector: 'auth-form',
  standalone: false,
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent implements OnInit {
  @Input() fields: AuthFormField[] = [];
  @Input() buttonLabel = 'Submit';
  @Input() isLoading = false;
  @Input() imageSrc: string = 'assets/images/logo.png';
  @Input() hideForgotPassword = true;
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const controlsConfig: { [key: string]: any } = {};
    this.fields.forEach((field) => {
      const validators = field.required
        ? [Validators.required, ...(field.validators ?? [])]
        : field.validators ?? [];
      controlsConfig[field.name] = [field.value || '', validators];
    });
    this.form = this.fb.group(controlsConfig);
  }

  submit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
