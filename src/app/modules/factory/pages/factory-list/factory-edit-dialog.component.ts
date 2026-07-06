import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { Factory } from '@/app/modules/factory/models/factory.model';
import { factoryStatuses } from '@/app/modules/factory/data/factory.mock';
import { CommonTreeComponent } from '@/app/components/common-tree.component';
import { TreeData } from '@/app/components/common-tree.component';

@Component({
    selector: 'factory-edit-dialog',
    standalone: true,
    imports: [CommonModule, SelectModule, InputTextModule, FormsModule, ButtonModule, DialogModule, InputNumberModule, CheckboxModule, CommonTreeComponent],
    template: `
        <p-dialog 
            header="Edit Factory" 
            [(visible)]="visible" 
            [modal]="true" 
            [style]="{ width: '520px' }"
            [focusTrap]="false"
            (onHide)="close()"
        >
            <form #editForm="ngForm" (ngSubmit)="onSubmit(editForm)">
                <div class="field mt-4">
                    <label for="editName" class="block mb-2">* Factory Name</label>
                    <input 
                        pInputText 
                        id="editName" 
                        name="name" 
                        [(ngModel)]="editFactory.name"
                        #name="ngModel"
                        required
                        maxlength="50"
                        pattern="^[a-zA-Z0-9\\s]+$"
                        class="w-full"
                        placeholder="Enter factory name"
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
                    <label for="editLocation" class="block mb-2">* Location</label>
                    <div class="flex items-center gap-2">
                        <common-tree #locationTreeComponent (nodeSelected)="onLocationSelect($event)"></common-tree>
                        <p-button label="Reset" (click)="resetLocationSelection()" severity="success" [style]="{ height: '2.5rem' }"></p-button>
                    </div>
                    @if (selectedLocation) {
                        <div class="mt-2 text-sm text-gray-600">
                            Selected: {{ selectedLocation.label }}
                        </div>
                    }
                    @if (!editFactory.location && locationTouched) {
                        <small class="error-text">
                            <span>Location is required.</span>
                        </small>
                    }
                </div>

                <div class="field mt-4">
                    <label for="editStatus" class="block mb-2">* Status</label>
                    <p-select 
                        id="editStatus" 
                        name="status" 
                        [(ngModel)]="editFactory.status"
                        #status="ngModel"
                        required
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
                    <label for="editEmployeeCount" class="block mb-2">* Employee Count</label>
                    <p-inputNumber 
                        id="editEmployeeCount" 
                        name="employeeCount" 
                        [(ngModel)]="editFactory.employeeCount"
                        #employeeCount="ngModel"
                        required
                        [min]="1"
                        [max]="10000"
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
                    <label for="editEstablishedYear" class="block mb-2">* Established Year</label>
                    <p-inputNumber 
                        id="editEstablishedYear" 
                        name="establishedYear" 
                        [(ngModel)]="editFactory.establishedYear"
                        #establishedYear="ngModel"
                        required
                        [min]="1900"
                        [max]="2026"
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

                <div class="field mt-4">
                    <div class="flex items-center gap-3" style="min-height: 38px;">
                        <p-checkbox 
                            id="editVerified" 
                            name="verified" 
                            [(ngModel)]="editFactory.verified"
                            binary="true"
                        />
                        <span>Verified</span>
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
    `
})
export class FactoryEditDialogComponent implements OnInit, OnChanges {
    @Input() visible: boolean = false;
    @Input() factory: Factory | null = null;
    
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() confirmed = new EventEmitter<Factory>();

    @ViewChild('editForm') editForm!: NgForm;
    @ViewChild('locationTreeComponent') locationTreeComponent!: CommonTreeComponent;
    
    editFactory: Factory = {
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

    selectedLocation: TreeData | null = null;
    locationTouched: boolean = false;
    statusOptions: { label: string; value: string }[] = [];

    ngOnInit(): void {
        this.statusOptions = factoryStatuses;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible']?.currentValue && this.factory) {
            this.editFactory = { ...this.factory };
            
            if (this.editFactory.location) {
                this.selectedLocation = {
                    label: this.editFactory.location,
                    data: this.editFactory.location.toLowerCase().replace(/\s+/g, '-')
                };
            } else {
                this.selectedLocation = null;
            }
            
            setTimeout(() => {
                this.editForm?.resetForm(this.editFactory);
                if (this.locationTreeComponent && this.selectedLocation) {
                    this.locationTreeComponent.setSelection(this.selectedLocation);
                }
            }, 0);
        }
    }

    onLocationSelect(selectedNode: TreeData | null) {
        this.locationTouched = true;
        this.selectedLocation = selectedNode;
        this.editFactory.location = selectedNode?.label || '';
    }

    resetLocationSelection() {
        this.locationTreeComponent?.clearSelection();
        this.selectedLocation = null;
        this.editFactory.location = '';
        this.locationTouched = false;
    }

    onSubmit(form: NgForm): void {
        if (form.valid && this.factory) {
            this.confirmed.emit({ ...this.editFactory });
            this.close();
        }
    }

    close(): void {
        this.visibleChange.emit(false);
    }
}