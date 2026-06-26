// src/app/components/layout/header/header.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="flex items-center justify-between px-6 h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <span class="text-xl font-bold text-blue-600">Admin Panel</span>
        </div>
        
        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span class="pi pi-bell text-gray-600"></span>
          </button>
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-blue-600 font-semibold">U</span>
            </div>
            <span class="text-sm font-medium text-gray-700">User Name</span>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }
  `]
})
export class HeaderComponent { }