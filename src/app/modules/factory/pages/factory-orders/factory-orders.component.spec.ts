import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FactoryOrdersComponent } from './factory-orders.component';
import { CommonModule } from '@angular/common';

describe('FactoryOrdersComponent', () => {
  let component: FactoryOrdersComponent;
  let fixture: ComponentFixture<FactoryOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FactoryOrdersComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FactoryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});