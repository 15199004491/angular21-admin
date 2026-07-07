import { Routes } from '@angular/router';
import { PropertyDevelopersComponent } from './pages/property-developers/property-developers.component';
import { RealEstateComponent } from './pages/real-estate/real-estate.component';
import { HousingResourceComponent } from './pages/housing-resource/housing-resource.component';
import { NewHouseRegionalComponent } from './pages/regional/regional.component';
import { UnoccupiedComponent } from './pages/unoccupied/unoccupied.component';

export const newhouseRoutes: Routes = [
  { path: 'property-developers', component: PropertyDevelopersComponent },
  { path: 'real-estate', component: RealEstateComponent },
  { path: 'housing-resource', component: HousingResourceComponent },
  { path: 'regional', component: NewHouseRegionalComponent },
  { path: 'unoccupied', component: UnoccupiedComponent },
  { path: '', redirectTo: 'property-developers', pathMatch: 'full' }
];