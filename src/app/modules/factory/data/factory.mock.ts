import { Factory, Region } from '@/app/modules/factory/models/factory.model';

export const factoryMockData: Factory[] = [
    { id: 1, name: 'Urumqi Textile Factory', location: 'Urumqi', status: 'active', employeeCount: 500, establishedYear: 2000, verified: true, details: 'Specializes in cotton textile production with advanced weaving machines.', contact: '+86 991 1234 5678' },
    { id: 2, name: 'Urumqi Tech Hub', location: 'Urumqi', status: 'active', employeeCount: 1200, establishedYear: 2005, verified: true, details: 'High-tech industrial park focusing on software development and IT services.', contact: '+86 991 2345 6789' },
    { id: 3, name: 'Tianshan District Manufacturing', location: 'Tianshan District', status: 'active', employeeCount: 850, establishedYear: 1998, verified: true, details: 'Manufactures electronic components and consumer electronics products.', contact: '+86 991 3456 7890' },
    { id: 4, name: 'Saybagh Food Processing', location: 'Saybagh District', status: 'maintenance', employeeCount: 680, establishedYear: 2002, verified: true, details: 'Processes local agricultural products into packaged food items.', contact: '+86 991 4567 8901' },
    { id: 5, name: 'Shihezi Industrial Park', location: 'Shihezi', status: 'active', employeeCount: 800, establishedYear: 1995, verified: true, details: 'Large-scale industrial complex with multiple manufacturing lines.', contact: '+86 993 5678 9012' },
    { id: 6, name: 'Shihezi Electronics Factory', location: 'Shihezi', status: 'active', employeeCount: 1500, establishedYear: 2000, verified: true, details: 'Produces electronic devices and communication equipment.', contact: '+86 993 6789 0123' },
    { id: 7, name: 'Shawan Agricultural Machinery', location: 'Shawan', status: 'active', employeeCount: 920, establishedYear: 2003, verified: true, details: 'Manufactures agricultural machinery and farming equipment.', contact: '+86 993 7890 1234' },
    { id: 8, name: 'Shawan Town Factory', location: 'Shawan Town', status: 'active', employeeCount: 450, establishedYear: 1985, verified: false, details: 'Small-scale manufacturing facility for local market needs.', contact: '+86 993 8901 2345' },
    { id: 9, name: 'Tacheng Auto Parts', location: 'Tacheng', status: 'active', employeeCount: 300, establishedYear: 2010, verified: true, details: 'Produces automotive parts and components for domestic market.', contact: '+86 901 9012 3456' },
    { id: 10, name: 'Yumin County Food Factory', location: 'Yumin County', status: 'active', employeeCount: 720, establishedYear: 2008, verified: true, details: 'Specializes in dairy products and meat processing.', contact: '+86 901 0123 4567' },
    { id: 11, name: 'Kashgar Carpet Factory', location: 'Kashgar', status: 'maintenance', employeeCount: 480, establishedYear: 2005, verified: true, details: 'Handmade carpet production with traditional craftsmanship.', contact: '+86 998 1234 5678' },
    { id: 12, name: 'Kashgar City Textile', location: 'Kashgar City', status: 'active', employeeCount: 1200, establishedYear: 2005, verified: true, details: 'Modern textile mill producing fabrics and garments.', contact: '+86 998 2345 6789' },
    { id: 13, name: 'Aksu Cotton Factory', location: 'Aksu', status: 'active', employeeCount: 950, establishedYear: 2008, verified: true, details: 'Cotton ginning and processing facility.', contact: '+86 997 3456 7890' },
    { id: 14, name: 'Aksu City Processing', location: 'Aksu City', status: 'active', employeeCount: 1800, establishedYear: 2012, verified: true, details: 'Comprehensive processing plant for agricultural products.', contact: '+86 997 4567 8901' },
    { id: 15, name: 'Kuqa Fruit Processing', location: 'Kuqa County', status: 'active', employeeCount: 620, establishedYear: 2015, verified: true, details: 'Fruit juice and dried fruit production facility.', contact: '+86 997 5678 9012' },
    { id: 16, name: 'Guangzhou Electronics', location: 'Guangzhou', status: 'active', employeeCount: 520, establishedYear: 2008, verified: true, details: 'Consumer electronics manufacturing and assembly.', contact: '+86 20 6789 0123' },
    { id: 17, name: 'Tianhe District Tech Center', location: 'Tianhe District', status: 'active', employeeCount: 800, establishedYear: 2013, verified: true, details: 'Technology research and development center.', contact: '+86 20 7890 1234' },
    { id: 18, name: 'Zhujiang New Town Hub', location: 'Zhujiang New Town', status: 'maintenance', employeeCount: 380, establishedYear: 2006, verified: false, details: 'Business hub with office spaces and meeting facilities.', contact: '+86 20 8901 2345' },
    { id: 19, name: 'Shenzhen R&D Center', location: 'Shenzhen', status: 'active', employeeCount: 450, establishedYear: 2012, verified: true, details: 'Focuses on cutting-edge technology research and innovation.', contact: '+86 755 9012 3456' },
    { id: 20, name: 'Futian District Factory', location: 'Futian District', status: 'active', employeeCount: 600, establishedYear: 2010, verified: true, details: 'High-end manufacturing for precision components.', contact: '+86 755 0123 4567' },
    { id: 21, name: 'Nanshan Hi-Tech Factory', location: 'Nanshan District', status: 'active', employeeCount: 420, establishedYear: 2014, verified: true, details: 'Hi-tech manufacturing with clean room facilities.', contact: '+86 755 1234 5678' },
    { id: 22, name: 'Beijing Auto Factory', location: 'Beijing', status: 'active', employeeCount: 600, establishedYear: 2003, verified: true, details: 'Automobile manufacturing and assembly plant.', contact: '+86 10 2345 6789' },
    { id: 23, name: 'Chaoyang District Plant', location: 'Chaoyang District', status: 'active', employeeCount: 1100, establishedYear: 1998, verified: true, details: 'Heavy machinery manufacturing facility.', contact: '+86 10 3456 7890' },
    { id: 24, name: 'Haidian Tech Factory', location: 'Haidian District', status: 'maintenance', employeeCount: 550, establishedYear: 2005, verified: true, details: 'Semiconductor and microchip production.', contact: '+86 10 4567 8901' },
    { id: 25, name: 'Xicheng District Processing', location: 'Xicheng District', status: 'active', employeeCount: 480, establishedYear: 2006, verified: true, details: 'Food processing and packaging facility.', contact: '+86 10 5678 9012' },
    { id: 26, name: 'Xinjiang Province Steel', location: 'Xinjiang Province', status: 'active', employeeCount: 720, establishedYear: 2000, verified: true, details: 'Steel production and metal fabrication.', contact: '+86 991 6789 0123' },
    { id: 27, name: 'Guangdong Province Auto', location: 'Guangdong Province', status: 'active', employeeCount: 350, establishedYear: 2009, verified: true, details: 'Automotive parts manufacturing for export.', contact: '+86 20 7890 1234' },
    { id: 28, name: 'Shuimogou District Factory', location: 'Shuimogou District', status: 'active', employeeCount: 580, establishedYear: 2011, verified: true, details: 'Construction materials and cement production.', contact: '+86 991 8901 2345' },
    { id: 29, name: 'Huangguan Town Agriculture', location: 'Huangguan Town', status: 'active', employeeCount: 420, establishedYear: 2008, verified: true, details: 'Agricultural products processing and distribution.', contact: '+86 993 9012 3456' },
    { id: 30, name: 'Emin County Food', location: 'Emin County', status: 'active', employeeCount: 350, establishedYear: 2001, verified: true, details: 'Local specialty food production.', contact: '+86 901 1234 5678' },
    { id: 31, name: 'Jinghe County Factory', location: 'Jinghe County', status: 'active', employeeCount: 680, establishedYear: 2004, verified: true, details: 'Chemical products manufacturing.', contact: '+86 909 2345 6789' },
    { id: 32, name: 'Yecheng County Textile', location: 'Yecheng County', status: 'inactive', employeeCount: 280, establishedYear: 1995, verified: false, details: 'Traditional textile production facility.', contact: '+86 998 3456 7890' }
];

