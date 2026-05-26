import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from '@lib/services/auth/auth.service'; // Adjust the import path as necessary
import { AuthGuard } from '@lib/core/guards/auth.guard'; // Adjust the import path as necessary
import { ComponentsModule } from '@lib/components/components.module'; // Adjust the import path as necessary
import { LayoutsModule } from '@lib/layouts/layouts.module';
import { FeaturesModule } from '@lib/features/features.module';
import { VerifyComponent } from './verify/verify.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetupComponent } from './setup/setup.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    ForgotPasswordComponent,
    SetupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    LayoutsModule,
    FeaturesModule,

  ],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
