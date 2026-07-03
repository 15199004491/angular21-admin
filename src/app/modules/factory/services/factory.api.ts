import { http } from '@/app/core/services/api.service';
import { Factory } from '@/app/modules/factory/models/factory.model';

export default {
    getFactories: (params?: { name?: string; location?: string; status?: string }) => http.request<Factory[]>('GET', 'factories', undefined, params), // Get factories list
    getFactoryById: (params: { id: number }) => http.request<Factory>('GET', `factories/${params.id}`), // Get single factory
    createFactory: (params: Omit<Factory, 'id' | 'verified'>) => http.request<Factory>('POST', 'factories', params), // Create factory
    updateFactory: (params: { id: number; data: Partial<Factory> }) => http.request<Factory>('PUT', `factories/${params.id}`, params.data), // Update factory
    deleteFactory: (params: { id: number }) => http.request<boolean>('DELETE', `factories/${params.id}`), // Delete factory
};