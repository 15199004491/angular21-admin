// src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>
  `,
  styles: []
})
export class AppComponent { }