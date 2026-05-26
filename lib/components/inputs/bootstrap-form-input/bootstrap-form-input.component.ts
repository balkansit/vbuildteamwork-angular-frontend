import { Component, EventEmitter, forwardRef, Input, Optional, Output, Self } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'bootstrap-form-input',
  standalone: false,
  templateUrl: './bootstrap-form-input.component.html',
  styleUrls: ['./bootstrap-form-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BootstrapFormInputComponent),
      multi: true,
    },
  ],
})
export class BootstrapFormInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: string = 'text';
  @Input() name = '';
  @Input() required = false;
  @Input() customClass = '';
  @Input() prefixIcon = '';
  @Input() suffixIcon = '';
  @Input() min?: number;
  @Input() step?: number | string;
  @Input() errorMessage: string = '';
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<any>();


  value: any = '';
  isFocused = false;

  onFocus() {
    this.isFocused = true;
  }

  writeValue(value: any): void {
    this.value = value ?? '';
  }

  onChange = (_: any) => { };
  onTouched = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // onInput(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   this.value = input.value;
  //   this.onChange(this.value);
  // }

  onInput(event: Event) {
  const input = event.target as HTMLInputElement;

  if (this.type === 'file' && input.files && input.files.length > 0) {
    const file = input.files[0];
    this.value = file;
    this.onChange(file);
    this.valueChange.emit(file);  // EMIT FILE
  } else {
    this.value = input.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value); // EMIT STRING
  }
}


  onBlur() {
    this.onTouched();
    this.isFocused = false;
  }
}

/*Usage in HTML:

  <bootstrap-form-input
    name="email"
    [(ngModel)]="email"
    label="Email"
    placeholder="Enter email"
    type="email"
    required="true"
    prefixIcon="fa-envelope"
  ></bootstrap-form-input>


<bootstrap-form-input
    name="username"
    [(ngModel)]="username"
    label="Username"
    placeholder="Enter username"
    type="text"
    required="true"
    prefixIcon="fa-user"
  ></bootstrap-form-input>


  <bootstrap-form-input
    name="password"
    [(ngModel)]="password"
    label="Password"
    placeholder="Enter password"
    type="password"
    required="true"
    prefixIcon="fa-lock"
  ></bootstrap-form-input>

  */
