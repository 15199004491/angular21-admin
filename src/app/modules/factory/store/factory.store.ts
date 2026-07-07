import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Factory } from '../models/factory.model';
import { factoryMock } from '../data/factory.mock';

interface FactoryState {
  factories: Factory[];
  loading: boolean;
  selectedFactory: Factory | null;
}

@Injectable({
  providedIn: 'root'
})
export class FactoryStore {
  private stateSubject = new BehaviorSubject<FactoryState>({
    factories: [],
    loading: false,
    selectedFactory: null
  });

  public state$: Observable<FactoryState> = this.stateSubject.asObservable();

  get factories$(): Observable<Factory[]> {
    return this.state$.pipe(map(s => s.factories));
  }

  get loading$(): Observable<boolean> {
    return this.state$.pipe(map(s => s.loading));
  }

  get selectedFactory$(): Observable<Factory | null> {
    return this.state$.pipe(map(s => s.selectedFactory));
  }

  private get currentState(): FactoryState {
    return this.stateSubject.value;
  }

  private updateState(partialState: Partial<FactoryState>): void {
    this.stateSubject.next({ ...this.currentState, ...partialState });
  }

  async loadFactories(): Promise<void> {
    this.updateState({ loading: true });
    try {
      const factories = await factoryMock.getFactories();
      this.updateState({ factories, loading: false });
    } catch {
      this.updateState({ loading: false });
    }
  }

  async addFactory(factory: Omit<Factory, 'id'>): Promise<Factory> {
    this.updateState({ loading: true });
    try {
      const newFactory = await factoryMock.createFactory(factory);
      const updatedFactories = [newFactory, ...this.currentState.factories];
      this.updateState({ factories: updatedFactories, loading: false });
      return newFactory;
    } catch {
      this.updateState({ loading: false });
      throw new Error('Failed to add factory');
    }
  }

  async updateFactory(id: number, data: Partial<Factory>): Promise<Factory> {
    this.updateState({ loading: true });
    try {
      const updatedFactory = await factoryMock.updateFactory({ id, data });
      if (!updatedFactory) {
        this.updateState({ loading: false });
        throw new Error('Factory not found');
      }
      const updatedFactories = this.currentState.factories.map(f =>
        f.id === id ? updatedFactory : f
      );
      this.updateState({ factories: updatedFactories, loading: false });
      return updatedFactory;
    } catch {
      this.updateState({ loading: false });
      throw new Error('Failed to update factory');
    }
  }

  deleteFactories(ids: number[]): void {
    const updatedFactories = this.currentState.factories.filter(f => !ids.includes(f.id));
    this.updateState({ factories: updatedFactories });
  }

  selectFactory(factory: Factory | null): void {
    this.updateState({ selectedFactory: factory });
  }
}