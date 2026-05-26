import { Component, Input } from '@angular/core';
import { AuthService } from '@lib/services/auth/auth.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css'],
  standalone: false,
})
export class SetupComponent {
  errorMessage: string | null = null;
  isLoading: boolean = false;
  @Input() imageSrc: string = 'assets/images/logo.png';
  passwordTouched = false;
  sideBannerImage = 'assets/images/intro-banner.png'; // Adjust path as needed
  setupToken: string | null = null;
  registerForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  fields = [
    {
      name: 'full_name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter full name',
      required: true,
      value: 'Ravi Kumar',
    },
    {
      name: 'shop_name',
      type: 'text',
      label: 'Shop Name',
      placeholder: 'Enter shop name',
      required: true,
      value: 'Sri Balaji Medicals',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      placeholder: 'Enter location',
      required: true,
      value: 'Chennai',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      placeholder: 'Enter address',
      required: true,
      value: '123, MG Road, T Nagar, Chennai - 600017',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter email',
      required: true,
      value: 'ravi1@example.com',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter password',
      required: true,
      value: 'secret123',
    },
    {
      name: 'password_confirmation',
      type: 'password',
      label: 'Confirm Password',
      placeholder: 'Confirm password',
      required: true,
      value: 'secret123',
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }

    this.setupToken = sessionStorage.getItem('setup_token');
    if (!this.setupToken) {
      this.router.navigate(['/auth/register']);
    } else {
      console.log('Setup token:', this.setupToken);
    }

    this.registerForm = this.fb.group({
      full_name: ['', Validators.required],
      shop_name: ['', Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    this.isLoading = true;

    // Collect form values
    const formValue = {
      ...this.registerForm.value,
      setup_token: this.setupToken,
    };

    this.authService
      .setup(formValue)
      .pipe(
        catchError((error) => {
          this.isLoading = false;

          // Better error handling
          if (error?.error?.message) {
            this.errorMessage = error.error.message;
          } else if (error?.message) {
            this.errorMessage = error.message;
          } else {
            this.errorMessage = 'An unexpected error occurred';
          }

          return of(null);
        })
      )
      .subscribe((response) => {
        this.isLoading = false;

        if (response?.success && response.data) {
          this.router.navigate(['/auth/login']);
        } else if (response) {
          this.errorMessage = response.message || 'Setup failed';
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
