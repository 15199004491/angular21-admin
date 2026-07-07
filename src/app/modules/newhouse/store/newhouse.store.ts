import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { PropertyDeveloper, RealEstate, HousingResource, Unoccupied } from '../models/newhouse.model';
import { propertyDeveloperMock, realEstateMock, housingResourceMock, unoccupiedMock } from '../data/newhouse.mock';

interface NewhouseState {
  developers: PropertyDeveloper[];
  estates: RealEstate[];
  resources: HousingResource[];
  unoccupied: Unoccupied[];
  loading: boolean;
  selectedDeveloper: PropertyDeveloper | null;
  selectedEstate: RealEstate | null;
}

@Injectable({
  providedIn: 'root'
})
export class NewhouseStore {
  private stateSubject = new BehaviorSubject<NewhouseState>({
    developers: [],
    estates: [],
    resources: [],
    unoccupied: [],
    loading: false,
    selectedDeveloper: null,
    selectedEstate: null
  });

  public state$: Observable<NewhouseState> = this.stateSubject.asObservable();

  get developers$(): Observable<PropertyDeveloper[]> {
    return this.state$.pipe(map(s => s.developers));
  }

  get estates$(): Observable<RealEstate[]> {
    return this.state$.pipe(map(s => s.estates));
  }

  get resources$(): Observable<HousingResource[]> {
    return this.state$.pipe(map(s => s.resources));
  }

  get unoccupied$(): Observable<Unoccupied[]> {
    return this.state$.pipe(map(s => s.unoccupied));
  }

  get loading$(): Observable<boolean> {
    return this.state$.pipe(map(s => s.loading));
  }

  get selectedDeveloper$(): Observable<PropertyDeveloper | null> {
    return this.state$.pipe(map(s => s.selectedDeveloper));
  }

  get selectedEstate$(): Observable<RealEstate | null> {
    return this.state$.pipe(map(s => s.selectedEstate));
  }

  private get currentState(): NewhouseState {
    return this.stateSubject.value;
  }

  private updateState(partialState: Partial<NewhouseState>): void {
    this.stateSubject.next({ ...this.currentState, ...partialState });
  }

  async loadDevelopers(): Promise<void> {
    this.updateState({ loading: true });
    try {
      const developers = await propertyDeveloperMock.getDevelopers();
      this.updateState({ developers, loading: false });
    } catch {
      this.updateState({ loading: false });
    }
  }

  async loadEstates(): Promise<void> {
    this.updateState({ loading: true });
    try {
      const estates = await realEstateMock.getEstates();
      this.updateState({ estates, loading: false });
    } catch {
      this.updateState({ loading: false });
    }
  }

  async loadResources(): Promise<void> {
    this.updateState({ loading: true });
    try {
      const resources = await housingResourceMock.getResources();
      this.updateState({ resources, loading: false });
    } catch {
      this.updateState({ loading: false });
    }
  }

  async loadUnoccupied(): Promise<void> {
    this.updateState({ loading: true });
    try {
      const unoccupied = await unoccupiedMock.getUnoccupied();
      this.updateState({ unoccupied, loading: false });
    } catch {
      this.updateState({ loading: false });
    }
  }

  async addDeveloper(developer: Omit<PropertyDeveloper, 'id'>): Promise<PropertyDeveloper> {
    this.updateState({ loading: true });
    try {
      const newDeveloper = await propertyDeveloperMock.createDeveloper(developer);
      const updatedDevelopers = [newDeveloper, ...this.currentState.developers];
      this.updateState({ developers: updatedDevelopers, loading: false });
      return newDeveloper;
    } catch {
      this.updateState({ loading: false });
      throw new Error('Failed to add developer');
    }
  }

  async updateDeveloper(id: number, data: Partial<PropertyDeveloper>): Promise<PropertyDeveloper> {
    this.updateState({ loading: true });
    try {
      const updatedDeveloper = await propertyDeveloperMock.updateDeveloper({ id, data });
      if (!updatedDeveloper) {
        this.updateState({ loading: false });
        throw new Error('Developer not found');
      }
      const updatedDevelopers = this.currentState.developers.map(d =>
        d.id === id ? updatedDeveloper : d
      );
      this.updateState({ developers: updatedDevelopers, loading: false });
      return updatedDeveloper;
    } catch {
      this.updateState({ loading: false });
      throw new Error('Failed to update developer');
    }
  }

  deleteDevelopers(ids: number[]): void {
    const updatedDevelopers = this.currentState.developers.filter(d => !ids.includes(d.id));
    this.updateState({ developers: updatedDevelopers });
  }

  async addEstate(estate: Omit<RealEstate, 'id'>): Promise<RealEstate> {
    this.updateState({ loading: true });
    try {
      const newEstate = await realEstateMock.createEstate(estate);
      const updatedEstates = [newEstate, ...this.currentState.estates];
      this.updateState({ estates: updatedEstates, loading: false });
      return newEstate;
    } catch {
      this.updateState({ loading: false });
      throw new Error('Failed to add estate');
    }
  }

  async updateEstate(id: number, data: Partial<RealEstate>): Promise<RealEstate> {
    this.updateState({ loading: true });
    try {
      const updatedEstate = await realEstateMock.updateEstate({ id, data });
      if (!updatedEstate) {
        this.updateState({ loading: false });
        throw new Error('Estate not found');
      }
      const updatedEstates = this.currentState.estates.map(e =>
        e.id === id ? updatedEstate : e
      );
      this.updateState({ estates: updatedEstates, loading: false });
      return updatedEstate;
    } catch {
      this.updateState({ loading: false });
      throw new Error('Failed to update estate');
    }
  }

  deleteEstates(ids: number[]): void {
    const updatedEstates = this.currentState.estates.filter(e => !ids.includes(e.id));
    this.updateState({ estates: updatedEstates });
  }

  async addResource(resource: Omit<HousingResource, 'id'>): Promise<HousingResource> {
    this.updateState({ loading: true });
    try {
      const newResource = await housingResourceMock.createResource(resource);
      const updatedResources = [newResource, ...this.currentState.resources];
      this.updateState({ resources: updatedResources, loading: false });
      return newResource;
    } catch {
      this.updateState({ loading: false });
      throw new Error('Failed to add resource');
    }
  }

  async updateResource(id: number, data: Partial<HousingResource>): Promise<HousingResource> {
    this.updateState({ loading: true });
    try {
      const updatedResource = await housingResourceMock.updateResource({ id, data });
      if (!updatedResource) {
        this.updateState({ loading: false });
        throw new Error('Resource not found');
      }
      const updatedResources = this.currentState.resources.map(r =>
        r.id === id ? updatedResource : r
      );
      this.updateState({ resources: updatedResources, loading: false });
      return updatedResource;
    } catch {
      this.updateState({ loading: false });
      throw new Error('Failed to update resource');
    }
  }

  deleteResources(ids: number[]): void {
    const updatedResources = this.currentState.resources.filter(r => !ids.includes(r.id));
    this.updateState({ resources: updatedResources });
  }

  selectDeveloper(developer: PropertyDeveloper | null): void {
    this.updateState({ selectedDeveloper: developer });
  }

  selectEstate(estate: RealEstate | null): void {
    this.updateState({ selectedEstate: estate });
  }
}