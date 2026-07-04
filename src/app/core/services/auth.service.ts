import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type PermissionType = 'dashboard' | 'dashboard-factory' | 'dashboard-factory-newhouse';

export interface User {
  name: string;
  email: string;
  avatar: string;
  permission: PermissionType;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private permissionSubject = new BehaviorSubject<PermissionType>('dashboard-factory-newhouse');
  public permission$ = this.permissionSubject.asObservable();

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get currentPermission(): PermissionType {
    return this.permissionSubject.value;
  }

  simulateGoogleLogin(): Promise<User> {
    return new Promise(resolve => {
      setTimeout(() => {
        const mockUser: User = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          avatar: '',
          permission: 'dashboard'
        };
        this.currentUserSubject.next(mockUser);
        resolve(mockUser);
      }, 1000);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.permissionSubject.next('dashboard');
  }

  setPermission(permission: PermissionType): void {
    this.permissionSubject.next(permission);
    const user = this.currentUserSubject.value;
    if (user) {
      this.currentUserSubject.next({ ...user, permission });
    }
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}