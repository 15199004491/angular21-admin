import { http } from '@/app/core/services/api.service';
import { Factory, Region } from '@/app/modules/factory/models/factory.model';

export const factoryApi = {
    getFactories: (params?: { name?: string; location?: string; status?: string }) => http.request<Factory[]>('GET', 'factories', undefined, params),
    getFactoryById: (params: { id: number }) => http.request<Factory>('GET', `factories/${params.id}`),
    createFactory: (params: Omit<Factory, 'id' | 'verified'>) => http.request<Factory>('POST', 'factories', params),
    updateFactory: (params: { id: number; data: Partial<Factory> }) => http.request<Factory>('PUT', `factories/${params.id}`, params.data),
    deleteFactory: (params: { id: number }) => http.request<boolean>('DELETE', `factories/${params.id}`),
};

export const regionalApi = {
    getRegions: (params?: { name?: string; code?: string }) => http.request<Region[]>('GET', 'regions', undefined, params),
    getRegionById: (params: { id: number }) => http.request<Region>('GET', `regions/${params.id}`),
    createRegion: (params: Omit<Region, 'id'>) => http.request<Region>('POST', 'regions', params),
    updateRegion: (params: { code: string; data: Partial<Region> }) => http.request<Region>('PUT', `regions/${params.code}`, params.data),
    deleteRegion: (params: { code: string }) => http.request<boolean>('DELETE', `regions/${params.code}`),
};