export const regionMockData: Region[] = [
    { name: 'Xinjiang Province', code: '100100000001', type: 'military', createdDate: '2024-01-15 09:30:00', parent: '' },
    { name: 'Urumqi', code: '100100000002', type: 'local', createdDate: '2024-02-20 14:15:30', parent: '100100000001' },
    { name: 'Tianshan District', code: '100100000003', type: 'local', createdDate: '2024-01-10 10:00:00', parent: '100100000002' },
    { name: 'Saybagh District', code: '100100000004', type: 'local', createdDate: '2024-03-05 16:45:20', parent: '100100000002' },
    { name: 'Shuimogou District', code: '100100000005', type: 'local', createdDate: '2024-01-25 11:20:00', parent: '100100000002' },
    { name: 'Shihezi', code: '100100000006', type: 'military', createdDate: '2024-04-18 08:00:00', parent: '100100000001' },
    { name: 'Shawan', code: '100100000007', type: 'military', createdDate: '2024-02-12 15:30:45', parent: '100100000001' },
    { name: 'Shawan Town', code: '100100000008', type: 'local', createdDate: '2024-03-22 09:15:00', parent: '100100000007' },
    { name: 'Huangguan Town', code: '100100000009', type: 'local', createdDate: '2024-01-30 17:00:30', parent: '100100000007' },
    { name: 'Tacheng', code: '100100000010', type: 'military', createdDate: '2024-02-28 13:25:00', parent: '100100000001' },
    { name: 'Yumin County', code: '100100000011', type: 'local', createdDate: '2024-04-01 10:45:00', parent: '100100000010' },
    { name: 'Emin County', code: '100100000012', type: 'local', createdDate: '2024-03-15 14:00:00', parent: '100100000010' },
    { name: 'Jinghe County', code: '100100000013', type: 'local', createdDate: '2024-02-08 09:00:00', parent: '100100000010' },
    { name: 'Kashgar', code: '100100000014', type: 'local', createdDate: '2024-04-10 16:30:00', parent: '100100000001' },
    { name: 'Kashgar City', code: '100100000015', type: 'local', createdDate: '2024-03-01 11:15:20', parent: '100100000014' },
    { name: 'Yecheng County', code: '10010000016', type: 'local', createdDate: '2024-01-20 10:30:00', parent: '100100000014' },
    { name: 'Aksu', code: '100100000017', type: 'local', createdDate: '2024-02-15 14:20:00', parent: '100100000001' },
    { name: 'Aksu City', code: '100100000018', type: 'local', createdDate: '2024-03-25 09:45:00', parent: '100100000017' },
    { name: 'Kuqa County', code: '100100000019', type: 'local', createdDate: '2024-04-05 16:00:00', parent: '100100000017' },
    { name: 'Guangdong Province', code: '100200000001', type: 'local', createdDate: '2024-01-08 08:30:00', parent: '' },
    { name: 'Guangzhou', code: '100200000002', type: 'local', createdDate: '2024-02-18 13:15:00', parent: '100200000001' },
    { name: 'Tianhe District', code: '100200000003', type: 'local', createdDate: '2024-03-10 11:00:00', parent: '100200000002' },
    { name: 'Zhujiang New Town', code: '100200000004', type: 'local', createdDate: '2024-04-12 15:30:00', parent: '100200000003' },
    { name: 'Shenzhen', code: '100200000005', type: 'local', createdDate: '2024-01-22 09:00:00', parent: '100200000001' },
    { name: 'Futian District', code: '100200000006', type: 'local', createdDate: '2024-02-25 14:45:00', parent: '100200000005' },
    { name: 'Nanshan District', code: '100200000007', type: 'local', createdDate: '2024-03-28 10:20:00', parent: '100200000005' },
    { name: 'Beijing', code: '100300000001', type: 'local', createdDate: '2024-01-05 08:00:00', parent: '' },
    { name: 'Chaoyang District', code: '100300000002', type: 'local', createdDate: '2024-02-10 16:30:00', parent: '100300000001' },
    { name: 'Haidian District', code: '100300000003', type: 'local', createdDate: '2024-03-18 11:45:00', parent: '100300000001' },
    { name: 'Xicheng District', code: '100300000004', type: 'local', createdDate: '2024-04-20 09:15:00', parent: '100300000001' }
];

