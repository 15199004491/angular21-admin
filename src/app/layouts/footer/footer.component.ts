// src/app/components/layout/footer/footer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="ml-64 bg-white border-t border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">© 2026 Jia Feng Admin Panel. All rights reserved.</span>
        <span class="text-sm text-gray-500">Version 1.0.0</span>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `]
})
export class FooterComponent { }