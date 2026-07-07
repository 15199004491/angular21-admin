import { Routes } from '@angular/router';
import { FactoryListComponent } from './pages/factory-list/factory-list.component';
import { FactoryOrdersComponent } from './pages/factory-orders/factory-orders.component';
import { RegionalComponent } from './pages/regional/regional.component';

export const factoryRoutes: Routes = [
  { path: 'list', component: FactoryListComponent },
  { path: 'orders', component: FactoryOrdersComponent },
  { path: 'regions', component: RegionalComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];