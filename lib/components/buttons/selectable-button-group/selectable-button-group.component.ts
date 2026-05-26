import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selectable-button-group',
  templateUrl: './selectable-button-group.component.html',

  styleUrls: ['./selectable-button-group.component.css'],
  standalone: false,
})
export class SelectableButtonGroupComponent {
  @Input() options: string[] = [];
  @Input() selected: string | null = null;

  @Output() selectedChange = new EventEmitter<string>();

  select(option: string) {
    if (option !== this.selected) {
      this.selected = option;
      this.selectedChange.emit(option);
    }
  }
}

// Example usage in a parent component template:

// <app-selectable-button-group
//   [options]="['Small', 'Medium', 'Large']"
//   [selected]="selectedSize"
//   (selectedChange)="onSizeChange($event)">
// </app-selectable-button-group>
