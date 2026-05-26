import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'bootstrap-date-input',
  standalone: false,
  styleUrls: ['./bootstrap-date-input.component.css'],
  templateUrl: './bootstrap-date-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BootstrapDateInputComponent),
      multi: true,
    },
  ],
})
export class BootstrapDateInputComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() label = '';
  @Input() errorMessage = '';

  disabled = false; // <-- keep track of disabled state

  value: string | null = null;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
