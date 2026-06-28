import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError, timeout } from 'rxjs';
import { catchError } from 'rxjs/operators';

const timeoutMs = 2000;

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    timeout(timeoutMs),
    catchError((error: HttpErrorResponse) => {
      return handleError(error);
    })
  );
};

function handleError(error: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred';

  if (error.error instanceof ErrorEvent) {
    errorMessage = `Client-side error: ${error.error.message}`;
  } else {
    switch (error.status) {
      case 304:
        errorMessage = 'Not Modified - The resource has not changed';
        break;
      case 400:
        errorMessage = 'Bad Request - Please check your input';
        break;
      case 401:
        errorMessage = 'Unauthorized - Please login again';
        handleUnauthorized();
        break;
      case 403:
        errorMessage = 'Forbidden - You do not have permission';
        break;
      case 404:
        errorMessage = 'Not Found - The requested resource was not found';
        break;
      case 408:
        errorMessage = 'Request Timeout';
        break;
      case 409:
        errorMessage = 'Conflict - Resource conflict occurred';
        break;
      case 500:
        errorMessage = 'Internal Server Error - Please try again later';
        break;
      case 502:
        errorMessage = 'Bad Gateway';
        break;
      case 503:
        errorMessage = 'Service Unavailable';
        break;
      case 504:
        errorMessage = 'Gateway Timeout';
        break;
      default:
        errorMessage = `HTTP Error ${error.status}: ${error.message}`;
    }
  }

  console.error('HTTP Error:', errorMessage);
  return throwError(() => new Error(errorMessage));
}

function handleUnauthorized(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
}