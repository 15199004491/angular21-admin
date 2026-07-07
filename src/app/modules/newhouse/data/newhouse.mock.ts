import { PropertyDeveloper, RealEstate, HousingResource, Unoccupied } from '../models/newhouse.model';

export const propertyDeveloperMockData: PropertyDeveloper[] = [
  { id: 1, name: 'Evergrande Group', logo: '', establishedYear: 1996, projectsCount: 500, status: 'active', contact: '+86 20 1234 5678', address: 'Guangzhou, Guangdong' },
  { id: 2, name: 'Vanke Group', logo: '', establishedYear: 1984, projectsCount: 800, status: 'active', contact: '+86 755 2345 6789', address: 'Shenzhen, Guangdong' },
  { id: 3, name: 'Country Garden', logo: '', establishedYear: 1992, projectsCount: 1000, status: 'active', contact: '+86 757 3456 7890', address: 'Foshan, Guangdong' },
  { id: 4, name: 'China Overseas Land', logo: '', establishedYear: 1979, projectsCount: 300, status: 'active', contact: '+86 10 4567 8901', address: 'Beijing' },
  { id: 5, name: 'Poly Developments', logo: '', establishedYear: 1992, projectsCount: 400, status: 'active', contact: '+86 20 5678 9012', address: 'Guangzhou, Guangdong' },
  { id: 6, name: 'Greenland Group', logo: '', establishedYear: 1992, projectsCount: 600, status: 'inactive', contact: '+86 21 6789 0123', address: 'Shanghai' },
];

export const realEstateMockData: RealEstate[] = [
  { id: 1, name: 'Evergrande City', developerId: 1, developerName: 'Evergrande Group', location: 'Guangzhou', price: 25000, units: 2000, soldUnits: 1850, status: 'selling', completionDate: '2024-12-31', description: 'Large-scale residential community' },
  { id: 2, name: 'Vanke Central Park', developerId: 2, developerName: 'Vanke Group', location: 'Shenzhen', price: 65000, units: 800, soldUnits: 720, status: 'selling', completionDate: '2025-06-30', description: 'Premium residential project' },
  { id: 3, name: 'Country Garden Villa', developerId: 3, developerName: 'Country Garden', location: 'Foshan', price: 18000, units: 1500, soldUnits: 1500, status: 'sold-out', completionDate: '2023-06-30', description: 'Garden-style residential area' },
  { id: 4, name: 'COLI Plaza', developerId: 4, developerName: 'China Overseas Land', location: 'Beijing', price: 85000, units: 500, soldUnits: 380, status: 'pre-sale', completionDate: '2026-03-31', description: 'Luxury apartments in CBD' },
  { id: 5, name: 'Poly Mansion', developerId: 5, developerName: 'Poly Developments', location: 'Guangzhou', price: 42000, units: 600, soldUnits: 450, status: 'selling', completionDate: '2024-09-30', description: 'High-end residential towers' },
];

export const housingResourceMockData: HousingResource[] = [
  { id: 1, estateId: 1, estateName: 'Evergrande City', type: 'apartment', floor: 12, area: 120, price: 3000000, bedrooms: 3, bathrooms: 2, status: 'available' },
  { id: 2, estateId: 1, estateName: 'Evergrande City', type: 'apartment', floor: 8, area: 95, price: 2375000, bedrooms: 2, bathrooms: 1, status: 'sold' },
  { id: 3, estateId: 2, estateName: 'Vanke Central Park', type: 'apartment', floor: 25, area: 150, price: 9750000, bedrooms: 4, bathrooms: 3, status: 'available' },
  { id: 4, estateId: 2, estateName: 'Vanke Central Park', type: 'villa', floor: 3, area: 300, price: 39000000, bedrooms: 5, bathrooms: 4, status: 'reserved' },
  { id: 5, estateId: 4, estateName: 'COLI Plaza', type: 'apartment', floor: 35, area: 180, price: 15300000, bedrooms: 4, bathrooms: 3, status: 'available' },
];

export const unoccupiedMockData: Unoccupied[] = [
  { id: 1, estateId: 1, estateName: 'Evergrande City', resourceId: 1, type: 'apartment', area: 120, price: 3000000, unoccupiedDays: 15, reason: 'Waiting for decoration' },
  { id: 2, estateId: 2, estateName: 'Vanke Central Park', resourceId: 3, type: 'apartment', area: 150, price: 9750000, unoccupiedDays: 45, reason: 'Owner abroad' },
  { id: 3, estateId: 4, estateName: 'COLI Plaza', resourceId: 5, type: 'apartment', area: 180, price: 15300000, unoccupiedDays: 7, reason: 'Recently purchased' },
];

