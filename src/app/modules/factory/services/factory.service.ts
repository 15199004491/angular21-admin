import { Injectable } from '@angular/core';
import { Factory, Region } from '../models/factory.model';
import { factoryMockData, regionMockData, factoryStatuses } from '../mock/factory.mock';
import { ApiService, ApiResponse } from '../../../core/services/api.service';
import { AppConfigService } from '../../../core/config/app.config';

@Injectable({
    providedIn: 'root'
})
export class FactoryService {
    constructor(
        private apiService: ApiService,
        private appConfig: AppConfigService
    ) {}

    async getFactories(params?: { name?: string; location?: string; status?: string }): Promise<Factory[]> {
        if (this.appConfig.useMockData) {
            return this.getMockFactories(params);
        }
        return this.getApiFactories(params);
    }

    async getFactoryById(id: number): Promise<Factory | undefined> {
        if (this.appConfig.useMockData) {
            return factoryMockData.find(f => f.id === id);
        }
        return this.getApiFactoryById(id);
    }

    getRegions(): Region[] {
        return regionMockData;
    }

    getFactoryStatuses(): { label: string; value: string }[] {
        return factoryStatuses;
    }

    async createFactory(factory: Omit<Factory, 'id' | 'verified'>): Promise<Factory> {
        if (this.appConfig.useMockData) {
            return this.createMockFactory(factory);
        }
        return this.createApiFactory(factory);
    }

    async updateFactory(id: number, factory: Partial<Factory>): Promise<Factory | undefined> {
        if (this.appConfig.useMockData) {
            return this.updateMockFactory(id, factory);
        }
        return this.updateApiFactory(id, factory);
    }

    async deleteFactory(id: number): Promise<boolean> {
        if (this.appConfig.useMockData) {
            return this.deleteMockFactory(id);
        }
        return this.deleteApiFactory(id);
    }

    private getMockFactories(params?: { name?: string; location?: string; status?: string }): Promise<Factory[]> {
        let result = [...factoryMockData];
        if (params?.name) {
            const name = params.name.toLowerCase();
            result = result.filter(f => f.name.toLowerCase().includes(name));
        }
        if (params?.location) {
            result = result.filter(f => f.location === params.location);
        }
        if (params?.status) {
            result = result.filter(f => f.status === params.status);
        }
        return Promise.resolve(result);
    }

    private async getApiFactories(params?: { name?: string; location?: string; status?: string }): Promise<Factory[]> {
        try {
            const response = await this.apiService.get<Factory[]>('factories', params).toPromise();
            return response?.data || [];
        } catch (error) {
            console.error('Failed to fetch factories:', error);
            return [];
        }
    }

    private async getApiFactoryById(id: number): Promise<Factory | undefined> {
        try {
            const response = await this.apiService.get<Factory>(`factories/${id}`).toPromise();
            return response?.data;
        } catch (error) {
            console.error('Failed to fetch factory:', error);
            return undefined;
        }
    }

    private createMockFactory(factory: Omit<Factory, 'id' | 'verified'>): Promise<Factory> {
        const maxId = Math.max(...factoryMockData.map(f => f.id));
        const newFactory: Factory = {
            ...factory,
            id: maxId + 1,
            verified: false
        };
        factoryMockData.push(newFactory);
        return Promise.resolve(newFactory);
    }

    private async createApiFactory(factory: Omit<Factory, 'id' | 'verified'>): Promise<Factory> {
        try {
            const response = await this.apiService.post<Factory>('factories', factory).toPromise();
            return response?.data || factory as Factory;
        } catch (error) {
            console.error('Failed to create factory:', error);
            throw error;
        }
    }

    private updateMockFactory(id: number, factory: Partial<Factory>): Promise<Factory | undefined> {
        const index = factoryMockData.findIndex(f => f.id === id);
        if (index === -1) return Promise.resolve(undefined);
        
        factoryMockData[index] = {
            ...factoryMockData[index],
            ...factory
        };
        return Promise.resolve(factoryMockData[index]);
    }

    private async updateApiFactory(id: number, factory: Partial<Factory>): Promise<Factory | undefined> {
        try {
            const response = await this.apiService.put<Factory>(`factories/${id}`, factory).toPromise();
            return response?.data;
        } catch (error) {
            console.error('Failed to update factory:', error);
            return undefined;
        }
    }

    private deleteMockFactory(id: number): Promise<boolean> {
        const index = factoryMockData.findIndex(f => f.id === id);
        if (index === -1) return Promise.resolve(false);
        factoryMockData.splice(index, 1);
        return Promise.resolve(true);
    }

    private async deleteApiFactory(id: number): Promise<boolean> {
        try {
            await this.apiService.delete<unknown>(`factories/${id}`).toPromise();
            return true;
        } catch (error) {
            console.error('Failed to delete factory:', error);
            return false;
        }
    }
}