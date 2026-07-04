import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Factory } from '@/app/modules/factory/models/factory.model';

@Component({
    selector: 'regional-vacant-factories-dialog',
    standalone: true,
    imports: [CommonModule, ButtonModule, DialogModule, TableModule, ConfirmDialogModule],
    providers: [ConfirmationService],
    template: `
        <p-dialog 
            header="Unsettled Factories to {{ regionName }}" 
            [(visible)]="visible" 
            [modal]="true" 
            [style]="{ width: '80%' }"
            [focusTrap]="false"
            (onHide)="close()"
        >
            <p-table
                [value]="vacantFactories"
                dataKey="id"
                [paginator]="true"
                [rows]="10"
                [rowsPerPageOptions]="[10, 25, 50]"
                [tableStyle]="{ 'min-width': '70rem' }"
            >
                <ng-template #header>
                    <tr>
                        <th style="width:3rem">ID</th>
                        <th style="width:18%">Factory Name</th>
                        <th style="width:13%">Current Location</th>
                        <th style="width:10%">Employees</th>
                        <th style="width:12%">Established Year</th>
                        @if (readonly) {<th style="width:42%">Details</th>}
                        @if (!readonly) {<th style="width:25%">Details</th>}
                        @if (!readonly) {<th style="width:19%">Actions</th>}
                    </tr>
                </ng-template>
                <ng-template #body let-factory>
                    <tr>
                        <td>{{ factory.id }}</td>
                        <td>{{ factory.name }}</td>
                        <td>{{ factory.location }}</td>
                        <td>{{ factory.employeeCount.toLocaleString() }}</td>
                        <td>{{ factory.establishedYear }}</td>
                        <td class="text-justify text-sm">{{ factory.details }}</td>
                        @if (!readonly) {
                            <td>
                                <div class="flex gap-2">
                                    <p-button 
                                        label="Delete" 
                                        icon="pi pi-trash"
                                        [rounded]="true" 
                                        severity="danger"
                                        size="small"
                                        (click)="confirmDelete(factory)"
                                    ></p-button>
                                    <p-button 
                                        label="Settled" 
                                        icon="pi pi-check"
                                        [rounded]="true" 
                                        severity="success"
                                        size="small"
                                        (click)="confirmSettled(factory)"
                                    ></p-button>
                                </div>
                            </td>
                        }
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td [attr.colspan]="readonly ? 6 : 7">No unsettled factories available.</td>
                    </tr>
                </ng-template>
            </p-table>

            @if (!readonly) {
                <p-confirmDialog 
                    [style]="{ width: '450px' }"
                    header="Confirm Deletion"
                    icon="pi pi-exclamation-triangle"
                ></p-confirmDialog>
            }
        </p-dialog>
    `
})
export class RegionalVacantFactoriesDialogComponent {
    private confirmationService = inject(ConfirmationService);

    @Input() visible: boolean = false;
    @Input() regionName: string = '';
    @Input() vacantFactories: Factory[] = [];
    @Input() readonly: boolean = false;
    
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() delete = new EventEmitter<Factory>();
    @Output() settled = new EventEmitter<Factory>();

    confirmDelete(factory: Factory): void {
        if (this.readonly) return;
        this.confirmationService.confirm({
            message: `Are you sure you want to delete "${factory.name}"?`,
            accept: () => {
                this.delete.emit(factory);
            },
            reject: () => {
                // Do nothing on cancel
            }
        });
    }

    confirmSettled(factory: Factory): void {
        if (this.readonly) return;
        this.confirmationService.confirm({
            message: `Are you sure "${factory.name}" has settled? This will remove it from the unsettled factories list.`,
            accept: () => {
                this.settled.emit(factory);
            },
            reject: () => {
                // Do nothing on cancel
            }
        });
    }

    close(): void {
        this.visibleChange.emit(false);
    }
}