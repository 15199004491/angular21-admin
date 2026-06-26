// src/app/components/layout/sidebar/sidebar.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  template: `
    <aside class="bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-0">
      <!-- Logo -->
      <div class="h-16 flex items-center justify-center border-b border-gray-700">
        <span class="text-xl font-bold text-blue-400">Admin</span>
      </div>
      
      <!-- Menu -->
      <nav class="p-4">
        <ul class="space-y-2">
          <li>
            <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-600 text-white">
              <span class="pi pi-home"></span>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <span class="pi pi-users"></span>
              <span>Users</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <span class="pi pi-file-text"></span>
              <span>Orders</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <span class="pi pi-chart-bar"></span>
              <span>Reports</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <span class="pi pi-settings"></span>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  `,
  styles: [`
    aside {
      top: 64px; /* Match header height */
    }
  `]
})
export class SidebarComponent { }