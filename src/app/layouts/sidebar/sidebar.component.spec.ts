import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '@/app/services/menu.service';
import { AuthService } from '@/app/core/services/auth.service';
import { vi } from 'vitest';
import { of } from 'rxjs';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    const authService = {
      currentPermission: 'dashboard-factory-newhouse',
      permission$: vi.fn().mockReturnValue(of('dashboard-factory-newhouse'))
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forRoot([]), SidebarComponent],
      providers: [
        MenuService,
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle expanded items', () => {
    expect(component.expandedItems.size).toBe(0);
    component.toggleExpand('1');
    expect(component.expandedItems.has('1')).toBe(true);
    component.toggleExpand('1');
    expect(component.expandedItems.has('1')).toBe(false);
  });
});