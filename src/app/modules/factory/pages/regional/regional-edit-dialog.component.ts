import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { Region, Factory } from '@/app/modules/factory/models/factory.model';
import { CommonTreeComponent } from '@/app/components/common-tree.component';
import { TreeData } from '@/app/components/common-tree.component';
import { RegionalVacantFactoriesDialogComponent } from './regional-vacant-factories-dialog.component';

const regionCodeToTreeData: Record<string, { label: string; data: string }> = {
    '100100000001': { label: 'Xinjiang Province', data: 'xinjiang' },
    '100100000002': { label: 'Urumqi', data: 'urumqi' },
    '100100000003': { label: 'Tianshan District', data: 'tianshan' },
    '100100000004': { label: 'Saybagh District', data: 'saybagh' },
    '100100000005': { label: 'Shuimogou District', data: 'shuimogou' },
    '100100000006': { label: 'Shihezi', data: 'shihezi' },
    '100100000007': { label: 'Shawan', data: 'shawan' },
    '100100000008': { label: 'Shawan Town', data: 'shawan-town' },
    '100100000009': { label: 'Huangguan Town', data: 'huangguan' },
    '100100000010': { label: 'Tacheng', data: 'tacheng' },
    '100100000011': { label: 'Yumin County', data: 'yumin' },
    '100100000012': { label: 'Emin County', data: 'emin' },
    '100100000013': { label: 'Jinghe County', data: 'jinghe' },
    '100100000014': { label: 'Kashgar', data: 'kashgar' },
    '100100000015': { label: 'Kashgar City', data: 'kashgar-city' },
    '10010000016': { label: 'Yecheng County', data: 'yecheng' },
    '100100000017': { label: 'Aksu', data: 'aksu' },
    '100100000018': { label: 'Aksu City', data: 'aksu-city' },
    '100100000019': { label: 'Kuqa County', data: 'kuqa' },
    '100200000001': { label: 'Guangdong Province', data: 'guangdong' },
    '100200000002': { label: 'Guangzhou', data: 'guangzhou' },
    '100200000003': { label: 'Tianhe District', data: 'tianhe' },
    '100200000004': { label: 'Zhujiang New Town', data: 'zhujiang' },
    '100200000005': { label: 'Shenzhen', data: 'shenzhen' },
    '100200000006': { label: 'Futian District', data: 'futian' },
    '100200000007': { label: 'Nanshan District', data: 'nanshan' },
    '100300000001': { label: 'Beijing', data: 'beijing' },
    '100300000002': { label: 'Chaoyang District', data: 'chaoyang' },
    '100300000003': { label: 'Haidian District', data: 'haidian' },
    '100300000004': { label: 'Xicheng District', data: 'xicheng' }
};

