import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Region } from '@/app/modules/factory/models/factory.model';

@Component({
    selector: 'regional-add-dialog',
    standalone: true,
    imports: [CommonModule, InputTextModule, FormsModule, ButtonModule, DialogModule],
    template: `
        <p-dialog header="Add New Region" [(visible)]="visible" [modal]="true" [style]="{ width: '35%' }" [focusTrap]="false">
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
    @Input() region: Region = this.createEmptyRegion();
    
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() confirmed = new EventEmitter<Region>();

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
            createdDate: `${dateStr} ${timeStr}`
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
        this.region = this.createEmptyRegion();
        Promise.resolve().then(() => {
            if (this.addForm) {
                this.addForm.reset();
            }
        });
    }

    close() {
        this.visibleChange.emit(false);
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            this.confirmed.emit({ ...this.region });
            this.close();
        }
    }
}