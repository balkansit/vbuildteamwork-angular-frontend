import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@lib/components/components.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from '@lib/models/FormField.model';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ComponentsModule],
  styleUrls: ['./dynamic-form.component.css'],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit {
  private _fields: FormField[] = [];

  // @Input() fields: FormField[] = [];
  @Input() set fields(value: FormField[]) {
    this._fields = value;
    if (this.form) {
      this.buildForm(); // update form whenever fields input changes
    }
  }

  @Input() buttonLabel = 'Submit';
  @Input() isLoading = false;
  @Input() buttonAlignment: 'left' | 'right' | 'center' | 'full' = 'right';
  @Input() showCancel: boolean = false;
  @Input() cancelLabel: string = 'Cancel';
  @Input() resetTrigger?: boolean = false;
  @Input() hideButtons = false; // <-- NEW: hide all buttons
  @Input() emitLiveForm = false; // <-- NEW: emit form on changes
  @Output() formReady = new EventEmitter<FormGroup>(); // <-- NEW: emit form
  @Input() openModalOnClick: boolean = false; // NEW: for lookup fields
  @Input() resetOnSubmit: boolean = false; // NEW: reset form on submit
  @Input() rawValueOnSubmit: boolean = true; // NEW: emit raw value on submit

  @Output() openModal = new EventEmitter<{
    rowIndex: number;
    colKey: string;
    callback: (result: any) => void;
  }>();

  @Output() submitted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() imageRemoved = new EventEmitter<string>();

  files: { [key: string]: File } = {};
  filePreview: { [key: string]: string } = {};

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('DynamicFormComponent initialized with fields:', this.fields);
    this.buildForm();
    if (this.emitLiveForm) {
      this.formReady.emit(this.form);
      this.form.valueChanges.subscribe(() => {
        this.formReady.emit(this.form);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fields'] && this.fields) {
      console.log('Fields input changed:', this.fields);
      this.buildForm();
    }

    if (changes['resetTrigger'] && changes['resetTrigger'].currentValue) {
      this.reset();
    }
  }

  get fields(): FormField[] {
    return this._fields;
  }

  emitData() {
    this.formReady.emit(this.form);
  }

  buildForm() {
    const group: any = {};
    this.fields.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      if (field.min !== undefined) {
        validators.push(Validators.min(field.min));
      }
      group[field.name] = this.fb.control(
        {
          value: field.value ?? null,
          disabled: field.disabled ?? false,
        },
        validators
      );
    });

    console.log('Building form withds:', group);
    this.form = this.fb.group(group);

    // emit latest form after rebuilding
    this.formReady.emit(this.form);

    // Subscribe to specific field changes if onChange is defined
    this.fields.forEach((field) => {
      if (field.onChange) {
        this.form.get(field.name)?.valueChanges.subscribe((val) => {
          field.onChange!(val, this.form);
        });
      }
    });

    if (this.emitLiveForm) {
      this.form.valueChanges.subscribe(() => this.formReady.emit(this.form));
    }
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    // get form value (include disabled fields if rawValueOnSubmit is true)
    let formData = this.rawValueOnSubmit
      ? this.form.getRawValue()
      : this.form.value;

    // Apply transform functions per field (if any)
    this.fields.forEach((field) => {
      if (field.transform && field.name in formData) {
        formData[field.name] = field.transform(formData[field.name], formData);
      }

      // 🔥 Remove file/image fields from formData if they are not File objects
      // This prevents sending string URLs for unchanged images during edit
      if (
        (field.type === 'file' || field.type === 'image') &&
        field.name in formData
      ) {
        const value = formData[field.name];
        if (!(value instanceof File)) {
          delete formData[field.name];
        }
      }
    });

    console.log('Form submitted with data:', formData);

    // emit final processed form data
    this.submitted.emit({
      ...formData,
      __files: this.files, // pass files too
    });
  }

  onKeyDown(event: KeyboardEvent, field: FormField) {
    console.log('Key pressed:', event.key, 'on field:', field.name);
    if (event.key === 'Enter') {
      event.preventDefault(); // prevent form submit or other default
      this.handleCellClick(field, 0);
    }
  }

  reset() {
    this.form.reset();
    this.buildForm(); // Rebuild the form to reset validators and values
  }

  handleCellClick(col: any, rowIndex: number) {
    if (col.type !== 'lookup' && !col.openModalOnClick) return;

    this.openModal.emit({
      rowIndex,
      colKey: col.name,
      callback: (modalResult: any) => {
        if (col.modalMap) {
          for (const formKey in col.modalMap) {
            const sourceKey = col.modalMap[formKey];
            this.form.get(formKey)?.setValue(modalResult[sourceKey]);
          }
        } else {
          this.form.get(col.name)?.setValue(modalResult);
        }
        this.formReady.emit(this.form);
      },
    });
  }

  onFileSelect(event: Event, fieldName: string) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.files[fieldName] = file;

    // Update form control value
    this.form.get(fieldName)?.setValue(file);

    // preview
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview[fieldName] = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage(fieldName: string) {
    // Remove preview
    this.filePreview[fieldName] = '';

    // Remove stored file
    delete this.files[fieldName];

    // Remove default preview URL (if coming from backend)
    const field = this.fields.find((f) => f.name === fieldName);
    if (field) {
      field.previewUrl = '';
    }

    // Reset the form control value
    this.form.get(fieldName)?.setValue(null);

    this.imageRemoved.emit(fieldName);

    console.log('Image removed:', fieldName);
  }
}

/*

<app-dynamic-form
  [fields]="userFormFields"
  [buttonLabel]="'Save'"
  [isLoading]="isSubmitting"
  (submitted)="onFormSubmit($event)">
</app-dynamic-form>


userFormFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'text', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true },
  { name: 'role', label: 'Role', type: 'dropdown', required: true, options: [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' }
  ]},
  { name: 'dob', label: 'Date of Birth', type: 'date' },
  { name: 'bio', label: 'Bio', type: 'textarea', rows: 4 }
];

onFormSubmit(data: any) {
  console.log('Form submitted:', data);
  // handle submission
}

*/
