import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',

  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'text' = 'primary';
  @Input() icon?: string;
  @Input() iconPosition: 'prefix' | 'suffix' | 'only' = 'prefix';
  @Input() label?: string;
  @Input() loading = false;
  @Input() disabled = false;
  @Input() borderRadius: 'small' | 'medium' | 'large' | 'none' = 'none';
  @Input() noBorder = false;

  @Output() clicked = new EventEmitter<Event>();

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  onClick(event: Event) {
    if (this.isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }
}

/**
 * Usage variants for ButtonComponent:
 *
 * <app-button label="Primary" variant="primary"></app-button>
 * <app-button label="Secondary" variant="secondary"></app-button>
 * <app-button label="Outline" variant="outline"></app-button>
 * <app-button label="Text" variant="text"></app-button>
 *
 * With icon:
 * <app-button label="Save" icon="save" iconPosition="prefix"></app-button>
 * <app-button label="Next" icon="arrow_forward" iconPosition="suffix"></app-button>
 * <app-button icon="favorite" iconPosition="only"></app-button>
 *
 * With loading and disabled:
 * <app-button label="Loading..." [loading]="true"></app-button>
 * <app-button label="Disabled" [disabled]="true"></app-button>
 *
 * With border radius:
 * <app-button label="Small Radius" borderRadius="small"></app-button>
 * <app-button label="Large Radius" borderRadius="large"></app-button>
 *
 * No border:
 * <app-button label="No Border" [noBorder]="true"></app-button>
 */
