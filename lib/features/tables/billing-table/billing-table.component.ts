// billing-table.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

// billing-column-config.model.ts
export interface BillingColumnConfig {
  headerIcon?: string;
  hidden?: boolean;
  key: string;
  label: string;
  type?: 'text' | 'number' | 'modal' | 'date' | 'select';
  required?: boolean;
  disabled?: boolean;
  openModalOnClick?: boolean;
  options?: { label: string; value: any }[]; // For dropdowns
  width?: string;
  max?: string; // For number type
  min?: number; // For number type
  modalMap?: { [formFieldKey: string]: string }; // Example: { product: 'product_name', price: 'price' }
}

@Component({
  selector: 'app-billing-table',
  standalone: false,
  templateUrl: './billing-table.component.html',
  styleUrls: ['./billing-table.component.css'],
})
export class BillingTableComponent implements OnInit {
  @Input() columns: BillingColumnConfig[] = [];
  @Input() productList: any[] = [];

  @Input() set rowData(data: any[] | null) {
    if (data && Array.isArray(data)) {
      this.patchRows(data);
    }
  }

  @Output() openModal = new EventEmitter<{
    rowIndex: number;
    colKey: string;
    callback: (result: any) => void;
  }>();
  @Output() valueChange = new EventEmitter<any>();
  @Output() selectReturnItemsClicked = new EventEmitter<void>();
  @Output() increaseQuantity = new EventEmitter<any>();
  @Output() decreaseQuantity = new EventEmitter<any>();
  @Input() showSelectReturnButton: boolean = false;

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      formArray: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.addNewRow();
    this.formGroup.valueChanges.subscribe(() => {
      if (this.formGroup.valid) {
        this.valueChange.emit(this.formGroup);
      }
    });
  }

  /** Trigger valueChange manually */
  public triggerValueChange() {
    console.log('Triggering value change emit');
    this.emitData(); // Already emits this.formGroup to parent
  }

  onIncreaseQuantity(row: any) {
    this.increaseQuantity.emit(row);
  }

  onDecreaseQuantity(row: any) {
    this.decreaseQuantity.emit(row);
  }

  get formArray(): FormArray {
    return this.formGroup.get('formArray') as FormArray;
  }

  get controls() {
    return this.formArray.controls as FormGroup[];
  }

  loadData(data: any[]) {
    this.patchRows(data); // Use your existing patchRows logic
  }

  addNewRow() {
    // Check if formArray has rows
    if (this.formArray.length > 0) {
      const firstRow = this.formArray.at(0);

      // If first row is invalid or all empty, block adding
      if (firstRow.invalid || Object.values(firstRow.value).every((v) => !v)) {
        return; // Prevent adding
      }
    }

    // Create new row
    const group: { [key: string]: any } = {};

    this.columns.forEach((col) => {
      group[col.key] = this.fb.control(
        { value: '', disabled: col.disabled ?? false },
        col.required ? Validators.required : []
      );
    });

    // Insert at the top instead of push
    this.formArray.insert(0, this.fb.group(group));
    this.emitData();

    setTimeout(() => {
      const firstInput = document.querySelector(
        `#field-${this.columns[0].key}-0`
      ) as HTMLElement;
      if (firstInput) firstInput.focus();
    }, 100);
  }

  selectReturnItems() {
    this.selectReturnItemsClicked.emit();
  }

  // private patchRows(data: any[]) {
  //   // Reset
  //   while (this.formArray.length !== 0) {
  //     this.formArray.removeAt(0);
  //   }

  //   // Create new rows from data
  //   for (const item of data) {
  //     const group: { [key: string]: any } = {};
  //     this.columns.forEach((col) => {
  //       group[col.key] = this.fb.control(
  //         { value: item[col.key] ?? '', disabled: col.disabled ?? false },
  //         col.required ? Validators.required : []
  //       );
  //     });
  //     this.formArray.push(this.fb.group(group));
  //   }

  //   this.emitData();
  // }

  private patchRows(data: any[]) {
    // Reset existing
    while (this.formArray.length !== 0) {
      this.formArray.removeAt(0);
    }

    for (const item of data) {
      const group: { [key: string]: any } = {};

      this.columns.forEach((col) => {
        group[col.key] = this.fb.control(
          { value: item[col.key] ?? '', disabled: col.disabled ?? false },
          col.required ? Validators.required : []
        );
      });

      const formGroup = this.fb.group(group);

      // Selected unit
      formGroup.addControl(
        'selected_unit',
        this.fb.control(item['selected_unit'] ?? '')
      );

      // Allowed units options
      const allowed_units: string[] = item['allowed_units'] ?? [];
      formGroup.addControl(
        'allowed_units_options',
        this.fb.control(
          allowed_units.map((unit: string) => ({
            label: unit,
            value: unit,
          }))
        )
      );

      this.formArray.push(formGroup);
    }

    this.emitData();
  }

  removeRow(index: number) {
    this.formArray.removeAt(index);
    this.emitData();
  }

  emitData() {
    this.valueChange.emit(this.formGroup);
  }

  handleCellClick(col: BillingColumnConfig, rowIndex: number) {
    if (!col.openModalOnClick) return;

    this.openModal.emit({
      rowIndex,
      colKey: col.key,
      callback: (modalResult: any) => {
        console.log('Modal Result:', modalResult);
        const allowed_units = modalResult.allowed_units || [];

        const group = this.formArray.at(rowIndex) as FormGroup;

        // Patch other mapped fields
        if (col.modalMap) {
          for (const formKey in col.modalMap) {
            const sourceKey = col.modalMap[formKey];
            group.get(formKey)?.setValue(modalResult[sourceKey]);
          }
        }

        // Patch allowed_units default value
        if (allowed_units.length > 0) {
          // Set default selected unit
          group.get('selected_unit')?.setValue(allowed_units[0]);

          // Store row-specific options in the FormGroup
          group.setControl(
            'allowed_units_options',
            this.fb.control(
              allowed_units.map((unit: string) => ({
                label: unit,
                value: unit,
              }))
            )
          );
        }

        this.emitData();
      },
    });
  }

  resetTable() {
    while (this.formArray.length !== 0) {
      this.formArray.removeAt(0);
    }
    this.emitData();
    this.addNewRow();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    // Only react if the event is in our form
    if (!target.closest('form')) return;

    const activeInput = document.activeElement as HTMLInputElement;

    // if (event.key === 'Enter') {
    //   event.preventDefault();

    //   const allInputs = Array.from(
    //     document.querySelectorAll('input[id^="field-"]:not([disabled])')
    //   ) as HTMLInputElement[];

    //   const currentIndex = allInputs.findIndex((el) => el === activeInput);

    //   if (currentIndex >= 0 && currentIndex < allInputs.length - 1) {
    //     allInputs[currentIndex + 1].focus();
    //   } else if (currentIndex === allInputs.length - 1) {
    //     this.addNewRow();
    //   }
    // }

    if (event.key === 'Enter') {
      event.preventDefault();

      const allInputs = Array.from(
        document.querySelectorAll('input[id^="field-"]:not([disabled])')
      ) as HTMLInputElement[];

      const currentIndex = allInputs.findIndex((el) => el === activeInput);

      // Check if this is the first row
      const idParts = activeInput.id.split('-'); // e.g., field-quantity-0
      const rowIndex = parseInt(idParts[2], 10);
      const colKey = idParts[1];

      // Get editable columns of this row
      const editableColumns = this.columns.filter(
        (col) => !col.hidden && col.type !== 'select' && !col.disabled
      );

      const lastEditableColKey =
        editableColumns[editableColumns.length - 1]?.key;

      if (rowIndex === 0 && colKey === lastEditableColKey) {
        // First row + last editable column → add new row
        this.addNewRow();
      } else if (currentIndex >= 0 && currentIndex < allInputs.length - 1) {
        // Normal behavior: focus next input
        allInputs[currentIndex + 1].focus();
      } else if (currentIndex === allInputs.length - 1) {
        this.addNewRow();
      }
    }

    if (event.key === 'F2' || (event.ctrlKey && event.key === 'n')) {
      event.preventDefault();
      this.addNewRow();
    }
    if (event.key === 'F3') {
      event.preventDefault(); // Avoid browser help
      this.resetTable();
    }

    if (event.key === 'Delete') {
      event.preventDefault();

      const activeInput = document.activeElement as HTMLInputElement;
      const id = activeInput?.id; // example: field-quantity-2

      if (id?.startsWith('field-')) {
        const parts = id.split('-');
        const rowIndex = parseInt(parts[2], 10); // get the 3rd part as row index

        if (!isNaN(rowIndex)) {
          this.removeRow(rowIndex);

          setTimeout(() => {
            const nextRowIndex = Math.max(0, rowIndex - 1);
            const fallbackColKey = this.columns[0]?.key;
            const nextInput = document.querySelector(
              `#field-${fallbackColKey}-${nextRowIndex}`
            ) as HTMLElement;

            nextInput?.focus();
          }, 100);
        }
      }
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();

      const allInputs = Array.from(
        document.querySelectorAll('input[id^="field-"]')
      ) as HTMLInputElement[];

      const activeInput = document.activeElement as HTMLInputElement;
      const currentIndex = allInputs.findIndex((el) => el === activeInput);

      if (currentIndex > 0) {
        allInputs[currentIndex - 1].focus();
      }
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();

      const allInputs = Array.from(
        document.querySelectorAll('input[id^="field-"]')
      ) as HTMLInputElement[];

      const activeInput = document.activeElement as HTMLInputElement;
      const currentIndex = allInputs.findIndex((el) => el === activeInput);

      if (currentIndex < allInputs.length - 1) {
        allInputs[currentIndex + 1].focus();
      }
    }
  }
}
