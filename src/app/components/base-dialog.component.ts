import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-base-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  template: `
    <p-dialog 
      [header]="title" 
      [(visible)]="visible" 
      [modal]="true" 
      [style]="{ width: '520px' }"
      [focusTrap]="false"
      (onHide)="handleClose()"
    >
      <ng-content></ng-content>
      
      <div class="flex justify-end gap-2 mt-6">
        <p-button 
          label="Cancel" 
          icon="pi pi-times" 
          (click)="handleClose()" 
          class="p-button-secondary"
        />
        <p-button 
          [label]="confirmButtonLabel" 
          [icon]="confirmButtonIcon"
          type="submit"
          [disabled]="disabled"
          severity="success"
        />
      </div>
    </p-dialog>
  `
})
export class BaseDialogComponent {
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Input() disabled: boolean = false;
  @Input() confirmButtonLabel: string = 'Confirm';
  @Input() confirmButtonIcon: string = 'pi pi-check';
  
  @Output() visibleChange = new EventEmitter<boolean>();
  
  @ViewChild('form') form!: NgForm;

  handleClose(): void {
    this.visibleChange.emit(false);
  }
}