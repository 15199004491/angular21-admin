import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HousingResourceComponent } from './housing-resource.component';
import { CommonModule } from '@angular/common';

describe('HousingResourceComponent', () => {
  let component: HousingResourceComponent;
  let fixture: ComponentFixture<HousingResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HousingResourceComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HousingResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});