import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-icon-input',
  standalone: false,
  templateUrl: './icon-input.component.html',
  styleUrls: ['./icon-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IconInputComponent),
      multi: true,
    },
  ],
})
export class IconInputComponent implements ControlValueAccessor {
  @Input() icon: string = 'fas fa-user';
  @Input() placeholder: string = '';
  @Input() customClass: string = '';
  @Input() type: string = 'text';
  @Input() id?: string;
  @Input() name?: string;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  value: string = '';

  // ControlValueAccessor methods
  onChange = (_: any) => {};
  onTouched = () => {};
  input: any;

  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: any): void {
    const val = event.target.value;
    this.value = val;
    this.onChange(val);
    this.valueChange.emit(val);
  }
}

// /**
//  * Example usage:
//  * <app-icon-input
//  *   [icon]="'fas fa-envelope'"
//  *   [placeholder]="'Enter your email'"
//  *   [type]="'email'"
//  *   [id]="'email-input'"
//  *   [name]="'email'"
//  *   [disabled]="false"
//  *   [readonly]="false"
//  *   (valueChange)="onEmailChange($event)">
//  * </app-icon-input>
//  */
