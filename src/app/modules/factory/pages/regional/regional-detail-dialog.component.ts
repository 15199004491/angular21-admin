import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Region, Factory } from '@/app/modules/factory/models/factory.model';
import { RegionalVacantFactoriesDialogComponent } from './regional-vacant-factories-dialog.component';

@Component({
    selector: 'regional-detail-dialog',
    standalone: true,
    imports: [CommonModule, ButtonModule, DialogModule, RegionalVacantFactoriesDialogComponent],
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
                    <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span class="font-semibold">Regional Type:</span>
                        <span>{{ getRegionTypeLabel(region.type) }}</span>
                    </div>
                    <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span class="font-semibold">Parent Region:</span>
                        <span>{{ region.parent || '-' }}</span>
                    </div>
                    <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span class="font-semibold">Created Date:</span>
                        <span>{{ region.createdDate }}</span>
                    </div>
                    <div class="p-3 bg-gray-50 rounded-lg">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-semibold">Unsettled Factory:</span>
                            <span>{{ vacantFactoriesCount }}</span>
                        </div>
                        <p-button 
                            label="Factories Lists" 
                            icon="pi pi-external-link" 
                            size="small"
                            severity="success"
                            (click)="showVacantFactoriesDialog()"
                            class="w-full"
                        ></p-button>
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

        <regional-vacant-factories-dialog 
            [(visible)]="vacantFactoriesDialogVisible"
            [regionName]="region?.name || ''"
            [vacantFactories]="vacantFactories"
            [readonly]="true"
        ></regional-vacant-factories-dialog>
    `
})
export class RegionalDetailDialogComponent {
    @Input() visible: boolean = false;
    @Input() region: Region | null = null;
    @Input() allFactories: Factory[] = [];
    
    @Output() visibleChange = new EventEmitter<boolean>();

    vacantFactoriesDialogVisible: boolean = false;

    regionTypes = [
        { label: 'Local', value: 'local' },
        { label: 'Military', value: 'military' }
    ];

    get vacantFactories(): Factory[] {
        if (!this.region?.name) return [];
        return this.allFactories.filter(f => f.location !== this.region?.name);
    }

    get vacantFactoriesCount(): number {
        return this.vacantFactories.length;
    }

    getRegionTypeLabel(type: string): string {
        const found = this.regionTypes.find(t => t.value === type);
        return found ? found.label : type;
    }

    showVacantFactoriesDialog() {
        this.vacantFactoriesDialogVisible = true;
    }

    close(): void {
        this.visibleChange.emit(false);
    }
}