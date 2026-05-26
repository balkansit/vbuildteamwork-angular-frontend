import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bootstrap-alert',
  templateUrl: './bootstrap-alert.component.html',
  styleUrls: ['./bootstrap-alert.component.css'],
  standalone: false,
})
export class BootstrapAlertComponent implements OnInit, OnDestroy, OnChanges {
  @Input() message: string | null = null; // Message to display
  @Input() type: 'success' | 'info' | 'warning' | 'danger' = 'info'; // Alert type
  @Input() duration: number = 3000; // Auto-hide duration for success message
  @Output() close = new EventEmitter<void>(); // Event emitted when alert is dismissed

  isVisible: boolean = false;
  private timeoutId: any;

  ngOnInit() {
    this.checkVisibility();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message'] || changes['type']) {
      this.checkVisibility();
    }
  }

  checkVisibility() {
    if (this.message) {
      this.isVisible = true;
      this.clearTimeoutRef();
      // Auto-hide if it is a success alert
      if (this.type === 'success') {
        this.timeoutId = setTimeout(() => {
          this.dismiss();
        }, this.duration);
      }
    } else {
      this.isVisible = false;
    }
  }

  ngOnDestroy() {
    this.clearTimeoutRef();
  }

  private clearTimeoutRef() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  dismiss(): void {
    this.isVisible = false;
    this.clearTimeoutRef();
    this.close.emit();
  }

  get iconClass(): string {
    switch (this.type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'info':
        return 'fas fa-info-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      case 'danger':
        return 'fas fa-times-circle';
      default:
        return 'fas fa-info-circle';
    }
  }
}
