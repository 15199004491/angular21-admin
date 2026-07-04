import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { Region } from '@/app/modules/factory/models/factory.model';
import { CommonTreeComponent } from '@/app/components/common-tree.component';
import { TreeData } from '@/app/components/common-tree.component';
import { regionTypes } from '@/app/modules/factory/mock/factory.mock';

@Component({
    selector: 'regional-add-dialog',
    standalone: true,
    imports: [CommonModule, InputTextModule, FormsModule, ButtonModule, DialogModule, CommonTreeComponent, SelectModule],
    template: `
        <p-dialog header="Add New Region" [(visible)]="visible" [modal]="true" [style]="{ width: '520px' }" [focusTrap]="false" (onHide)="close()">
            <form #addForm="ngForm" (ngSubmit)="onSubmit(addForm)" class="p-fluid">
                <div class="field">
                    <label for="regionCode" class="block mb-2">Region Code</label>
                    <input 
                        id="regionCode" 
                        pInputText 
                        [(ngModel)]="region.code" 
                        name="code" 
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
                    <label for="regionName" class="block mb-2">* Region Name</label>
                    <input 
                        id="regionName" 
                        pInputText 
                        [(ngModel)]="region.name" 
                        name="name" 
                        required
                        maxlength="50"
                        #name="ngModel"
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
                        [(ngModel)]="region.type" 
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

                <div class="flex justify-end gap-2 mt-6">
                    <p-button label="Cancel" icon="pi pi-times" (click)="close()" class="p-button-secondary" />
                    <p-button label="Confirm" icon="pi pi-check" type="submit" [disabled]="!addForm.form.valid" severity="success" />
                </div>
            </form>
        </p-dialog>
    `
})
export class RegionalAddDialogComponent implements OnInit, OnChanges {
    @Input() visible: boolean = false;
    @ViewChild('addForm') addForm: any;
    @ViewChild('parentTreeComponent') parentTreeComponent!: CommonTreeComponent;
    @Input() region: Region = this.createEmptyRegion();
    
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() confirmed = new EventEmitter<Region>();

    selectedParent: TreeData | null = null;
    regionTypes = regionTypes;

    private generateCode(): string {
        let result = '';
        for (let i = 0; i < 12; i++) {
            result += Math.floor(Math.random() * 10).toString();
        }
        return result;
    }

    private createEmptyRegion(): Region {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0];
        return {
            name: '',
            code: this.generateCode(),
            type: 'local',
            createdDate: `${dateStr} ${timeStr}`,
            parent: ''
        };
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['visible'] && changes['visible'].currentValue && !changes['visible'].previousValue) {
            this.resetForm();
        }
    }

    private resetForm() {
        this.region = this.createEmptyRegion();
        this.selectedParent = null;
        Promise.resolve().then(() => {
            if (this.addForm) {
                this.addForm.reset();
            }
            if (this.parentTreeComponent) {
                this.parentTreeComponent.clearSelection();
            }
        });
    }

    onParentNodeSelect(selectedNode: TreeData | null) {
        this.selectedParent = selectedNode;
        this.region.parent = selectedNode?.data || '';
    }

    resetParentSelection() {
        this.parentTreeComponent?.clearSelection();
        this.selectedParent = null;
        this.region.parent = '';
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(false);
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            this.confirmed.emit({ ...this.region });
            this.close();
        }
    }
}