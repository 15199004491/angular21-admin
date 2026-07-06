import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RealEstateComponent } from './real-estate.component';
import { CommonModule } from '@angular/common';

describe('RealEstateComponent', () => {
  let component: RealEstateComponent;
  let fixture: ComponentFixture<RealEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RealEstateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RealEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});