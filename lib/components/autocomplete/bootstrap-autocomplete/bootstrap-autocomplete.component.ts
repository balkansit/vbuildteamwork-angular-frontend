import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

interface NormalizedOption {
  id: any;
  name: string;
  original: any;
}

@Component({
  selector: 'app-bootstrap-autocomplete',
  standalone: false,
  templateUrl: './bootstrap-autocomplete.component.html',
  styleUrls: ['./bootstrap-autocomplete.component.css'],
})
export class BootstrapAutocompleteComponent implements OnInit {
  @Input() options: any[] = []; // allow string[] or object[]
  @Input() placeholder = 'Select option';
  @Input() nameKey: string = 'name';
  @Input() idKey: string = 'id';

  @Output() selected = new EventEmitter<{
    id: any;
    name: string;
    original?: any;
  }>();

  query: string = '';
  filteredOptions: NormalizedOption[] = [];
  dropdownOpen = false;

  private isStringArray = true;

  ngOnInit() {
    this.detectOptionType();
    this.filteredOptions = this.getNormalizedOptions();
    console.log('Filtered Options:', this.filteredOptions);
    console.log('Purchase Orders:', this.options);
  }

  detectOptionType() {
    this.isStringArray = typeof this.options[0] === 'string';
  }

  /**
   * Normalize options to a consistent format for the autocomplete.
   * If options are strings, they will be converted to objects with id and name.
   * If options are objects, they will be mapped based on idKey and nameKey.
   */
  getNormalizedOptions(): NormalizedOption[] {
    if (this.isStringArray) {
      return (this.options as string[]).map((val, idx) => ({
        id: idx,
        name: val,
        original: val,
      }));
    }

    return (this.options as any[])
      .map((opt) => ({
        id: opt[this.idKey],
        name: opt[this.nameKey] ?? '',
        original: opt,
      }))
      .filter((opt) => opt.id !== undefined && opt.name);
  }

  onInputChange() {
    const normalized = this.getNormalizedOptions();
    this.filteredOptions = normalized.filter((opt) =>
      opt.name.toLowerCase().includes(this.query.toLowerCase())
    );
    this.dropdownOpen = true;
  }

  onInputFocus() {
    this.dropdownOpen = true;
    this.onInputChange();
  }

  onInputBlur() {
    this.dropdownOpen = false;
  }

  selectOption(option: any) {
    this.query = option.name;
    console.log('Selected option:', option);
    console.log('Original option:', this.query);
    this.dropdownOpen = false;
    this.selected.emit({
      id: option.id,
      name: option.name,
      original: option.original,
    });
  }

  clear() {
    this.query = '';
    this.filteredOptions = this.getNormalizedOptions();
  }
}

/*

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  fruits = ['Apple', 'Banana', 'Mango'];

  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Editor' }
  ];

  countries = [
    { id: 'de', label: 'Germany' },
    { id: 'us', label: 'United States' }
  ];

  items = [
    { id: 1, name: 'Item A' },
    { id: 2, label: 'Item B' },
    { id: 3, name: 'Item C', label: 'Label C' }
  ];

  onFruitSelected(option: any) {
    console.log('Fruit selected:', option);
  }

  onRoleSelected(option: any) {
    console.log('Role selected:', option);
  }

  onCountrySelected(option: any) {
    console.log('Country selected:', option);
  }

  onItemSelected(option: any) {
    console.log('Item selected:', option);
  }
}


<div class="container py-4">

  <h4>Autocomplete with string[]</h4>
  <app-bootstrap-autocomplete
    [options]="fruits"
    placeholder="Select fruit"
    (selected)="onFruitSelected($event)">
  </app-bootstrap-autocomplete>

  <hr>

  <h4>Autocomplete with object[] (name)</h4>
  <app-bootstrap-autocomplete
    [options]="roles"
    placeholder="Select role"
    (selected)="onRoleSelected($event)">
  </app-bootstrap-autocomplete>

  <hr>

  <h4>Autocomplete with object[] (label)</h4>
  <app-bootstrap-autocomplete
    [options]="countries"
    placeholder="Select country"
    (selected)="onCountrySelected($event)">
  </app-bootstrap-autocomplete>

  <hr>

  <h4>Autocomplete with mixed name/label</h4>
  <app-bootstrap-autocomplete
    [options]="items"
    placeholder="Search items"
    (selected)="onItemSelected($event)">
  </app-bootstrap-autocomplete>

</div>

*/