export const factoryStatuses = [
    { label: 'Active', value: 'active' },
    { label: 'Maintenance', value: 'maintenance' },
    { label: 'Inactive', value: 'inactive' }
];

export const regionTypes = [
    { label: 'Local', value: 'local' },
    { label: 'Military', value: 'military' }
];

export const regionTypeLabels: Record<string, string> = {
    military: 'Military',
    local: 'Local'
};

export const regionTypeClasses: Record<string, string> = {
    military: 'text-green-600',
    local: 'text-gray-900'
};

export const factorySearchFields = [
    { label: 'All Fields', value: '' },
    { label: 'Factory Name', value: 'name' },
    { label: 'Location', value: 'location' },
    { label: 'Status', value: 'status' },
    { label: 'ID', value: 'id' }
];

export const regionCodeToTreeData: Record<string, { label: string; data: string }> = {
    '100100000001': { label: 'Xinjiang Province', data: 'xinjiang' },
    '100100000002': { label: 'Urumqi', data: 'urumqi' },
    '100100000003': { label: 'Tianshan District', data: 'tianshan' },
    '100100000004': { label: 'Saybagh District', data: 'saybagh' },
    '100100000005': { label: 'Shuimogou District', data: 'shuimogou' },
    '100100000006': { label: 'Shihezi', data: 'shihezi' },
    '100100000007': { label: 'Shawan', data: 'shawan' },
    '100100000008': { label: 'Shawan Town', data: 'shawan-town' },
    '100100000009': { label: 'Huangguan Town', data: 'huangguan' },
    '100100000010': { label: 'Tacheng', data: 'tacheng' },
    '100100000011': { label: 'Yumin County', data: 'yumin' },
    '100100000012': { label: 'Emin County', data: 'emin' },
    '100100000013': { label: 'Jinghe County', data: 'jinghe' },
    '100100000014': { label: 'Kashgar', data: 'kashgar' },
    '100100000015': { label: 'Kashgar City', data: 'kashgar-city' },
    '10010000016': { label: 'Yecheng County', data: 'yecheng' },
    '100100000017': { label: 'Aksu', data: 'aksu' },
    '100100000018': { label: 'Aksu City', data: 'aksu-city' },
    '100100000019': { label: 'Kuqa County', data: 'kuqa' },
    '100200000001': { label: 'Guangdong Province', data: 'guangdong' },
    '100200000002': { label: 'Guangzhou', data: 'guangzhou' },
    '100200000003': { label: 'Tianhe District', data: 'tianhe' },
    '100200000004': { label: 'Zhujiang New Town', data: 'zhujiang' },
    '100200000005': { label: 'Shenzhen', data: 'shenzhen' },
    '100200000006': { label: 'Futian District', data: 'futian' },
    '100200000007': { label: 'Nanshan District', data: 'nanshan' },
    '100300000001': { label: 'Beijing', data: 'beijing' },
    '100300000002': { label: 'Chaoyang District', data: 'chaoyang' },
    '100300000003': { label: 'Haidian District', data: 'haidian' },
    '100300000004': { label: 'Xicheng District', data: 'xicheng' }
};

