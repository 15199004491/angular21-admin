import { TestBed } from '@angular/core/testing';
import { AuthService, PermissionType } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have no user', () => {
    expect(service.currentUser).toBeNull();
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should return default permission', () => {
    expect(service.currentPermission).toBe('dashboard-factory-newhouse');
  });

  it('should simulate login and set user', async () => {
    const user = await service.simulateGoogleLogin();

    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john.doe@example.com');
    expect(service.currentUser).toEqual(user);
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should logout and clear user', async () => {
    await service.simulateGoogleLogin();
    expect(service.isLoggedIn()).toBe(true);

    service.logout();
    expect(service.currentUser).toBeNull();
    expect(service.isLoggedIn()).toBe(false);
    expect(service.currentPermission).toBe('dashboard');
  });

  it('should set permission', async () => {
    await service.simulateGoogleLogin();
    
    service.setPermission('dashboard');
    expect(service.currentPermission).toBe('dashboard');
    expect(service.currentUser?.permission).toBe('dashboard');

    service.setPermission('dashboard-factory');
    expect(service.currentPermission).toBe('dashboard-factory');
    expect(service.currentUser?.permission).toBe('dashboard-factory');
  });

  it('should update user permission when setPermission is called', async () => {
    await service.simulateGoogleLogin();
    const originalUser = { ...service.currentUser! };

    service.setPermission('dashboard-factory');

    expect(service.currentUser?.permission).toBe('dashboard-factory');
    expect(service.currentUser?.name).toBe(originalUser.name);
    expect(service.currentUser?.email).toBe(originalUser.email);
  });
});