import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '@/app/core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { vi } from 'vitest';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: { simulateGoogleLogin: ReturnType<typeof vi.fn> };
  let router: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authService = { simulateGoogleLogin: vi.fn() };
    router = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [CommonModule, LoginComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isLoading false', () => {
    expect(component.isLoading).toBe(false);
  });

  it('should handle google login successfully', async () => {
    authService.simulateGoogleLogin.mockResolvedValue({
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '',
      permission: 'dashboard'
    });

    await component.handleGoogleLogin();

    expect(authService.simulateGoogleLogin).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(component.isLoading).toBe(false);
  });

  it('should handle google login failure', async () => {
    const error = new Error('Login failed');
    authService.simulateGoogleLogin.mockRejectedValue(error);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await component.handleGoogleLogin();

    expect(authService.simulateGoogleLogin).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Login failed:', error);

    consoleErrorSpy.mockRestore();
  });

  it('should handle demo login successfully', async () => {
    authService.simulateGoogleLogin.mockResolvedValue({
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '',
      permission: 'dashboard'
    });

    await component.handleDemoLogin();

    expect(authService.simulateGoogleLogin).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(component.isLoading).toBe(false);
  });

  it('should set isLoading to true during login', async () => {
    let isLoadingValue: boolean | undefined;
    authService.simulateGoogleLogin.mockImplementation(async () => {
      isLoadingValue = component.isLoading;
      await new Promise(resolve => setTimeout(resolve, 10));
      return { name: 'John', email: 'john@example.com', avatar: '', permission: 'dashboard' };
    });

    await component.handleGoogleLogin();

    expect(isLoadingValue).toBe(true);
  });
});