@Component({
    selector: 'regional-edit-dialog',
    standalone: true,
    imports: [CommonModule, InputTextModule, FormsModule, ButtonModule, DialogModule, CommonTreeComponent, SelectModule, RegionalVacantFactoriesDialogComponent],
    template: `
        <p-dialog 
            header="Edit Region" 
            [(visible)]="visible" 
            [modal]="true" 
            [style]="{ width: '520px' }"
            [focusTrap]="false"
            (onHide)="close()"
        >
            <form #editForm="ngForm" (ngSubmit)="onSubmit(editForm)" class="p-fluid">
                <div class="field">
                    <label for="editCode" class="block mb-2">Region Code</label>
                    <input 
                        pInputText 
                        id="editCode" 
                        name="code" 
                        [(ngModel)]="editRegion.code"
                        [readonly]="true"
                        class="w-full bg-gray-100"
                    />
                </div>

                <div class="field mt-4">
                    <label for="parentRegion" class="block mb-2">Parent Region</label>
                    <div class="flex items-center gap-2">
                        <common-tree #parentTreeComponent (nodeSelected)="onParentNodeSelect($event)"></common-tree>
                        <p-button label="Reset" (click)="resetParentSelection()" severity="success" [style]="{ height: '2.5rem' }"></p-button>
                    </div>
                    <div *ngIf="selectedParent" class="mt-2 text-sm text-gray-600">
                        Selected: {{ selectedParent.label }}
                    </div>
                </div>

                <div class="field mt-4">
                    <label for="editName" class="block mb-2">* Region Name</label>
                    <input 
                        pInputText 
                        id="editName" 
                        name="name" 
                        [(ngModel)]="editRegion.name"
                        #name="ngModel"
                        required
                        maxlength="50"
                        class="w-full"
                        placeholder="Enter region name"
                    />
                    @if (name.invalid && (name.dirty || name.touched)) {
                        <small class="error-text">
                            @if (name.errors?.['required']) {<span>Region name is required.</span>}
                            @if (name.errors?.['maxlength']) {<span>Region name cannot exceed 50 characters.</span>}
                        </small>
                    }
                </div>

                <div class="field mt-4">
                    <label for="regionType" class="block mb-2">* Regional Type</label>
                    <p-select 
                        id="regionType"
                        [(ngModel)]="editRegion.type" 
                        name="type"
                        [options]="regionTypes"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select regional type"
                        class="w-full"
                        required
                        #type="ngModel"
                    ></p-select>
                    @if (type.invalid && (type.dirty || type.touched)) {
                        <small class="error-text">
                            @if (type.errors?.['required']) {<span>Regional type is required.</span>}
                        </small>
                    }
                </div>

                <div class="field mt-4">
                    <label for="unsettledFactory" class="block mb-2">Unsettled Factory</label>
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span>Available: {{ vacantFactoriesCount }}</span>
                        <p-button 
                            label="Factories Lists" 
                            icon="pi pi-external-link" 
                            size="small"
                            severity="success"
                            (click)="showVacantFactoriesDialog()"
                        ></p-button>
                    </div>
                </div>

                <div class="flex justify-end gap-2 mt-6">
                    <p-button 
                        label="Cancel" 
                        icon="pi pi-times" 
                        (click)="close()" 
                        class="p-button-secondary"
                    />
                    <p-button 
                        label="Save" 
                        icon="pi pi-save" 
                        type="submit"
                        [disabled]="!editForm.valid"
                        severity="success"
                    />
                </div>
            </form>
        </p-dialog>

        <regional-vacant-factories-dialog 
            [(visible)]="vacantFactoriesDialogVisible"
            [regionName]="editRegion.name"
            [vacantFactories]="vacantFactories"
            (delete)="handleDeleteFactory($event)"
            (settled)="handleMarkAsSettled($event)"
        ></regional-vacant-factories-dialog>
    `
})
export class RegionalEditDialogComponent implements OnInit, OnChanges {
    @Input() visible: boolean = false;
    @Input() region: Region | null = null;
    @Input() allFactories: Factory[] = [];
    
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() confirmed = new EventEmitter<Region>();
    @Output() factoriesAdded = new EventEmitter<{ regionName: string; factories: Factory[] }>();

    @ViewChild('editForm') editForm!: NgForm;
    @ViewChild('parentTreeComponent') parentTreeComponent!: CommonTreeComponent;
    
    editRegion: Region = {
        name: '',
        code: '',
        type: 'local',
        createdDate: '',
        parent: ''
    };

    selectedParent: TreeData | null = null;
    vacantFactoriesDialogVisible: boolean = false;
    
    regionTypes = [
        { label: 'Local', value: 'local' },
        { label: 'Military', value: 'military' }
    ];

    get vacantFactories(): Factory[] {
        if (!this.editRegion.name) return [];
        return this.allFactories.filter(f => f.location !== this.editRegion.name);
    }

    get vacantFactoriesCount(): number {
        return this.vacantFactories.length;
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible']?.currentValue && this.region) {
            this.editRegion = { ...this.region };
            
            if (this.editRegion.parent) {
                const parentInfo = regionCodeToTreeData[this.editRegion.parent];
                if (parentInfo) {
                    this.selectedParent = {
                        label: parentInfo.label,
                        data: parentInfo.data
                    };
                } else {
                    this.selectedParent = null;
                }
            } else {
                this.selectedParent = null;
            }
            
            Promise.resolve().then(() => {
                if (this.parentTreeComponent) {
                    this.parentTreeComponent.setSelection(this.selectedParent);
                }
            });
        }
    }

    onParentNodeSelect(selectedNode: TreeData | null) {
        this.selectedParent = selectedNode;
        if (selectedNode) {
            const code = Object.keys(regionCodeToTreeData).find(key => 
                regionCodeToTreeData[key].data === selectedNode.data
            );
            this.editRegion.parent = code || '';
        } else {
            this.editRegion.parent = '';
        }
    }

    showVacantFactoriesDialog() {
        this.vacantFactoriesDialogVisible = true;
    }

    handleDeleteFactory(factory: Factory) {
        this.factoriesAdded.emit({ regionName: 'delete', factories: [factory] });
    }

    handleMarkAsSettled(factory: Factory) {
        factory.location = this.editRegion.name;
        this.factoriesAdded.emit({ regionName: this.editRegion.name, factories: [factory] });
    }

    resetParentSelection() {
        this.parentTreeComponent?.clearSelection();
        this.selectedParent = null;
        this.editRegion.parent = '';
    }

    onSubmit(form: NgForm): void {
        if (form.valid) {
            this.confirmed.emit({ ...this.editRegion });
            this.close();
        }
    }

    close(): void {
        this.visible = false;
        this.visibleChange.emit(false);
    }
}