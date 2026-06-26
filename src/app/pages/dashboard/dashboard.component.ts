// src/app/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="space-y-6">
      <!-- Page Title -->
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p class="text-gray-600 mt-1">Welcome to your admin panel</p>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Total Users</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">1,234</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span class="pi pi-users text-blue-600 text-xl"></span>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Orders</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">567</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span class="pi pi-shopping-cart text-green-600 text-xl"></span>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Revenue</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">$45,678</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span class="pi pi-dollar text-yellow-600 text-xl"></span>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Conversion</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">23.5%</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span class="pi pi-percent text-purple-600 text-xl"></span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h2>
          <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span class="text-gray-400">Chart Placeholder</span>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-800">Order #1234</p>
                <p class="text-sm text-gray-500">$123.00</p>
              </div>
              <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completed</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-800">Order #1233</p>
                <p class="text-sm text-gray-500">$456.00</p>
              </div>
              <span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Processing</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-800">Order #1232</p>
                <p class="text-sm text-gray-500">$789.00</p>
              </div>
              <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Shipped</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent { }