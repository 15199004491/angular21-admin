import { Region } from '@/app/modules/factory/models/factory.model';
import { regionMockData } from '@/app/modules/factory/mock/factory.mock';

export const regionalMock = {
    getRegions: (params?: { name?: string; code?: string }): Promise<Region[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                let result = [...regionMockData];
                if (params?.name) {
                    const name = params.name.toLowerCase();
                    result = result.filter(r => r.name.toLowerCase().includes(name));
                }
                if (params?.code) {
                    result = result.filter(r => r.code === params.code);
                }
                resolve(result);
            }, 300);
        });
    },

    getRegionById: (params: { id: number }): Promise<Region | undefined> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(regionMockData.find(r => r.code === params.id.toString()));
            }, 200);
        });
    },

    createRegion: (params: Omit<Region, 'id'>): Promise<Region> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const newRegion: Region = {
                    ...params
                };
                regionMockData.push(newRegion);
                resolve(newRegion);
            }, 200);
        });
    },

    updateRegion: (params: { code: string; data: Partial<Region> }): Promise<Region | undefined> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const index = regionMockData.findIndex(r => r.code === params.code);
                if (index === -1) {
                    resolve(undefined);
                } else {
                    regionMockData[index] = { ...regionMockData[index], ...params.data };
                    resolve(regionMockData[index]);
                }
            }, 200);
        });
    },

    deleteRegion: (params: { code: string }): Promise<boolean> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const index = regionMockData.findIndex(r => r.code === params.code);
                if (index === -1) {
                    resolve(false);
                } else {
                    regionMockData.splice(index, 1);
                    resolve(true);
                }
            }, 200);
        });
    },
};