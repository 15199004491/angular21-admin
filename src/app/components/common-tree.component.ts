import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TreeData {
    label: string;
    data: string;
    children?: TreeData[];
}

@Component({
    selector: 'common-tree',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="common-tree-dropdown" style="min-width: 25rem;">
            <div class="search-input-wrapper">
                <input 
                    type="text" 
                    class="search-input" 
                    placeholder="Search or select organization..." 
                    [(ngModel)]="searchKeyword"
                    (input)="handleSearch()"
                    (focus)="openDropdown()"
                >
                <button class="dropdown-arrow-btn" (click)="toggleDropdown()">
                    <span class="dropdown-arrow" [class.expanded]="isOpen"></span>
                </button>
            </div>
            
            <div *ngIf="isOpen" class="dropdown-panel">
                <div class="tree-content">
                    <div 
                        *ngFor="let item of filteredTreeData" 
                        class="tree-node"
                    >
                        <div class="tree-item" (click)="toggleExpand(item)">
                            <span class="expand-icon" *ngIf="item.children && item.children.length > 0" [class.expanded]="expandedItems.includes(item.data)"></span>
                            <span *ngIf="!item.children || item.children.length === 0" class="expand-icon-placeholder"></span>
                            <span class="node-label" (click)="selectItem(item)">
                                {{ item.label }}
                            </span>
                        </div>
                        <div 
                            *ngIf="item.children && expandedItems.includes(item.data)" 
                            class="tree-children"
                        >
                            <div *ngFor="let child of getVisibleChildren(item.children)" class="tree-child">
                                <div class="tree-item" (click)="toggleExpand(child)">
                                    <span class="expand-icon" *ngIf="child.children && child.children.length > 0" [class.expanded]="expandedItems.includes(child.data)"></span>
                                    <span *ngIf="!child.children || child.children.length === 0" class="expand-icon-placeholder"></span>
                                    <span class="node-label" (click)="selectItem(child)">
                                        {{ child.label }}
                                    </span>
                                </div>
                                <div 
                                    *ngIf="child.children && expandedItems.includes(child.data)" 
                                    class="tree-grandchildren"
                                >
                                    <div *ngFor="let grandchild of getVisibleChildren(child.children)" class="tree-grandchild">
                                        <span class="expand-icon" *ngIf="grandchild.children && grandchild.children.length > 0" [class.expanded]="expandedItems.includes(grandchild.data)"></span>
                                        <span *ngIf="!grandchild.children || grandchild.children.length === 0" class="expand-icon-placeholder"></span>
                                        <span class="node-label" (click)="selectItem(grandchild)">
                                            {{ grandchild.label }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="filteredTreeData.length === 0" class="no-results">
                        No results found
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .common-tree-dropdown {
            position: relative;
        }
        .search-input-wrapper {
            display: flex;
            align-items: center;
            border: 1px solid #ced4da;
            border-radius: 4px;
            background: white;
            overflow: hidden;
        }
        .search-input-wrapper:focus-within {
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
        }
        .search-input {
            flex: 1;
            padding: 0.5rem 0.75rem;
            border: none;
            font-size: 0.875rem;
            outline: none;
            background: transparent;
        }
        .search-input::placeholder {
            color: #6c757d;
        }
        .dropdown-arrow-btn {
            padding: 0.5rem 0.75rem;
            border: none;
            background: transparent;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .dropdown-arrow-btn:hover {
            background: #f8f9fa;
        }
        .no-results {
            padding: 1rem;
            text-align: center;
            color: #6c757d;
            font-size: 0.875rem;
        }
        .dropdown-arrow {
            width: 0.5rem;
            height: 0.5rem;
            position: relative;
            transition: transform 0.2s;
            flex-shrink: 0;
        }
        .dropdown-arrow::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0.35rem;
            height: 0.35rem;
            border-right: 1px solid #6c757d;
            border-bottom: 1px solid #6c757d;
            transform: translate(-50%, -50%) rotate(-45deg);
            transition: transform 0.2s;
        }
        .dropdown-arrow.expanded::before {
            transform: translate(-50%, -50%) rotate(135deg);
        }
        .dropdown-panel {
            position: absolute;
            top: calc(100% + 2px);
            left: 0;
            right: 0;
            border: 1px solid #ced4da;
            border-radius: 4px;
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            max-height: 300px;
            overflow-y: auto;
        }
        .tree-content {
            padding: 0.25rem;
        }
        .tree-item {
            display: flex;
            align-items: center;
            gap: 0.375rem;
            padding: 0.25rem 0.375rem;
            cursor: pointer;
            border-radius: 4px;
        }
        .tree-item:hover {
            background-color: #f8f9fa;
        }
        .expand-icon {
            width: 0.75rem;
            height: 0.75rem;
            position: relative;
            cursor: pointer;
            flex-shrink: 0;
            transition: transform 0.2s;
        }
        .expand-icon::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0.4rem;
            height: 0.4rem;
            border-right: 1px solid #6c757d;
            border-bottom: 1px solid #6c757d;
            transform: translate(-50%, -50%) rotate(-45deg);
            transition: transform 0.2s;
        }
        .expand-icon.expanded::before {
            transform: translate(-50%, -50%) rotate(45deg);
        }
        .expand-icon-placeholder {
            width: 0.75rem;
            height: 0.75rem;
            flex-shrink: 0;
        }
        .node-label {
            font-size: 0.875rem;
            color: #212529;
            cursor: pointer;
        }
        .node-label:hover {
            color: #0d6efd;
        }
        .tree-children {
            padding-left: 1rem;
        }
        .tree-child {
            margin-top: 0.125rem;
        }
        .tree-grandchildren {
            padding-left: 1rem;
        }
        .tree-grandchild {
            display: flex;
            align-items: center;
            gap: 0.375rem;
            padding: 0.25rem 0.375rem;
            cursor: pointer;
            border-radius: 4px;
            margin-top: 0.125rem;
        }
        .tree-grandchild:hover {
            background-color: #f8f9fa;
        }
    `]
})
export class CommonTreeComponent {
    @Output() nodeSelected = new EventEmitter<TreeData | null>();

    selectedItem: TreeData | null = null;
    expandedItems: string[] = [];
    isOpen = false;
    searchKeyword = '';
    filteredTreeData: TreeData[] = [];

    treeData: TreeData[] = [
        {
            label: 'Xinjiang Province',
            data: 'xinjiang',
            children: [
                {
                    label: 'Urumqi',
                    data: 'urumqi',
                    children: [
                        { label: 'Tianshan District', data: 'tianshan' },
                        { label: 'Saybagh District', data: 'saybagh' },
                        { label: 'Shuimogou District', data: 'shuimogou' }
                    ]
                },
                {
                    label: 'Shihezi',
                    data: 'shihezi',
                    children: [
                        {
                            label: 'Shawan',
                            data: 'shawan',
                            children: [
                                { label: 'Shawan Town', data: 'shawan-town' },
                                { label: 'Huangguan Town', data: 'huangguan' }
                            ]
                        },
                        {
                            label: 'Tacheng',
                            data: 'tacheng',
                            children: [
                                { label: 'Yumin County', data: 'yumin' },
                                { label: 'Emin County', data: 'emin' },
                                { label: 'Jinghe County', data: 'jinghe' }
                            ]
                        }
                    ]
                },
                {
                    label: 'Kashgar',
                    data: 'kashgar',
                    children: [
                        { label: 'Kashgar City', data: 'kashgar-city' },
                        { label: 'Yecheng County', data: 'yecheng' }
                    ]
                },
                {
                    label: 'Aksu',
                    data: 'aksu',
                    children: [
                        { label: 'Aksu City', data: 'aksu-city' },
                        { label: 'Kuqa County', data: 'kuqa' }
                    ]
                }
            ]
        },
        {
            label: 'Guangdong Province',
            data: 'guangdong',
            children: [
                {
                    label: 'Guangzhou',
                    data: 'guangzhou',
                    children: [
                        { label: 'Tianhe District', data: 'tianhe' },
                        { label: 'Zhujiang New Town', data: 'zhujiang' }
                    ]
                },
                {
                    label: 'Shenzhen',
                    data: 'shenzhen',
                    children: [
                        { label: 'Futian District', data: 'futian' },
                        { label: 'Nanshan District', data: 'nanshan' }
                    ]
                }
            ]
        },
        {
            label: 'Beijing',
            data: 'beijing',
            children: [
                { label: 'Chaoyang District', data: 'chaoyang' },
                { label: 'Haidian District', data: 'haidian' },
                { label: 'Xicheng District', data: 'xicheng' }
            ]
        }
    ];

    toggleDropdown() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.filteredTreeData = [...this.treeData];
        }
    }

    openDropdown() {
        if (!this.isOpen) {
            this.isOpen = true;
            this.filteredTreeData = [...this.treeData];
        }
    }

    handleSearch() {
        this.openDropdown();
        this.filterTreeData();
    }

    filterTreeData() {
        const keyword = this.searchKeyword.toLowerCase().trim();
        if (!keyword) {
            this.filteredTreeData = [...this.treeData];
            return;
        }

        this.filteredTreeData = this.treeData.map(item => this.filterNode(item, keyword)).filter(item => item !== null);
    }

    filterNode(node: TreeData, keyword: string): TreeData | null {
        const matches = node.label.toLowerCase().includes(keyword);
        
        let filteredChildren: TreeData[] = [];
        if (node.children) {
            filteredChildren = node.children
                .map(child => this.filterNode(child, keyword))
                .filter((child): child is TreeData => child !== null);
        }

        if (matches || filteredChildren.length > 0) {
            return {
                ...node,
                children: filteredChildren.length > 0 ? filteredChildren : undefined
            };
        }

        return null;
    }

    getVisibleChildren(children: TreeData[]): TreeData[] {
        const keyword = this.searchKeyword.toLowerCase().trim();
        if (!keyword) {
            return children;
        }
        return children.filter(child => 
            child.label.toLowerCase().includes(keyword) ||
            (child.children && child.children.some(grandchild => 
                grandchild.label.toLowerCase().includes(keyword)
            ))
        );
    }

    toggleExpand(item: TreeData) {
        if (!item.children || item.children.length === 0) return;
        
        const index = this.expandedItems.indexOf(item.data);
        if (index > -1) {
            this.expandedItems.splice(index, 1);
        } else {
            this.expandedItems.push(item.data);
        }
    }

    selectItem(item: TreeData) {
        this.selectedItem = item;
        this.searchKeyword = item.label;
        this.isOpen = false;
        this.nodeSelected.emit(item);
    }

    clearSelection() {
        this.selectedItem = null;
        this.searchKeyword = '';
        this.nodeSelected.emit(null);
    }
}