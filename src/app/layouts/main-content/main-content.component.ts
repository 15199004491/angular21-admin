// src/app/components/layout/main-content/main-content.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [],
  template: `
    <main class="ml-64 pt-16 min-h-screen bg-gray-50 p-6">
      <ng-content></ng-content>
    </main>
  `,
  styles: []
})
export class MainContentComponent { }