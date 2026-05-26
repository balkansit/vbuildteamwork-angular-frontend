import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  standalone: false,
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() errorMessage = '';
  @Input() name = '';
  @Input() prefixIcon: string = ''; // e.g. "fa-lock"

  showPassword = false;
  value = '';
  disabled = false;
  isFocused = false;

  onFocus() {
    this.isFocused = true;
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  get inputType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleVisibility(): void {
    this.showPassword = !this.showPassword;
    // this.inputType = this.showPassword ? 'text' : 'password';
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
    this.isFocused = false;
  }
}

/*

REACTIVE FORMS USAGE:
--------------------

<app-password-input
  formControlName="password"
  label="Password"
  placeholder="Enter password"
  [prefixIcon]="'fa-lock'"
  [errorMessage]="
    loginForm.get('password')?.touched && loginForm.get('password')?.invalid
      ? 'Password is required'
      : ''
  "
></app-password-input>


NG MODEL USAGE:
--------------------

<app-password-input
  name="password"
  [(ngModel)]="password"
  label="Password"
  placeholder="Enter password"
  [prefixIcon]="'fa-lock'"
  [errorMessage]="
    passwordTouched && !passwordValid
      ? 'Password is required'
      : ''
  "
></app-password-input>


*/
