import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private _useMockData = true;
    private _apiBaseUrl = 'http://localhost:3000/api';

    get useMockData(): boolean {
        return this._useMockData;
    }

    set useMockData(value: boolean) {
        this._useMockData = value;
    }

    get apiBaseUrl(): string {
        return this._apiBaseUrl;
    }

    set apiBaseUrl(value: string) {
        this._apiBaseUrl = value;
    }

    toggleMockMode(): void {
        this._useMockData = !this._useMockData;
    }
}