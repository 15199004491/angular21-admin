import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timeout } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../config/app.config';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  code?: number;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public override message: string,
    public originalError?: HttpErrorResponse
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private timeoutMs = 2000;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService
  ) {}

  private get headers(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  get<T>(url: string, params?: Record<string, any>): Observable<ApiResponse<T>> {
    const fullUrl = this.buildUrl(url);
    const httpParams = this.buildParams(params);
    return this.http.get<ApiResponse<T>>(fullUrl, { params: httpParams, headers: this.headers }).pipe(
      timeout(this.timeoutMs),
      catchError(this.handleError)
    );
  }

  post<T>(url: string, body: any): Observable<ApiResponse<T>> {
    const fullUrl = this.buildUrl(url);
    return this.http.post<ApiResponse<T>>(fullUrl, body, { headers: this.headers }).pipe(
      timeout(this.timeoutMs),
      catchError(this.handleError)
    );
  }

  put<T>(url: string, body: any): Observable<ApiResponse<T>> {
    const fullUrl = this.buildUrl(url);
    return this.http.put<ApiResponse<T>>(fullUrl, body, { headers: this.headers }).pipe(
      timeout(this.timeoutMs),
      catchError(this.handleError)
    );
  }

  delete<T>(url: string): Observable<ApiResponse<T>> {
    const fullUrl = this.buildUrl(url);
    return this.http.delete<ApiResponse<T>>(fullUrl, { headers: this.headers }).pipe(
      timeout(this.timeoutMs),
      catchError(this.handleError)
    );
  }

  getBlob(url: string, params?: Record<string, any>): Observable<Blob> {
    const fullUrl = this.buildUrl(url);
    const httpParams = this.buildParams(params);
    return this.http.get(fullUrl, { 
      params: httpParams, 
      headers: this.headers,
      responseType: 'blob' 
    }).pipe(
      timeout(this.timeoutMs * 5),
      catchError(this.handleBlobError)
    );
  }

  private buildUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${this.appConfig.apiBaseUrl}/${url}`;
  }

  private buildParams(params?: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          httpParams = httpParams.set(key, String(params[key]));
        }
      });
    }
    return httpParams;
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An unknown error occurred';
    let statusCode = error.status;

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network error: ${error.error.message}`;
      statusCode = 0;
    } else if (error.status === 0) {
      errorMessage = 'Request timed out or network unavailable';
    } else {
      const errorInfo = this.getErrorMessage(error.status);
      errorMessage = errorInfo.message;
      statusCode = errorInfo.code;
      
      this.handleSpecialStatus(error.status);
    }

    console.error(`API Error [${statusCode}]: ${errorMessage}`);
    return throwError(() => new ApiError(statusCode, errorMessage, error));
  }

  private handleBlobError = (error: HttpErrorResponse): Observable<never> => {
    const errorInfo = this.getErrorMessage(error.status);
    console.error(`Blob Error [${error.status}]: ${errorInfo.message}`);
    return throwError(() => new ApiError(errorInfo.code, errorInfo.message, error));
  }

  private getErrorMessage(status: number): { code: number; message: string } {
    const errorMap: Record<number, string> = {
      304: 'Resource not modified since last request',
      400: 'Bad request - invalid input data',
      401: 'Unauthorized - login required',
      403: 'Forbidden - insufficient permissions',
      404: 'Resource not found',
      408: 'Request timed out',
      409: 'Conflict - resource already exists',
      422: 'Validation error - check input data',
      429: 'Too many requests - please try again later',
      500: 'Internal server error - please try again later',
      502: 'Bad gateway - server unavailable',
      503: 'Service unavailable - please try again later',
      504: 'Gateway timeout - server not responding'
    };

    return {
      code: status,
      message: errorMap[status] || `HTTP error ${status}`
    };
  }

  private handleSpecialStatus(status: number): void {
    switch (status) {
      case 401:
        this.handleUnauthorized();
        break;
      case 403:
        this.handleForbidden();
        break;
      case 429:
        this.handleRateLimit();
        break;
    }
  }

  private handleUnauthorized(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('Redirecting to login due to unauthorized access...');
    window.location.href = '/login';
  }

  private handleForbidden(): void {
    console.log('User does not have permission to access this resource');
  }

  private handleRateLimit(): void {
    console.log('Rate limit exceeded - please wait before making more requests');
  }

  getBaseUrl(): string {
    return this.appConfig.apiBaseUrl;
  }

  setTimeout(ms: number): void {
    this.timeoutMs = ms;
  }
}