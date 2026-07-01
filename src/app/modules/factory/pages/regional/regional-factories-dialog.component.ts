import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Factory } from '@/app/modules/factory/models/factory.model';

@Component({
    selector: 'regional-factories-dialog',
    standalone: true,
    imports: [CommonModule, ButtonModule, DialogModule, TableModule, TagModule],
    template: `
        <p-dialog 
            header="Factories in {{ regionName }}" 
            [(visible)]="visible" 
            [modal]="true" 
            [style]="{ width: '60%' }"
            [focusTrap]="false"
            (onHide)="close()"
        >
            <p-table
                [value]="factories"
                dataKey="id"
                [paginator]="true"
                [rows]="10"
                [rowsPerPageOptions]="[10, 25, 50]"
                [tableStyle]="{ 'min-width': '50rem' }"
            >
                <ng-template #header>
                    <tr>
                        <th style="width:3rem">ID</th>
                        <th style="width:25%">Factory Name</th>
                        <th style="width:15%">Status</th>
                        <th style="width:15%">Employees</th>
                        <th style="width:15%">Established</th>
                        <th style="width:10%">Verified</th>
                    </tr>
                </ng-template>
                <ng-template #body let-factory>
                    <tr>
                        <td>{{ factory.id }}</td>
                        <td>{{ factory.name }}</td>
                        <td>
                            <p-tag 
                                [value]="factory.status" 
                                [severity]="factory.status === 'active' ? 'success' : factory.status === 'maintenance' ? 'warn' : 'danger'"
                            />
                        </td>
                        <td>{{ factory.employeeCount.toLocaleString() }}</td>
                        <td>{{ factory.establishedYear }}</td>
                        <td>
                            <i
                                class="pi"
                                [ngClass]="{
                                    'text-green-500 pi-check-circle': factory.verified,
                                    'text-red-500 pi-times-circle': !factory.verified
                                }"
                            ></i>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="6">No factories found in this region.</td>
                    </tr>
                </ng-template>
            </p-table>

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
export class RegionalFactoriesDialogComponent {
    @Input() visible: boolean = false;
    @Input() regionName: string = '';
    @Input() factories: Factory[] = [];
    
    @Output() visibleChange = new EventEmitter<boolean>();

    close(): void {
        this.visibleChange.emit(false);
    }
}