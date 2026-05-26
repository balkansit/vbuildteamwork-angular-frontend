import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  standalone: false,
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
})
export class AuthLayoutComponent {
  @Input() imageSrc: string = '';
  @Input() imagePosition: 'left' | 'right' = 'left';
  @Input() layoutType: 'split' | 'centered' = 'split';
}
