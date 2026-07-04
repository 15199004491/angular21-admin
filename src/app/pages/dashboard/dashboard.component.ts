// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, StatCard, Order } from '@/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  providers: [DashboardService],
  template: `
    <div class="py-6 space-y-6">
      <div>
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p class="text-gray-500 mt-2">Welcome back! Here's what's happening with your business today.</p>
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-sm text-gray-400">{{ currentDate }}</span>
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (stat of stats; track stat.id) {
          <div class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 group cursor-pointer">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">{{ stat.title }}</p>
                <p class="text-3xl font-bold text-gray-800 mt-2">{{ stat.value }}</p>
              </div>
              <div [class]="['w-14 h-14', stat.bgColor, 'rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300']">
                <span [class]="['pi', stat.icon, stat.iconColor, 'text-2xl']"></span>
              </div>
            </div>
          </div>
        }
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-gray-800">Sales Overview</h2>
            <div class="flex items-center space-x-2">
              <button class="px-3 py-1.5 text-sm font-medium bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors">Week</button>
              <button class="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">Month</button>
              <button class="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">Year</button>
            </div>
          </div>
          <div class="h-72 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-xl flex items-center justify-center">
            <div class="text-center">
              <div class="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4">
                <span class="pi pi-chart-bar text-3xl text-emerald-600"></span>
              </div>
              <p class="text-gray-500">Interactive Chart</p>
              <p class="text-sm text-gray-400 mt-1">Data visualization coming soon</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-gray-800">Recent Orders</h2>
            <a href="#" class="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View all</a>
          </div>
          <div class="space-y-4">
            @for (order of recentOrders; track order.id) {
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                    <span class="pi pi-shopping-bag text-emerald-600"></span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">{{ order.orderNumber }}</p>
                    <p class="text-sm text-gray-500">{{ order.amount }}</p>
                  </div>
                </div>
                <span [class]="['px-3 py-1.5 text-xs font-medium rounded-full', order.statusColor]">
                  {{ order.status }}
                </span>
              </div>
            }
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-6">Top Products</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <span class="pi pi-star text-emerald-600"></span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">Premium Widget</p>
                  <p class="text-sm text-gray-500">1,234 sales</p>
                </div>
              </div>
              <span class="text-lg font-bold text-emerald-600">$24,680</span>
            </div>
            <div class="flex items-center justify-between p-4 bg-teal-50 rounded-xl">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <span class="pi pi-award text-teal-600"></span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">Basic Plan</p>
                  <p class="text-sm text-gray-500">892 sales</p>
                </div>
              </div>
              <span class="text-lg font-bold text-teal-600">$17,840</span>
            </div>
            <div class="flex items-center justify-between p-4 bg-cyan-50 rounded-xl">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <span class="pi pi-trophy text-cyan-600"></span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">Enterprise Suite</p>
                  <p class="text-sm text-gray-500">234 sales</p>
                </div>
              </div>
              <span class="text-lg font-bold text-cyan-600">$46,800</span>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div class="grid grid-cols-2 gap-4">
            <button class="flex flex-col items-center p-4 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <span class="pi pi-plus-circle text-3xl mb-2"></span>
              <span class="text-sm font-medium">Add Product</span>
            </button>
            <button class="flex flex-col items-center p-4 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <span class="pi pi-refresh text-3xl mb-2"></span>
              <span class="text-sm font-medium">Sync Data</span>
            </button>
            <button class="flex flex-col items-center p-4 bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <span class="pi pi-download text-3xl mb-2"></span>
              <span class="text-sm font-medium">Export Report</span>
            </button>
            <button class="flex flex-col items-center p-4 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <span class="pi pi-settings text-3xl mb-2"></span>
              <span class="text-sm font-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  stats: StatCard[] = [];
  recentOrders: Order[] = [];

  get currentDate(): string {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    this.stats = await this.dashboardService.getStats();
    this.recentOrders = await this.dashboardService.getRecentOrders();
    this.cdr.detectChanges();
  }
}