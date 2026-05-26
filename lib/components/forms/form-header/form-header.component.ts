import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-header',
  standalone: false,
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.css'],
})
export class FormHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Output() back = new EventEmitter<void>();

  onBackClick() {
    this.back.emit();
  }
}
