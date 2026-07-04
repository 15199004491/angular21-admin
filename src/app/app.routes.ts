import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FactoryListComponent } from './modules/factory/pages/factory-list/factory-list.component';
import { FactoryOrdersComponent } from './modules/factory/pages/factory-orders/factory-orders.component';
import { RegionalComponent } from './modules/factory/pages/regional/regional.component';
import { PropertyDevelopersComponent } from './modules/newhouse/pages/property-developers/property-developers.component';
import { RealEstateComponent } from './modules/newhouse/pages/real-estate/real-estate.component';
import { NewHouseRegionalComponent } from './modules/newhouse/pages/regional/regional.component';
import { HousingResourceComponent } from './modules/newhouse/pages/housing-resource/housing-resource.component';
import { UnoccupiedComponent } from './modules/newhouse/pages/unoccupied/unoccupied.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'factory/list', component: FactoryListComponent },
      { path: 'factory/orders', component: FactoryOrdersComponent },
      { path: 'factory/regions', component: RegionalComponent },
      { path: 'newhouse/property-developers', component: PropertyDevelopersComponent },
      { path: 'newhouse/real-estate', component: RealEstateComponent },
      { path: 'newhouse/regional', component: NewHouseRegionalComponent },
      { path: 'newhouse/housing-resource', component: HousingResourceComponent },
      { path: 'newhouse/unoccupied', component: UnoccupiedComponent },
    ]
  },
];