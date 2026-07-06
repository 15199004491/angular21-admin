import { describe, it, expect, vi, beforeEach } from 'vitest';
import { httpInterceptor } from './http.interceptor';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('httpInterceptor', () => {
  const nextHandler = vi.fn();
  const mockRequest = new HttpRequest('GET', '/api/test');

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('localStorage', {
      removeItem: vi.fn()
    });
    vi.stubGlobal('window', {
      location: { href: '' }
    });
  });

  it('should pass through successful requests', async () => {
    const mockResponse = new HttpResponse({ body: { data: 'test' } });
    nextHandler.mockReturnValue(of(mockResponse));

    const response = await httpInterceptor(mockRequest, nextHandler).toPromise();
    expect(response).toEqual(mockResponse);
    expect(nextHandler).toHaveBeenCalledWith(mockRequest);
  });

  it('should handle 401 unauthorized error', async () => {
    const errorResponse = new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized',
      error: { message: 'Unauthorized' }
    });
    nextHandler.mockReturnValue(throwError(() => errorResponse));

    await expect(httpInterceptor(mockRequest, nextHandler).toPromise()).rejects.toThrowError(/Unauthorized/);
  });

  it('should handle 404 not found error', async () => {
    const errorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      error: { message: 'Not Found' }
    });
    nextHandler.mockReturnValue(throwError(() => errorResponse));

    await expect(httpInterceptor(mockRequest, nextHandler).toPromise()).rejects.toThrowError(/Not Found/);
  });

  it('should handle 500 server error', async () => {
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
      error: { message: 'Server error' }
    });
    nextHandler.mockReturnValue(throwError(() => errorResponse));

    await expect(httpInterceptor(mockRequest, nextHandler).toPromise()).rejects.toThrowError(/Internal Server Error/);
  });

  it('should handle client-side errors', async () => {
    const clientError = new ErrorEvent('Network error', { message: 'Network error' });
    const errorResponse = new HttpErrorResponse({
      error: clientError
    });
    nextHandler.mockReturnValue(throwError(() => errorResponse));

    await expect(httpInterceptor(mockRequest, nextHandler).toPromise()).rejects.toThrowError(/Client-side error/);
  });
});