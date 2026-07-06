import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, DashboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have stats after init', () => {
    expect(component.stats).toBeDefined();
    expect(component.stats.length).toBeGreaterThan(0);
  });

  it('should have recent orders after init', () => {
    expect(component.recentOrders).toBeDefined();
    expect(component.recentOrders.length).toBeGreaterThan(0);
  });

  it('should return formatted current date', () => {
    const date = component.currentDate;
    expect(date).toBeDefined();
    expect(typeof date).toBe('string');
    expect(date.length).toBeGreaterThan(0);
  });
});