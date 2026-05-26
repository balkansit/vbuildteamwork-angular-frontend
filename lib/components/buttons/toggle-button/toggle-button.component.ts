import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ToggleOption {
  label: string;
  value: any;
  icon?: string; // Optional FontAwesome icon class
}

@Component({
  selector: 'app-toggle-button',
  standalone: false,
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css'],
})
export class ToggleButtonComponent {
  @Input() options: ToggleOption[] = [];
  @Input() active: any;
  @Output() activeChange = new EventEmitter<any>();

  select(option: ToggleOption) {
    this.active = option.value;
    this.activeChange.emit(option.value);
  }
}
