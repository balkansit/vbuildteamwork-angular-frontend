import { Component } from '@angular/core';
import { AuthService } from '@lib/services/auth/auth.service'; // Adjust path as needed
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  errorMessage: string | null = null;
  isLoading: boolean = false;
  passwordTouched = false;
  sideBannerImage = 'assets/images/intro-banner.png'; // Adjust path as needed

  fields = [
    {
      name: 'phone',
      type: 'number',
      label: 'Phone',
      placeholder: 'Enter phone number',
      required: true,
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(formValue: any) {
    this.errorMessage = null;
    this.isLoading = true;

    this.authService
      .register(formValue)
      .pipe(
        catchError((error) => {
          this.isLoading = false;
          this.errorMessage = error?.message || 'An unexpected error occurred';
          return of(null);
        })
      )
      .subscribe((response) => {
        this.isLoading = false;

        if (response?.success && response.data) {
          const data = response.data;
          this.authService.setToken(data.token);
          this.authService.setUser(data.user);

          if (!data.user.shop_id) {
            this.router.navigate(['/initial-setup']);
            return;
          }

          this.router.navigate(['/']);
        } else if (response) {
          this.errorMessage = response.message || 'Login failed';
        }
      });
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  validatePassword(formValue: any) {
    return !formValue.password && this.passwordTouched;
  }

  clearError() {
    this.errorMessage = null;
  }
}