export const factoryMock = {
    getFactories: (params?: { name?: string; location?: string; status?: string }): Promise<Factory[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
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
                resolve(result);
            }, 300);
        });
    },

    getFactoryById: (params: { id: number }): Promise<Factory | undefined> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(factoryMockData.find(f => f.id === params.id));
            }, 200);
        });
    },

    createFactory: (params: Omit<Factory, 'id' | 'verified'>): Promise<Factory> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const maxId = Math.max(...factoryMockData.map(f => f.id));
                const newFactory: Factory = {
                    ...params,
                    id: maxId + 1,
                    verified: false
                };
                factoryMockData.push(newFactory);
                resolve(newFactory);
            }, 200);
        });
    },

    updateFactory: (params: { id: number; data: Partial<Factory> }): Promise<Factory | undefined> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const index = factoryMockData.findIndex(f => f.id === params.id);
                if (index === -1) {
                    resolve(undefined);
                } else {
                    factoryMockData[index] = { ...factoryMockData[index], ...params.data };
                    resolve(factoryMockData[index]);
                }
            }, 200);
        });
    },

    deleteFactory: (params: { id: number }): Promise<boolean> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const index = factoryMockData.findIndex(f => f.id === params.id);
                if (index === -1) {
                    resolve(false);
                } else {
                    factoryMockData.splice(index, 1);
                    resolve(true);
                }
            }, 200);
        });
    },
};

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