export interface PropertyDeveloper {
  id: number;
  name: string;
  logo: string;
  establishedYear: number;
  projectsCount: number;
  status: 'active' | 'inactive';
  contact: string;
  address: string;
}

export interface RealEstate {
  id: number;
  name: string;
  developerId: number;
  developerName: string;
  location: string;
  price: number;
  units: number;
  soldUnits: number;
  status: 'pre-sale' | 'selling' | 'sold-out';
  completionDate: string;
  description: string;
}

export interface HousingResource {
  id: number;
  estateId: number;
  estateName: string;
  type: 'apartment' | 'villa' | 'townhouse';
  floor: number;
  area: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  status: 'available' | 'reserved' | 'sold';
}

export interface Unoccupied {
  id: number;
  estateId: number;
  estateName: string;
  resourceId: number;
  type: 'apartment' | 'villa' | 'townhouse';
  area: number;
  price: number;
  unoccupiedDays: number;
  reason: string;
}