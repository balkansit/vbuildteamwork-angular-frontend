import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@lib/services/auth/auth.service'; // Import the AuthService
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //---------- Get Auth Token ----------
    const token = this.authService.getToken(); // Get the token from AuthService

    let authReq = req;

    if (token) {
      // const shopId = this.authService.getShopId(); // Get the shop_id from AuthService
      // console.log('Shop ID:', shopId);
      // if (!shopId) {
      //   console.log('Shop ID is missing');
      //   // Redirect to initial-setup if shop_id is not available
      //   this.router.navigate(['/initial-setup']);
      //   return throwError('Shop ID is missing');
      // }
      // Clone the request and set the new header with the token
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle token expiration or invalid token
          // Redirect to login page
          this.authService.logout();
        }
        return throwError(error); // Propagate the error
      })
    );
  }
}
