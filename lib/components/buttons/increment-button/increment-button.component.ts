import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-increment-button',
  standalone: false,
  templateUrl: './increment-button.component.html',
  styleUrls: ['./increment-button.component.css'],
})
export class IncrementButtonComponent {
  @Input() value: number = 1;
  @Input() min: number = 1;
  @Input() max: number = 99;
  @Input() step: number = 1;

  @Output() valueChange = new EventEmitter<number>();

  increment() {
    if (this.value + this.step <= this.max) {
      this.value += this.step;
      this.valueChange.emit(this.value);
    }
  }

  decrement() {
    if (this.value - this.step >= this.min) {
      this.value -= this.step;
      this.valueChange.emit(this.value);
    }
  }
}

// Example usage in a parent component:
// qty: number = 1; ts
// <app-increment-button
//   [(value)]="qty"
//   [min]="1"
//   [max]="10"
//   [step]="1"
// ></app-increment-button>
