import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Region } from '@/app/modules/factory/models/factory.model';

@Component({
    selector: 'regional-detail-dialog',
    standalone: true,
    imports: [CommonModule, ButtonModule, DialogModule],
    template: `
        <p-dialog 
            header="Region Details" 
            [(visible)]="visible" 
            [modal]="true" 
            [style]="{ width: '40%' }"
            [focusTrap]="false"
            (onHide)="close()"
        >
            @if (region) {
                <div class="space-y-4">
                    <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span class="font-semibold">Region Code:</span>
                        <span>{{ region.code }}</span>
                    </div>
                    <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span class="font-semibold">Region Name:</span>
                        <span>{{ region.name }}</span>
                    </div>
                </div>
            }

            <ng-template pTemplate="footer">
                <p-button 
                    label="Close" 
                    icon="pi pi-times" 
                    (click)="close()" 
                />
            </ng-template>
        </p-dialog>
    `
})
export class RegionalDetailDialogComponent {
    @Input() visible: boolean = false;
    @Input() region: Region | null = null;
    
    @Output() visibleChange = new EventEmitter<boolean>();

    close(): void {
        this.visibleChange.emit(false);
    }
}