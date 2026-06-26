// src/app/components/layout/header/header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="flex items-center justify-between px-6 h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <span class="text-xl font-bold text-blue-600">Admin Panel</span>
        </div>
        
        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <!-- Notification Button -->
          <button class="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span class="pi pi-bell text-gray-600"></span>
          </button>
          
          <!-- User Profile Dropdown -->
          <div class="relative">
            <button 
              class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              (click)="toggleDropdown()"
            >
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-blue-600 font-semibold">U</span>
              </div>
              <span class="text-sm font-medium text-gray-700">User Name</span>
              <span class="pi pi-chevron-down text-gray-400 text-sm"></span>
            </button>
            
            <!-- Dropdown Menu -->
            @if (isDropdownOpen) {
              <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button 
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  (click)="handleEditProfile()"
                >
                  <span class="pi pi-user mr-2"></span>
                  Edit Profile
                </button>
                <button 
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  (click)="handleLogout()"
                >
                  <span class="pi pi-sign-out mr-2"></span>
                  Logout
                </button>
              </div>
            }
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
export class HeaderComponent {
  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  handleEditProfile(): void {
    console.log('Edit Profile clicked');
    this.isDropdownOpen = false;
    // Add your edit profile logic here
  }

  handleLogout(): void {
    console.log('Logout clicked');
    this.isDropdownOpen = false;
    // Add your logout logic here
  }
}