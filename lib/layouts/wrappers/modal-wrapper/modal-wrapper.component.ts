import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  standalone: false,
  styleUrls: ['./modal-wrapper.component.css'],
  templateUrl: './modal-wrapper.component.html',
})
export class ModalWrapperComponent {
  @Input() show = false;
  @Input() title = '';
  @Input() iconClass = ''; // ← new input
  @Output() closed = new EventEmitter();

  handleClose() {
    this.closed.emit();
  }
}
