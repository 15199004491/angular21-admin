import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewHouseRegionalComponent } from './regional.component';
import { CommonModule } from '@angular/common';

describe('NewHouseRegionalComponent', () => {
  let component: NewHouseRegionalComponent;
  let fixture: ComponentFixture<NewHouseRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, NewHouseRegionalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NewHouseRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});