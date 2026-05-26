import { Component, Input } from '@angular/core';
import { AuthService } from '@lib/services/auth/auth.service'; // Adjust path as needed
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false,
})
export class RegisterComponent {
  errorMessage: string | null = null;
  isLoading: boolean = false;
  passwordTouched = false;
  sideBannerImage = 'assets/images/intro-banner.png'; // Adjust path as needed
  @Input() imageSrc: string = 'assets/images/logo.png';
  selectedCountryCode: string = '+91';
  phone: string = '';

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

  selectCountryCode(countryCode: string) {
    this.selectedCountryCode = countryCode;
    console.log('Selected country code:', countryCode);
  }

  onSubmit() {
    this.errorMessage = null;
    this.isLoading = true;
    const phone: string = this.selectedCountryCode
      ? `${this.selectedCountryCode}${this.phone}`
      : this.phone;

    console.log('Form submitted with value:', phone);

    this.authService
      .requestOtp({ phone })
      .pipe(
        catchError((error) => {
          this.isLoading = false;
          return of(error.error || error);
        })
      )
      .subscribe((response) => {
        this.isLoading = false;
        if (response?.success && response.data) {
          console.log('OTP sent successfully:', response.data);
          sessionStorage.setItem('verifyData', JSON.stringify(response.data));
          this.router.navigate(['/auth/verify']);
        } else if (response) {
          if (response.error && response.error.phone) {
            this.errorMessage = response.error.phone[0];
          } else {
            this.errorMessage = response.message || 'Failed to send OTP';
          }
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
