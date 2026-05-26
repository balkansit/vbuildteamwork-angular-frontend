import { Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { SpinnerLoadingService } from '@lib/services/components/spinner-loading.service';
import { AlertData } from '@lib/models/Alert.model';

export function withLoadingAndAlert<T>(
  spinnerService: SpinnerLoadingService,
  setAlert: (alert: AlertData | null) => void,
  options: {
    useModal?: boolean; // default: true
    showSuccess?: boolean; // default: true
    loadingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
    autoDismissMs?: number;
    color?: string;
  } = {}
) {
  const showModal = options.useModal !== false;
  const showSuccess = options.showSuccess !== false;

  return (source: Observable<T>): Observable<T> =>
    new Observable((observer) => {
      // Show loading
      spinnerService.setLoading(true, {
        message: options.loadingMessage || 'Loading, please wait...',
        color: options.color,
        autoDismissMs: options.autoDismissMs || 5000,
      });

      return source
        .pipe(
          tap((res: any) => {
            if (res?.success !== false && showSuccess) {
              console.log('Success in withLoadingAndAlert:', res);
              setAlert({
                showAlert: true,
                status: 'success',
                title: 'Success',
                description: options.successMessage || res?.message || 'Done!',
                buttons: showModal
                  ? [{ label: 'OK', class: 'btn-primary', action: 'ok' }]
                  : [],
                type: 'success', // for BootstrapAlert
                autoDismissSeconds: (options.autoDismissMs || 5000) / 1000,
              });
            }
          }),
          catchError((err) => {
            console.error('Error in withLoadingAndAlert:', err);
            setAlert({
              showAlert: true,
              status: 'error',
              title: 'Error',
              description: err?.message || 'Something went wrong.',
              buttons: showModal
                ? [{ label: 'OK', class: 'btn-primary', action: 'ok' }]
                : [],
              type: 'danger', // for BootstrapAlert
              autoDismissSeconds: (options.autoDismissMs || 5000) / 1000,
            });
            return of(err); // swallow or rethrow
          }),
          finalize(() => {
            spinnerService.setLoading(false);
          })
        )
        .subscribe({
          next: (value) => observer.next(value),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
    });
}
