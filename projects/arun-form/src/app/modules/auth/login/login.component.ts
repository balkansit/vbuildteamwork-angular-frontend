import { Component, Input } from '@angular/core';
import { AuthService } from '@lib/services/auth/auth.service'; // Adjust path as needed
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  errorMessage: string | null = null;
  isLoading: boolean = false;
  passwordTouched = false;
    @Input() imageSrc: string = 'assets/images/logo.png';
  sideBannerImage = 'assets/images/intro-banner.png'; // Adjust path as needed

  fields = [
    {
      name: 'phone',
      type: 'number',
      label: 'Phone',
      placeholder: 'Enter phone number',
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter password',
      required: true,
      suffixIconToggle: true, // special flag for password toggle icon
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
      .login(formValue)
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
