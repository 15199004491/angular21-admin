import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnoccupiedComponent } from './unoccupied.component';
import { CommonModule } from '@angular/common';

describe('UnoccupiedComponent', () => {
  let component: UnoccupiedComponent;
  let fixture: ComponentFixture<UnoccupiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, UnoccupiedComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UnoccupiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});