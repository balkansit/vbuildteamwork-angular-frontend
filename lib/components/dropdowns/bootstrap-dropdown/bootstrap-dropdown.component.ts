import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'bootstrap-dropdown',
  standalone: false,
  templateUrl: './bootstrap-dropdown.component.html',
  styleUrls: ['./bootstrap-dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BootstrapDropdownComponent),
      multi: true,
    },
  ],
})
export class BootstrapDropdownComponent implements ControlValueAccessor {
  @Input() options: { label: string; value: any }[] = [];
  @Input() placeholder = 'Select...';
  @Input() btnClass = '';
  @Input() errorMessage = '';
  @Output() valueChange = new EventEmitter<any>(); // ✅ add this
  value: any;

  // ControlValueAccessor methods
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

isDisabled = false; // track disable state

setDisabledState?(isDisabled: boolean): void {
  this.isDisabled = isDisabled;
}

  handleChange(event: any) {
    const selectedValue = event.target.value;
    this.value = selectedValue;
    this.onChange(selectedValue);
    this.onTouched();
    this.valueChange.emit(selectedValue); // ✅ now triggers
    console.log('Dropdown value changed:', selectedValue);
  }
}

/*
Example usage in a parent component template:

<bootstrap-dropdown
  [options]="dropdownOptions"
  [placeholder]="'Choose an option'"
  [btnClass]="'btn-primary'"
  [errorMessage]="dropdownError"
  [(ngModel)]="selectedValue"
  (valueChange)="onDropdownValueChange($event)">
</bootstrap-dropdown>

In the parent component TypeScript:

dropdownOptions = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 }
];

selectedValue: any;
dropdownError = '';

onDropdownValueChange(value: any) {
  console.log('Dropdown value changed:', value);
}
*/
