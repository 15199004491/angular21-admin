import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { MainContentComponent } from '../main-content/main-content.component';
import { AuthService } from '@/app/core/services/auth.service';
import { Router } from '@angular/router';
import { MenuService } from '@/app/services/menu.service';
import { vi } from 'vitest';
import { of } from 'rxjs';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    const authService = { 
      logout: vi.fn(),
      currentUser$: of({ name: 'Test User', permission: 'dashboard' }),
      permission$: of('dashboard'),
      setPermission: vi.fn()
    };
    const router = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule, 
        HeaderComponent, 
        FooterComponent, 
        MainContentComponent,
        LayoutComponent, 
        SidebarComponent
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        MenuService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});