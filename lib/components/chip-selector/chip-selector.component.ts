import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chip-selector',
  templateUrl: './chip-selector.component.html',
  styleUrls: ['./chip-selector.component.css'],
  standalone: false,
})
export class ChipSelectorComponent implements OnInit {
  // 🔹 Inputs
  @Input() dropdownOptions: { id: number; name: string }[] = []; // table list
  @Input() dropdownOptions2: { id: number; name: string }[] = []; // column list
  @Input() placeholder: string = 'Enter value';
  @Input() buttonLabel: string = 'Submit';
  @Input() prefillData: { table_id: number; column_id: number; value: string }[] = [];

  // 🔹 NEW: Reset trigger input
  @Input() resetTrigger: boolean = false;

  // 🔹 Outputs
  @Output() dropdown1Selected = new EventEmitter<number>(); // table id emit
  @Output() formSubmit = new EventEmitter<{ table_id: number; column_id: number; value: string }[]>();

  // 🔹 Internal state
  selectedTable: { id: number; name: string } | null = null;
  selectedColumn: { id: number; name: string } | null = null;
  newValue: string = '';
  selectedData: { table_id: number; column_id: number; value: string }[] = [];

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    // 🔸 Handle reset trigger
    if (changes['resetTrigger'] && !changes['resetTrigger'].firstChange) {
      this.clearChips();
    }

    // 🔸 Handle prefill when dropdowns or data are ready
    if (changes['prefillData'] || changes['dropdownOptions'] || changes['dropdownOptions2']) {
      this.tryApplyPrefill();
    }
  }

  /** 🟩 Prefill logic — auto-select table, column, and chips */
  tryApplyPrefill() {
    if (!this.prefillData?.length || !this.dropdownOptions?.length || !this.dropdownOptions2?.length) {
      return; // Wait until dropdowns and prefill data are available
    }

    const first = this.prefillData[0];

    this.selectedData = [...this.prefillData];
    this.selectedTable = this.dropdownOptions.find(t => t.id === first.table_id) || null;
    this.selectedColumn = this.dropdownOptions2.find(c => c.id === first.column_id) || null;

    console.log('✅ Prefill applied:', this.selectedTable, this.selectedColumn, this.selectedData);
  }

  /** 🟩 When table changes — reset columns and values */
  onTableChange() {
    if (this.selectedTable) {
      this.dropdown1Selected.emit(this.selectedTable.id);
      this.selectedData = []; // Clear previous chips
      this.selectedColumn = null;
      this.newValue = '';
    }
  }

  /** 🟦 When column changes — reset value field */
  onColumnChange() {
    this.newValue = '';
  }

  /** ➕ Add new chip */
  addChip() {
    if (!this.selectedTable || !this.selectedColumn || !this.newValue.trim()) return;

    const entry = {
      table_id: this.selectedTable.id,
      column_id: this.selectedColumn.id,
      value: this.newValue.trim(),
    };

    // Avoid duplicates
    const exists = this.selectedData.find(
      (d) =>
        d.table_id === entry.table_id &&
        d.column_id === entry.column_id &&
        d.value.toLowerCase() === entry.value.toLowerCase()
    );

    if (!exists) {
      this.selectedData.push(entry);
    }

    this.newValue = ''; // reset input after adding
  }

  /** ❌ Remove one chip */
  removeChip(item: { table_id: number; column_id: number; value: string }) {
    this.selectedData = this.selectedData.filter(
      (d) =>
        !(
          d.table_id === item.table_id &&
          d.column_id === item.column_id &&
          d.value === item.value
        )
    );
  }

  /** 🚀 Submit form data */
  submitForm() {
    this.formSubmit.emit(this.selectedData);
  }

  /** 🧹 Clear all chips (called when parent triggers reset) */
  clearChips() {
    this.selectedData = [];
    this.selectedTable = null;
    this.selectedColumn = null;
    this.newValue = '';
  }
}
