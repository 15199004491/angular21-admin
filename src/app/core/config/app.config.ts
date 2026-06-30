import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private _apiBaseUrl = 'http://localhost:3000/api';

    get apiBaseUrl(): string {
        return this._apiBaseUrl;
    }

    set apiBaseUrl(value: string) {
        this._apiBaseUrl = value;
    }
}