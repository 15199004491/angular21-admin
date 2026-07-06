import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '@/app/core/services/auth.service';
import { CommonModule } from '@angular/common';
import { vi } from 'vitest';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    const authService = { 
      logout: vi.fn(),
      currentUser$: of({ name: 'Test User', permission: 'dashboard' }),
      permission$: of('dashboard'),
      setPermission: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle logout', () => {
    component.handleLogout();
    
    expect(component['authService'].logout).toHaveBeenCalled();
  });
});