import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseDialogComponent } from './base-dialog.component';
import { CommonModule } from '@angular/common';
import { vi } from 'vitest';

describe('BaseDialogComponent', () => {
  let component: BaseDialogComponent;
  let fixture: ComponentFixture<BaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BaseDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit visibleChange event when handleClose is called', () => {
    const emitSpy = vi.spyOn(component.visibleChange, 'emit');
    
    component.handleClose();
    
    expect(emitSpy).toHaveBeenCalledWith(false);
  });

  it('should have default visible state', () => {
    expect(component.visible).toBe(false);
  });
});