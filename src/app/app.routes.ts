import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FactoryListComponent } from './modules/factory/pages/factory-list/factory-list.component';
import { FactoryOrdersComponent } from './modules/factory/pages/factory-orders/factory-orders.component';
import { RegionalComponent } from './modules/factory/pages/regional/regional.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'factory/list', component: FactoryListComponent },
  { path: 'factory/orders', component: FactoryOrdersComponent },
  { path: 'factory/regions', component: RegionalComponent },
];