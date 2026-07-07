import { Factory, Region } from '../models/factory.model';

export function formatFactoryStatus(status: string): string {
  const statusMap: Record<string, string> = {
    active: 'Active',
    maintenance: 'Maintenance',
    inactive: 'Inactive'
  };
  return statusMap[status] || status;
}

export function getFactoryStatusClass(status: string): string {
  const classMap: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-red-100 text-red-800'
  };
  return classMap[status] || 'bg-gray-100 text-gray-800';
}

export function formatEmployeeCount(count: number): string {
  return count.toLocaleString();
}

export function filterFactoriesByRegion(factories: Factory[], regionCode: string): Factory[] {
  if (!regionCode) return factories;
  return factories.filter(f => f.location.toLowerCase().includes(regionCode.toLowerCase()));
}

export function getRegionTypeLabel(type: string): string {
  return type === 'military' ? 'Military' : 'Local';
}

export function getRegionTypeClass(type: string): string {
  return type === 'military' ? 'text-green-600' : 'text-gray-900';
}