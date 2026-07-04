import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { Factory } from '@/app/modules/factory/models/factory.model';
import { factoryStatuses } from '@/app/modules/factory/mock/factory.mock';
import { CommonTreeComponent } from '@/app/components/common-tree.component';
import { TreeData } from '@/app/components/common-tree.component';

@Component({
    selector: 'factory-add-dialog',
    standalone: true,
    imports: [CommonModule, SelectModule, InputTextModule, FormsModule, ButtonModule, DialogModule, InputNumberModule, CommonTreeComponent],
    template: `
        <p-dialog header="Add New Factory" [(visible)]="visible" [modal]="true" [style]="{ width: '520px' }" [focusTrap]="false">
            <form #addForm="ngForm" (ngSubmit)="onSubmit(addForm)" class="p-fluid">
                <div class="field">
                    <label for="factoryName" class="block mb-2">* Factory Name</label>
                    <input 
                        id="factoryName" 
                        pInputText 
                        [(ngModel)]="factory.name" 
                        name="name" 
                        required
                        maxlength="50"
                        pattern="[a-zA-Z0-9\\s]+"
                        #name="ngModel"
                        class="w-full"
                    />
                    @if (name.invalid && (name.dirty || name.touched)) {
                        <small class="error-text">
                            @if (name.errors?.['required']) {<span>Factory name is required.</span>}
                            @if (name.errors?.['maxlength']) {<span>Factory name cannot exceed 50 characters.</span>}
                            @if (name.errors?.['pattern']) {<span>Factory name can only contain letters, numbers, and spaces.</span>}
                        </small>
                    }
                </div>

                <div class="field mt-4">
                    <label for="location" class="block mb-2">* Location</label>
                    <div class="flex items-center gap-2">
                        <common-tree #locationTreeComponent (nodeSelected)="onLocationSelect($event)"></common-tree>
                        <p-button label="Reset" (click)="resetLocationSelection()" severity="success" [style]="{ height: '2.5rem' }"></p-button>
                    </div>
                    @if (selectedLocation) {
                        <div class="mt-2 text-sm text-gray-600">
                            Selected: {{ selectedLocation.label }}
                        </div>
                    }
                    @if (!factory.location && locationTouched) {
                        <small class="error-text">
                            <span>Location is required.</span>
                        </small>
                    }
                </div>

                <div class="field mt-4">
                    <label for="status" class="block mb-2">* Status</label>
                    <p-select 
                        id="status" 
                        [(ngModel)]="factory.status" 
                        name="status" 
                        required
                        #status="ngModel"
                        [options]="statusOptions"
                        placeholder="Select status"
                        class="w-full"
                    />
                    @if (status.invalid && (status.dirty || status.touched)) {
                        <small class="error-text">
                            @if (status.errors?.['required']) {<span>Status is required.</span>}
                        </small>
                    }
                </div>

                <div class="field mt-4">
                    <label for="employeeCount" class="block mb-2">* Employee Count</label>
                    <p-inputNumber 
                        id="employeeCount" 
                        [(ngModel)]="factory.employeeCount" 
                        name="employeeCount" 
                        required
                        [min]="1"
                        [max]="10000"
                        #employeeCount="ngModel"
                        class="w-full"
                    />
                    @if (employeeCount.invalid && (employeeCount.dirty || employeeCount.touched)) {
                        <small class="error-text">
                            @if (employeeCount.errors?.['required']) {<span>Employee count is required.</span>}
                            @if (employeeCount.errors?.['min']) {<span>Employee count must be at least 1.</span>}
                            @if (employeeCount.errors?.['max']) {<span>Employee count cannot exceed 10000.</span>}
                        </small>
                    }
                </div>

                <div class="field mt-4">
                    <label for="establishedYear" class="block mb-2">* Established Year</label>
                    <p-inputNumber 
                        id="establishedYear" 
                        [(ngModel)]="factory.establishedYear" 
                        name="establishedYear" 
                        required
                        [min]="1900"
                        [max]="2026"
                        #establishedYear="ngModel"
                        class="w-full"
                    />
                    @if (establishedYear.invalid && (establishedYear.dirty || establishedYear.touched)) {
                        <small class="error-text">
                            @if (establishedYear.errors?.['required']) {<span>Established year is required.</span>}
                            @if (establishedYear.errors?.['min']) {<span>Year must be 1900 or later.</span>}
                            @if (establishedYear.errors?.['max']) {<span>Year cannot exceed 2026.</span>}
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
export class FactoryAddDialogComponent implements OnInit, OnChanges {
    @Input() visible: boolean = false;
    @ViewChild('addForm') addForm: any;
    @ViewChild('locationTreeComponent') locationTreeComponent!: CommonTreeComponent;
    @Input() factory: Factory = this.createEmptyFactory();
    
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() confirmed = new EventEmitter<Factory>();

    selectedLocation: TreeData | null = null;
    locationTouched: boolean = false;
    statusOptions = factoryStatuses;

    private createEmptyFactory(): Factory {
        return {
            id: 0,
            name: '',
            location: '',
            status: '',
            employeeCount: 0,
            establishedYear: new Date().getFullYear(),
            verified: false,
            details: '',
            contact: ''
        };
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['visible']?.currentValue) {
            this.resetForm();
        }
    }

    private resetForm() {
        this.factory = this.createEmptyFactory();
        this.selectedLocation = null;
        this.locationTouched = false;
        Promise.resolve().then(() => {
            if (this.addForm) {
                this.addForm.reset();
            }
            if (this.locationTreeComponent) {
                this.locationTreeComponent.clearSelection();
            }
        });
    }

    onLocationSelect(selectedNode: TreeData | null) {
        if (selectedNode) {
            this.locationTouched = true;
        }
        this.selectedLocation = selectedNode;
        this.factory.location = selectedNode?.label || '';
    }

    resetLocationSelection() {
        this.locationTreeComponent?.clearSelection();
        this.selectedLocation = null;
        this.factory.location = '';
    }

    close() {
        this.visibleChange.emit(false);
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            this.confirmed.emit({ ...this.factory });
            this.close();
        }
    }
}