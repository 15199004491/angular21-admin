import { PropertyDeveloper, RealEstate, HousingResource, Unoccupied } from '../models/newhouse.model';

export function formatPrice(price: number): string {
  if (price >= 10000) {
    return `${(price / 10000).toFixed(2)} 万`;
  }
  return price.toLocaleString();
}

export function formatArea(area: number): string {
  return `${area} m²`;
}

export function formatEstateStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'pre-sale': 'Pre-sale',
    selling: 'Selling',
    'sold-out': 'Sold Out'
  };
  return statusMap[status] || status;
}

export function getEstateStatusClass(status: string): string {
  const classMap: Record<string, string> = {
    'pre-sale': 'bg-blue-100 text-blue-800',
    selling: 'bg-green-100 text-green-800',
    'sold-out': 'bg-gray-100 text-gray-800'
  };
  return classMap[status] || 'bg-gray-100 text-gray-800';
}

export function formatHouseType(type: string): string {
  const typeMap: Record<string, string> = {
    apartment: 'Apartment',
    villa: 'Villa',
    townhouse: 'Townhouse'
  };
  return typeMap[type] || type;
}

export function formatResourceStatus(status: string): string {
  const statusMap: Record<string, string> = {
    available: 'Available',
    reserved: 'Reserved',
    sold: 'Sold'
  };
  return statusMap[status] || status;
}

export function getResourceStatusClass(status: string): string {
  const classMap: Record<string, string> = {
    available: 'bg-green-100 text-green-800',
    reserved: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-gray-100 text-gray-800'
  };
  return classMap[status] || 'bg-gray-100 text-gray-800';
}

export function calculateSoldRate(total: number, sold: number): number {
  if (total === 0) return 0;
  return Math.round((sold / total) * 100);
}

export function formatDeveloperStatus(status: string): string {
  return status === 'active' ? 'Active' : 'Inactive';
}