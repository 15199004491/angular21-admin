import { inject } from '@angular/core';
import { ApiService } from './api.service';

const apiService = inject(ApiService);

export const http = {
    request: <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: any, params?: Record<string, any>) => 
        apiService.request<T>(method, url, data, params),
};