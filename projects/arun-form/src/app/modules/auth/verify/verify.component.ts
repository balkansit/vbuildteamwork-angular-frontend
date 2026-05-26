import { Component, Input } from '@angular/core';
import { AuthService } from '@lib/services/auth/auth.service'; // Adjust path as needed
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-verify',
  standalone: false,
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css',
})
export class VerifyComponent {
  errorMessage: string | null = null;
  isLoading: boolean = false;
  passwordTouched = false;
  sideBannerImage = 'assets/images/intro-banner.png'; // Adjust path as needed
  showAlert = true;
  dataForVerification: any = null;
  @Input() imageSrc: string = 'assets/images/logo.png';
  remainingTime = 30;
  private timer: any;
  fields = [
    {
      name: 'otp',
      type: 'number',
      label: 'OTP',
      placeholder: 'Enter OTP',
      required: true,
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const dataString = sessionStorage.getItem('verifyData');

    if (dataString) {
      this.dataForVerification = dataString ? JSON.parse(dataString) : null;
      sessionStorage.removeItem('verifyData'); // Clear after reading
    }

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }

    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  handleModalAction(action: string) {
    if (action === 'retry') {
    } else if (action === 'cancel' || action === 'close') {
      this.showAlert = false;
    } else if (action === 'auto-close') {
    }
  }

  onSubmit(formValue: any) {
    this.errorMessage = null;
    this.isLoading = true;
    const phone = this.dataForVerification?.phone || formValue.phone;
    const otp = formValue.otp;
    this.authService
      .verifyOtp(phone, otp)
      .pipe(
        catchError((error) => {
          console.error('Error during OTP verification:', error);

          this.isLoading = false;
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage =
              error?.message || 'An unexpected error occurred';
          }
          return of(null);
        })
      )
      .subscribe((response) => {
        this.isLoading = false;

        if (response?.success && response.data) {
          const setup_token = response.data.setup_token;
          sessionStorage.setItem('setup_token', setup_token);
          this.router.navigate(['/auth/setup']);
        } else if (response) {
          this.errorMessage = response.message || 'Login failed';
        }
      });
  }

  resendOtp() {
    if (this.remainingTime > 0) return; // prevent resend before timer ends
    this.isLoading = true;
    const phone = this.dataForVerification?.phone;

    this.authService.sendOtp(phone);
  }
  startCountdown() {
    this.remainingTime = 30;
    const countdown = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(countdown);
      }
    }, 1000);
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
