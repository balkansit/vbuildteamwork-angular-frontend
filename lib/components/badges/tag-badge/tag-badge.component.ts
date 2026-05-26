import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag-badge',
  standalone: false,
  templateUrl: './tag-badge.component.html',
  styleUrls: ['./tag-badge.component.css'],
})
export class TagBadgeComponent {
  @Input() text: string = '';
  @Input() variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark' = 'primary';

  @Input() removable: boolean = false;
  @Input() size: 'sm' | 'md' = 'md';

  @Output() remove = new EventEmitter<void>();

  onRemove(event: MouseEvent) {
    event.stopPropagation();
    this.remove.emit();
  }
}

// Example usage in a template:
// <app-tag-badge
//   text="New"
//   variant="success"
//   [removable]="true"
//   size="sm"
//   (remove)="onTagRemove()"
// ></app-tag-badge>

// <app-tag-badge
//   text="Out of Stock"
//   variant="danger"
//   [removable]="false"
//   size="md"
// ></app-tag-badge>
