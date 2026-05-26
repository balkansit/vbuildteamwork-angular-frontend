import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bootstrap-button',
  standalone: false,
  templateUrl: './bootstrap-button.component.html',
  styleUrls: ['./bootstrap-button.component.css'],
})
export class BootstrapButtonComponent {
  @Input() variant: string = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() iconClass?: string;
  @Input() iconPosition: 'prefix' | 'suffix' = 'prefix';
  @Input() imgSrc?: string;

  @Input() customClass: string = '';
  @Input() width: string = '';
  @Input() active: boolean = false;

  // 🎨 New Props
  @Input() gradient?: boolean = false;
  @Input() gradientColors: [string, string] = ['#28a745', '#218838']; // top, bottom
  @Input() boxShadow?: boolean = false;
  @Input() boxShadowColor: string = '#1e7e34';

  @Output() clicked = new EventEmitter<Event>();

  get dynamicStyles() {
    let styles: any = {
      width: this.width,
    };

    if (this.gradient) {
      styles.background = `linear-gradient(${this.gradientColors[0]}, ${this.gradientColors[1]})`;
    }

    if (this.boxShadow) {
      styles.boxShadow = `0px 0px 2px 4px ${this.boxShadowColor}`;
    }

    return styles;
  }

  onClick(event: Event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }
}

/*
Example usage in a parent component template:

<app-bootstrap-button
  [variant]="'success'"
  [type]="'submit'"
  [disabled]="isFormInvalid"
  [loading]="isLoading"
  [iconClass]="'bi bi-check-circle'"
  [iconPosition]="'prefix'"
  [customClass]="'my-custom-btn'"
  [width]="'150px'"
  (clicked)="onButtonClicked($event)">
  Submit
</app-bootstrap-button>

Another example with suffix icon and full width:

<app-bootstrap-button
  [variant]="'danger'"
  [iconClass]="'bi bi-trash'"
  [iconPosition]="'suffix'"
  [width]="'100%'"
  (clicked)="deleteItem()">
  Delete
</app-bootstrap-button>
*/
