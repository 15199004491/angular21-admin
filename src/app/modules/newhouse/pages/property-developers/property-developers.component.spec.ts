import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyDevelopersComponent } from './property-developers.component';
import { CommonModule } from '@angular/common';

describe('PropertyDevelopersComponent', () => {
  let component: PropertyDevelopersComponent;
  let fixture: ComponentFixture<PropertyDevelopersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, PropertyDevelopersComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyDevelopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});