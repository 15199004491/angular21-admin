import { Component, OnInit, inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { Region, Factory } from '@/app/modules/factory/models/factory.model';
import { RegionalAddDialogComponent } from './regional-add-dialog.component';
import { RegionalEditDialogComponent } from './regional-edit-dialog.component';
import { RegionalDetailDialogComponent } from './regional-detail-dialog.component';
import { RegionalFactoriesDialogComponent } from './regional-factories-dialog.component';
import { CommonTreeComponent } from '@/app/components/common-tree.component';
import { regionalMock } from '@/app/modules/factory/services/regional.mock';
import { factoryMock } from '@/app/modules/factory/services/factory.mock';
import { regionTypeLabels, regionTypeClasses } from '@/app/modules/factory/mock/factory.mock';

@Component({
    selector: 'regional',
    standalone: true,
    imports: [CommonModule, SelectModule, IconFieldModule, InputIconModule, TableModule, TagModule, InputTextModule, FormsModule, ButtonModule, CheckboxModule, CommonTreeComponent, RegionalAddDialogComponent, RegionalEditDialogComponent, RegionalDetailDialogComponent, RegionalFactoriesDialogComponent],
    providers: [MessageService],
    template: `
        <div class="card">
            <p-table
                #dt2
                [value]="regions"
                dataKey="code"
                [rows]="10"
                [rowsPerPageOptions]="[10, 25, 50]"
                [loading]="loading"
                [paginator]="true"
                [globalFilterFields]="['name', 'code']"
                [tableStyle]="{ 'min-width': '75rem' }"
                selectionMode="multiple"
                [(selection)]="selectedRegions"
            >
                <ng-template #caption>
                    <div class="flex justify-between items-center py-4">
                        <div class="flex items-center gap-2">
                            <common-tree #treeComponent (nodeSelected)="onNodeSelect($event)"></common-tree>
                            <p-button label="Reset" icon="pi pi-refresh" (click)="resetFilter()" severity="success"></p-button>
                        </div>
                        <div class="flex items-center gap-2">
                            <p-button 
                                label="Add Region" 
                                icon="pi pi-plus" 
                                severity="success" 
                                (click)="showAddDialog()" 
                            />
                            <p-button 
                                label="Delete Selected" 
                                icon="pi pi-trash" 
                                severity="danger" 
                                [disabled]="selectedRegions.length === 0"
                                (click)="deleteSelected()" 
                            />
                        </div>
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th style="width:3rem">
                            <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                        </th>
                        <th style="width:15%">Region Code</th>
                        <th style="width:20%">Region Name</th>
                        <th style="width:12%">Regional Type</th>
                        <th class="center-text" style="width:15%">Settled Factory</th>
                        <th class="center-text" style="width:15%">Unsettled Factory</th>
                        <th style="width:18%">Created Date</th>
                        <th style="width:15%">Actions</th>
                    </tr>
                </ng-template>
                <ng-template #body let-region>
                    <tr>
                        <td>
                            <p-tableCheckbox [value]="region"></p-tableCheckbox>
                        </td>
                        <td>{{ region.code }}</td>
                        <td>{{ region.name }}</td>
                        <td class="text-center">
                            <p-tag 
                                [value]="getRegionTypeLabel(region.type)" 
                                [severity]="getRegionTypeSeverity(region.type)"
                                [style]="region.type === 'military' ? { color: '#10b981', backgroundColor: '#d1fae5', fontWeight: 'normal' } : { fontWeight: 'normal' }"
                            />
                        </td>
                        <td class="center-text">
                            <span 
                                class="text-green-600 underline underline-offset-2 cursor-pointer hover:text-green-700 transition-colors"
                                (click)="showFactoriesDialog(region.name)"
                            >
                                {{ getFactoryCount(region.name) }}
                            </span>
                        </td>
                        <td class="center-text">
                            <span 
                                class="text-green-600 underline underline-offset-2 cursor-pointer hover:text-green-700 transition-colors"
                                (click)="showFactoriesDialog(region.name)"
                            >
                                {{ getUnoccupiedCount(region.name) }}
                            </span>
                        </td>
                        <td>{{ region.createdDate }}</td>
                        <td>
                            <div class="flex gap-2">
                                <p-button 
                                    label="Edit" 
                                    icon="pi pi-file-edit"
                                    [rounded]="true" 
                                    severity="success"
                                    size="small"
                                    (click)="showEditDialog(region)"
                                    [style]="{ backgroundColor: '#f0fdf4', color: '#16a34a', borderColor: '#bbf7d0' }"
                                ></p-button>
                                <p-button 
                                    label="Detail" 
                                    icon="pi pi-file"
                                    [rounded]="true" 
                                    severity="secondary"
                                    size="small"
                                    (click)="showDetailDialog(region)"
                                    [style]="{ backgroundColor: '#f9fafb', color: '#374151', borderColor: '#e5e7eb' }"
                                ></p-button>
                            </div>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="7">No regions found.</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>

        <regional-add-dialog 
            [(visible)]="addDialogVisible" 
            [region]="newRegion"
            (confirmed)="handleAddRegion($event)"
        ></regional-add-dialog>

        <regional-edit-dialog 
            [(visible)]="editDialogVisible" 
            [region]="selectedRegion"
            [allFactories]="factories"
            (confirmed)="handleEditRegion($event)"
            (factoriesAdded)="handleAddFactoriesToRegion($event)"
        ></regional-edit-dialog>

        <regional-detail-dialog 
            [(visible)]="detailDialogVisible" 
            [region]="detailRegion"
            [allFactories]="factories"
        ></regional-detail-dialog>

        <regional-factories-dialog 
            [(visible)]="factoriesDialogVisible" 
            [regionName]="selectedRegionName"
            [factories]="regionFactories"
        ></regional-factories-dialog>
    `
})
export class RegionalComponent implements OnInit {
    private messageService = inject(MessageService);
    private cdr = inject(ChangeDetectorRef);
    @ViewChild('treeComponent') treeComponent!: CommonTreeComponent;
    regions: Region[] = [];
    allRegions: Region[] = [];
    factories: Factory[] = [];
    loading: boolean = true;
    searchKeyword: string = '';
    searchField: string = '';
    selectedRegions: Region[] = [];
    
    addDialogVisible: boolean = false;
    editDialogVisible: boolean = false;
    detailDialogVisible: boolean = false;
    factoriesDialogVisible: boolean = false;
    selectedRegion: Region | null = null;
    detailRegion: Region | null = null;
    selectedRegionName: string = '';
    regionFactories: Factory[] = [];

    newRegion: Region = {
        name: '',
        code: '',
        type: 'local',
        createdDate: ''
    };

    ngOnInit() {
        this.loadData();
    }

    async loadData(): Promise<void> {
        this.loading = true;
        this.allRegions = await regionalMock.getRegions();
        this.regions = [...this.allRegions];
        this.factories = await factoryMock.getFactories();
        this.loading = false;
        this.cdr.detectChanges();
    }

    getFactoryCount(regionName: string): number {
        return this.factories.filter(f => f.location.toLowerCase() === regionName.toLowerCase()).length;
    }

    getUnoccupiedCount(regionName: string): number {
        const maxCapacity = 10;
        const settledCount = this.getFactoryCount(regionName);
        return Math.max(0, maxCapacity - settledCount);
    }

    getRegionTypeLabel(type: string): string {
        return regionTypeLabels[type] || 'Local';
    }

    getRegionTypeSeverity(type: string): 'success' | 'warn' {
        return type === 'military' ? 'success' : 'warn';
    }

    showFactoriesDialog(regionName: string) {
        this.selectedRegionName = regionName;
        this.regionFactories = this.factories.filter(f => 
            f.location.toLowerCase() === regionName.toLowerCase()
        );
        this.factoriesDialogVisible = true;
    }

    search(table: Table) {
        if (this.searchField) {
            table.filter(this.searchKeyword, this.searchField, 'contains');
        } else {
            table.filterGlobal(this.searchKeyword, 'contains');
        }
    }

    clearFilters(table: Table) {
        table.clear();
        this.searchKeyword = '';
        this.searchField = '';
    }

    onNodeSelect(selectedNode: { label: string; data: string } | null) {
        if (selectedNode) {
            this.messageService.add({ 
                severity: 'info', 
                summary: 'Organization Selected', 
                detail: `Selected: ${selectedNode.label}` 
            });
            
            const selectedData = selectedNode.data;
            this.filterRegionsByOrg(selectedData);
        } else {
            this.regions = [...this.allRegions];
        }
    }

    filterRegionsByOrg(orgData: string) {
        this.regions = this.allRegions.filter(region => 
            region.name.toLowerCase().includes(orgData.toLowerCase()) ||
            orgData.toLowerCase().includes(region.name.toLowerCase())
        );
        this.cdr.detectChanges();
    }

    resetFilter() {
        this.treeComponent?.clearSelection();
        this.regions = [...this.allRegions];
    }

    deleteSelected() {
        if (this.selectedRegions.length > 0) {
            const selectedCodes = this.selectedRegions.map(r => r.code);
            this.regions = this.regions.filter(r => !selectedCodes.includes(r.code));
            this.selectedRegions = [];
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Selected regions deleted successfully!' });
        }
    }

    async deleteRegion(region: Region) {
        await regionalMock.deleteRegion({ code: region.code });
        this.regions = this.regions.filter(r => r.code !== region.code);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Region deleted successfully!' });
    }

    showAddDialog() {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0];
        this.newRegion = {
            name: '',
            code: '',
            type: 'local',
            createdDate: `${dateStr} ${timeStr}`
        };
        this.addDialogVisible = true;
    }

    showEditDialog(region: Region) {
        this.selectedRegion = region;
        this.editDialogVisible = true;
    }

    showDetailDialog(region: Region) {
        this.detailRegion = region;
        this.detailDialogVisible = true;
    }

    async handleAddRegion(event: any) {
        const region = event as Region;
        const newRegion = await regionalMock.createRegion(region);
        this.regions.unshift(newRegion);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Region added successfully!' });
    }

    async handleEditRegion(event: any) {
        const updatedRegion = event as Region;
        await regionalMock.updateRegion({ code: updatedRegion.code, data: updatedRegion });
        const index = this.regions.findIndex(r => r.code === updatedRegion.code);
        if (index !== -1) {
            this.regions[index] = updatedRegion;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Region updated successfully!' });
        }
    }

    handleAddFactoriesToRegion(event: { regionName: string; factories: any[] }) {
        if (event.regionName === 'delete') {
            // Delete factories
            const factoryIds = event.factories.map(f => f.id);
            this.factories = this.factories.filter(f => !factoryIds.includes(f.id));
            this.messageService.add({ 
                severity: 'success', 
                summary: 'Success', 
                detail: `${event.factories.length} factory(s) deleted successfully!` 
            });
        } else {
            // Assign factories to region
            event.factories.forEach(factory => {
                factory.location = event.regionName;
            });
            this.messageService.add({ 
                severity: 'success', 
                summary: 'Success', 
                detail: `${event.factories.length} factory(s) added to ${event.regionName} successfully!` 
            });
        }
        this.cdr.detectChanges();
    }
}