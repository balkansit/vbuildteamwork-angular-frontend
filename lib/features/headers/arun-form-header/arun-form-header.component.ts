import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@lib/services/auth/auth.service'; // Adjust the import path as needed

@Component({
  selector: 'app-arun-form-header',
  templateUrl: './arun-form-header.component.html',
  styleUrls: ['./arun-form-header.component.css'],
  standalone: false,
})
export class ArunFormHeaderComponent {
  @Input() logo: string = 'Arun Form Dashboard';
  currentTime: Date = new Date();
  stores: any[] = ['Store 1', 'Store 2', 'Store 3', 'Store 4', 'Store 5'];
  user: any | null = null;
  @Input() isSidebarCollapsed = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);

    this.user = this.authService.getUser(); // Get the user information
  }

  navigateToPOS() {
    this.router.navigate(['/pos']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  logout(): void {
    this.authService.logout();
  }
}
