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
    { id: '1', title: 'Total Users', value: '1,234', icon: 'pi pi-users', bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50', iconColor: 'text-emerald-600' },
    { id: '2', title: 'Orders', value: '567', icon: 'pi pi-shopping-cart', bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-50', iconColor: 'text-teal-600' },
    { id: '3', title: 'Revenue', value: '$45,678', icon: 'pi pi-dollar', bgColor: 'bg-gradient-to-br from-cyan-50 to-green-50', iconColor: 'text-cyan-600' },
    { id: '4', title: 'Conversion', value: '23.5%', icon: 'pi pi-percent', bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50', iconColor: 'text-green-600' }
  ];

  private recentOrders = [
    { id: '1', orderNumber: 'Order #1234', amount: '$123.00', status: 'Completed' as const, statusColor: 'bg-green-100 text-green-800' },
    { id: '2', orderNumber: 'Order #1233', amount: '$456.00', status: 'Processing' as const, statusColor: 'bg-yellow-100 text-yellow-800' },
    { id: '3', orderNumber: 'Order #1232', amount: '$789.00', status: 'Shipped' as const, statusColor: 'bg-cyan-100 text-cyan-800' }
  ];

  getStats() {
    return Promise.resolve([...this.stats]);
  }

  getRecentOrders() {
    return Promise.resolve([...this.recentOrders]);
  }
}