import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { AuthService, PermissionType } from '@/app/core/services/auth.service';

interface PermissionOption {
  label: string;
  value: PermissionType;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule],
  template: `
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="flex items-center justify-between px-6 h-16">
        <div class="flex items-center space-x-4">
          <span class="text-xl font-bold text-blue-600">Admin Panel</span>
        </div>
        
        <div class="absolute left-72 flex items-center space-x-3">
          <span class="text-sm font-medium text-gray-600">Permission Simulation:</span>
          <p-select 
            [(ngModel)]="selectedPermission" 
            [options]="permissionOptions" 
            [style]="{ width: '320px' }"
            placeholder="Select Permission"
            (onChange)="onPermissionChange($event)"
          ></p-select>
        </div>
        
        <div class="flex items-center space-x-4">
          <button class="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span class="pi pi-bell text-gray-600"></span>
          </button>
          
          <div class="relative">
            <button 
              class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              (click)="toggleUserDropdown()"
            >
              <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span class="text-emerald-600 font-semibold">{{ userInitial }}</span>
              </div>
              <span class="text-sm font-medium text-gray-700">{{ userName }}</span>
              <span class="pi pi-chevron-down text-gray-400 text-sm"></span>
            </button>
            
            @if (isUserDropdownOpen) {
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
export class HeaderComponent implements OnInit {
  isUserDropdownOpen = false;
  userName = 'User Name';
  selectedPermission: PermissionType = 'dashboard-factory-newhouse';

  permissionOptions: PermissionOption[] = [
    { label: 'Dashboard', value: 'dashboard' },
    { label: 'Dashboard & Factory', value: 'dashboard-factory' },
    { label: 'Dashboard & Factory & New House', value: 'dashboard-factory-newhouse' }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userName = user.name;
        this.selectedPermission = user.permission;
      }
    });

    this.authService.permission$.subscribe(permission => {
      this.selectedPermission = permission;
    });
  }

  get userInitial(): string {
    return this.userName ? this.userName.charAt(0).toUpperCase() : 'U';
  }

  toggleUserDropdown(): void {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  onPermissionChange(event: { value: PermissionType }): void {
    this.authService.setPermission(event.value);
  }

  handleEditProfile(): void {
    console.log('Edit Profile clicked');
    this.isUserDropdownOpen = false;
  }

  handleLogout(): void {
    this.authService.logout();
    this.isUserDropdownOpen = false;
  }
}