import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { factoryRoutes } from './modules/factory/factory.routes';
import { newhouseRoutes } from './modules/newhouse/newhouse.routes';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'factory', children: factoryRoutes },
      { path: 'newhouse', children: newhouseRoutes },
    ]
  },
];