export const propertyDeveloperMock = {
  getDevelopers: (params?: { name?: string; status?: string }): Promise<PropertyDeveloper[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        let result = [...propertyDeveloperMockData];
        if (params?.name) {
          const name = params.name.toLowerCase();
          result = result.filter(d => d.name.toLowerCase().includes(name));
        }
        if (params?.status) {
          result = result.filter(d => d.status === params.status);
        }
        resolve(result);
      }, 300);
    });
  },

  getDeveloperById: (params: { id: number }): Promise<PropertyDeveloper | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(propertyDeveloperMockData.find(d => d.id === params.id));
      }, 200);
    });
  },

  createDeveloper: (params: Omit<PropertyDeveloper, 'id'>): Promise<PropertyDeveloper> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const maxId = Math.max(...propertyDeveloperMockData.map(d => d.id));
        const newDeveloper: PropertyDeveloper = {
          ...params,
          id: maxId + 1
        };
        propertyDeveloperMockData.push(newDeveloper);
        resolve(newDeveloper);
      }, 200);
    });
  },

  updateDeveloper: (params: { id: number; data: Partial<PropertyDeveloper> }): Promise<PropertyDeveloper | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = propertyDeveloperMockData.findIndex(d => d.id === params.id);
        if (index === -1) {
          resolve(undefined);
        } else {
          propertyDeveloperMockData[index] = { ...propertyDeveloperMockData[index], ...params.data };
          resolve(propertyDeveloperMockData[index]);
        }
      }, 200);
    });
  },

  deleteDeveloper: (params: { id: number }): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = propertyDeveloperMockData.findIndex(d => d.id === params.id);
        if (index === -1) {
          resolve(false);
        } else {
          propertyDeveloperMockData.splice(index, 1);
          resolve(true);
        }
      }, 200);
    });
  },
};

export const realEstateMock = {
  getEstates: (params?: { name?: string; location?: string; status?: string }): Promise<RealEstate[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        let result = [...realEstateMockData];
        if (params?.name) {
          const name = params.name.toLowerCase();
          result = result.filter(e => e.name.toLowerCase().includes(name));
        }
        if (params?.location) {
          result = result.filter(e => e.location === params.location);
        }
        if (params?.status) {
          result = result.filter(e => e.status === params.status);
        }
        resolve(result);
      }, 300);
    });
  },

  getEstateById: (params: { id: number }): Promise<RealEstate | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(realEstateMockData.find(e => e.id === params.id));
      }, 200);
    });
  },

  createEstate: (params: Omit<RealEstate, 'id'>): Promise<RealEstate> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const maxId = Math.max(...realEstateMockData.map(e => e.id));
        const newEstate: RealEstate = {
          ...params,
          id: maxId + 1
        };
        realEstateMockData.push(newEstate);
        resolve(newEstate);
      }, 200);
    });
  },

  updateEstate: (params: { id: number; data: Partial<RealEstate> }): Promise<RealEstate | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = realEstateMockData.findIndex(e => e.id === params.id);
        if (index === -1) {
          resolve(undefined);
        } else {
          realEstateMockData[index] = { ...realEstateMockData[index], ...params.data };
          resolve(realEstateMockData[index]);
        }
      }, 200);
    });
  },

  deleteEstate: (params: { id: number }): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = realEstateMockData.findIndex(e => e.id === params.id);
        if (index === -1) {
          resolve(false);
        } else {
          realEstateMockData.splice(index, 1);
          resolve(true);
        }
      }, 200);
    });
  },
};

export const housingResourceMock = {
  getResources: (params?: { estateId?: number; type?: string; status?: string }): Promise<HousingResource[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        let result = [...housingResourceMockData];
        if (params?.estateId) {
          result = result.filter(r => r.estateId === params.estateId);
        }
        if (params?.type) {
          result = result.filter(r => r.type === params.type);
        }
        if (params?.status) {
          result = result.filter(r => r.status === params.status);
        }
        resolve(result);
      }, 300);
    });
  },

  getResourceById: (params: { id: number }): Promise<HousingResource | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(housingResourceMockData.find(r => r.id === params.id));
      }, 200);
    });
  },

  createResource: (params: Omit<HousingResource, 'id'>): Promise<HousingResource> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const maxId = Math.max(...housingResourceMockData.map(r => r.id));
        const newResource: HousingResource = {
          ...params,
          id: maxId + 1
        };
        housingResourceMockData.push(newResource);
        resolve(newResource);
      }, 200);
    });
  },

  updateResource: (params: { id: number; data: Partial<HousingResource> }): Promise<HousingResource | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = housingResourceMockData.findIndex(r => r.id === params.id);
        if (index === -1) {
          resolve(undefined);
        } else {
          housingResourceMockData[index] = { ...housingResourceMockData[index], ...params.data };
          resolve(housingResourceMockData[index]);
        }
      }, 200);
    });
  },

  deleteResource: (params: { id: number }): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = housingResourceMockData.findIndex(r => r.id === params.id);
        if (index === -1) {
          resolve(false);
        } else {
          housingResourceMockData.splice(index, 1);
          resolve(true);
        }
      }, 200);
    });
  },
};

export const unoccupiedMock = {
  getUnoccupied: (params?: { estateId?: number; days?: number }): Promise<Unoccupied[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        let result = [...unoccupiedMockData];
        if (params?.estateId) {
          result = result.filter(u => u.estateId === params.estateId);
        }
        if (params?.days !== undefined) {
          result = result.filter(u => u.unoccupiedDays >= params.days!);
        }
        resolve(result);
      }, 300);
    });
  },

  getUnoccupiedById: (params: { id: number }): Promise<Unoccupied | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(unoccupiedMockData.find(u => u.id === params.id));
      }, 200);
    });
  },

  updateUnoccupied: (params: { id: number; data: Partial<Unoccupied> }): Promise<Unoccupied | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = unoccupiedMockData.findIndex(u => u.id === params.id);
        if (index === -1) {
          resolve(undefined);
        } else {
          unoccupiedMockData[index] = { ...unoccupiedMockData[index], ...params.data };
          resolve(unoccupiedMockData[index]);
        }
      }, 200);
    });
  },
};