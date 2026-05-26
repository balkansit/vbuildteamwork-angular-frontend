import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: false,
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent {
  @Input() name!: string;
  @Input() iconSet: 'fa' | 'mat' = 'mat';
}

/*
Example usage in a parent component template:

<app-icon name="home" iconSet="fa"></app-icon>
<app-icon name="menu"></app-icon> <!-- Defaults to 'mat' icon set -->
*/
