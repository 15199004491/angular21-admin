import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Region } from '@/app/modules/factory/models/factory.model';

@Component({
    selector: 'regional-edit-dialog',
    standalone: true,
    imports: [CommonModule, InputTextModule, FormsModule, ButtonModule, DialogModule],
    template: `
        <p-dialog 
            header="Edit Region" 
            [(visible)]="visible" 
            [modal]="true" 
            [style]="{ width: '35%' }"
            [focusTrap]="false"
            (onHide)="close()"
        >
            <form #editForm="ngForm" (ngSubmit)="onSubmit(editForm)">
                <div class="field mt-4">
                    <label for="editCode" class="block mb-2">* Region Code</label>
                    <input 
                        pInputText 
                        id="editCode" 
                        name="code" 
                        [(ngModel)]="editRegion.code"
                        #code="ngModel"
                        required
                        maxlength="10"
                        pattern="[a-zA-Z0-9]+"
                        class="w-full"
                        placeholder="Enter region code"
                    />
                    @if (code.invalid && (code.dirty || code.touched)) {
                        <small class="error-text">
                            @if (code.errors?.['required']) {<span>Region code is required.</span>}
                            @if (code.errors?.['maxlength']) {<span>Region code cannot exceed 10 characters.</span>}
                            @if (code.errors?.['pattern']) {<span>Region code can only contain letters and numbers.</span>}
                        </small>
                    }
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
export class RegionalEditDialogComponent implements OnInit, OnChanges {
    @Input() visible: boolean = false;
    @Input() region: Region | null = null;
    
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() confirmed = new EventEmitter<Region>();

    @ViewChild('editForm') editForm!: NgForm;
    
    editRegion: Region = {
        name: '',
        code: '',
        type: 'local',
        createdDate: ''
    };

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible'] && this.visible && this.region) {
            this.editRegion = { ...this.region };
            setTimeout(() => {
                this.editForm?.resetForm(this.editRegion);
            }, 0);
        }
    }

    onSubmit(form: NgForm): void {
        if (form.valid && this.region) {
            this.confirmed.emit({ ...this.editRegion });
            this.close();
        }
    }

    close(): void {
        this.visibleChange.emit(false);
    }
}