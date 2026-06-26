// src/app/services/dashboard.service.ts
import { Injectable } from '@angular/core';

export interface StatCard {
  id: string;
  title: string;
  value: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  amount: string;
  status: 'Completed' | 'Processing' | 'Shipped';
  statusColor: string;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private stats = [
    { id: '1', title: 'Total Users', value: '1,234', icon: 'pi pi-users', bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
    { id: '2', title: 'Orders', value: '567', icon: 'pi pi-shopping-cart', bgColor: 'bg-green-100', iconColor: 'text-green-600' },
    { id: '3', title: 'Revenue', value: '$45,678', icon: 'pi pi-dollar', bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
    { id: '4', title: 'Conversion', value: '23.5%', icon: 'pi pi-percent', bgColor: 'bg-purple-100', iconColor: 'text-purple-600' }
  ];

  private recentOrders = [
    { id: '1', orderNumber: 'Order #1234', amount: '$123.00', status: 'Completed' as const, statusColor: 'bg-green-100 text-green-800' },
    { id: '2', orderNumber: 'Order #1233', amount: '$456.00', status: 'Processing' as const, statusColor: 'bg-yellow-100 text-yellow-800' },
    { id: '3', orderNumber: 'Order #1232', amount: '$789.00', status: 'Shipped' as const, statusColor: 'bg-blue-100 text-blue-800' }
  ];

  getStats() {
    return Promise.resolve([...this.stats]);
  }

  getRecentOrders() {
    return Promise.resolve([...this.recentOrders]);
  }
}