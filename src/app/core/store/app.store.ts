import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

export interface SharedDictionary {
  key: string;
  label: string;
  value: string | number;
  category: string;
}

export interface AppNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

export interface AppState {
  sharedDictionaries: SharedDictionary[];
  notifications: AppNotification[];
  globalFilters: Record<string, any>;
  appReady: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AppStore {
  private stateSubject = new BehaviorSubject<AppState>({
    sharedDictionaries: [],
    notifications: [],
    globalFilters: {},
    appReady: false
  });

  public state$: Observable<AppState> = this.stateSubject.asObservable();

  get sharedDictionaries$(): Observable<SharedDictionary[]> {
    return this.state$.pipe(map(s => s.sharedDictionaries));
  }

  get notifications$(): Observable<AppNotification[]> {
    return this.state$.pipe(map(s => s.notifications));
  }

  get globalFilters$(): Observable<Record<string, any>> {
    return this.state$.pipe(map(s => s.globalFilters));
  }

  get appReady$(): Observable<boolean> {
    return this.state$.pipe(map(s => s.appReady));
  }

  private get currentState(): AppState {
    return this.stateSubject.value;
  }

  private updateState(partialState: Partial<AppState>): void {
    this.stateSubject.next({ ...this.currentState, ...partialState });
  }

  async loadSharedDictionaries(): Promise<void> {
    const mockDictionaries: SharedDictionary[] = [
      { key: 'factory_status', label: 'Active', value: 'active', category: 'factory' },
      { key: 'factory_status', label: 'Maintenance', value: 'maintenance', category: 'factory' },
      { key: 'factory_status', label: 'Inactive', value: 'inactive', category: 'factory' },
      { key: 'region_type', label: 'Local', value: 'local', category: 'region' },
      { key: 'region_type', label: 'Military', value: 'military', category: 'region' },
      { key: 'estate_status', label: 'Pre-sale', value: 'pre-sale', category: 'estate' },
      { key: 'estate_status', label: 'Selling', value: 'selling', category: 'estate' },
      { key: 'estate_status', label: 'Sold Out', value: 'sold-out', category: 'estate' },
      { key: 'house_type', label: 'Apartment', value: 'apartment', category: 'house' },
      { key: 'house_type', label: 'Villa', value: 'villa', category: 'house' },
      { key: 'house_type', label: 'Townhouse', value: 'townhouse', category: 'house' },
      { key: 'resource_status', label: 'Available', value: 'available', category: 'resource' },
      { key: 'resource_status', label: 'Reserved', value: 'reserved', category: 'resource' },
      { key: 'resource_status', label: 'Sold', value: 'sold', category: 'resource' },
    ];

    await new Promise(resolve => setTimeout(resolve, 300));
    this.updateState({ sharedDictionaries: mockDictionaries });
  }

  getDictionariesByCategory(category: string): Observable<SharedDictionary[]> {
    return this.sharedDictionaries$.pipe(
      map(dictionaries => dictionaries.filter(d => d.category === category))
    );
  }

  addNotification(notification: Omit<AppNotification, 'id' | 'timestamp'>): void {
    const newNotification: AppNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    const updatedNotifications = [...this.currentState.notifications, newNotification];
    this.updateState({ notifications: updatedNotifications });

    setTimeout(() => {
      this.removeNotification(newNotification.id);
    }, 5000);
  }

  removeNotification(id: string): void {
    const updatedNotifications = this.currentState.notifications.filter(n => n.id !== id);
    this.updateState({ notifications: updatedNotifications });
  }

  clearAllNotifications(): void {
    this.updateState({ notifications: [] });
  }

  setGlobalFilter(key: string, value: any): void {
    const updatedFilters = { ...this.currentState.globalFilters, [key]: value };
    this.updateState({ globalFilters: updatedFilters });
  }

  removeGlobalFilter(key: string): void {
    const updatedFilters = { ...this.currentState.globalFilters };
    delete updatedFilters[key];
    this.updateState({ globalFilters: updatedFilters });
  }

  clearGlobalFilters(): void {
    this.updateState({ globalFilters: {} });
  }

  setAppReady(ready: boolean): void {
    this.updateState({ appReady: ready });
  }

  initApp(): Promise<void> {
    return new Promise(async resolve => {
      await this.loadSharedDictionaries();
      this.setAppReady(true);
      resolve();
    });
  }
}