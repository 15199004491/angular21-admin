import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeData } from './common-tree.component';

@Component({
    selector: 'tree-node',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="tree-node-item" (click)="toggleExpand()">
            @if (node.children && node.children.length > 0) {
                <span class="expand-icon" [class.expanded]="expanded"></span>
            }
            @if (!node.children || node.children.length === 0) {
                <span class="expand-icon-placeholder"></span>
            }
            <span class="node-label" (click)="selectItem($event)">
                {{ node.label }}
            </span>
        </div>
        @if (node.children && expanded) {
            <div class="tree-children">
                @for (child of node.children; track child.data) {
                    <tree-node 
                        [node]="child"
                        [expandedItems]="expandedItems"
                        (nodeSelected)="onNodeSelected($event)"
                    ></tree-node>
                }
            </div>
        }
    `,
    styles: [`
        .tree-node-item {
            display: flex;
            align-items: center;
            gap: 0.375rem;
            padding: 0.25rem 0.375rem;
            cursor: pointer;
            border-radius: 4px;
        }
        .tree-node-item:hover {
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
    `]
})
export class TreeNodeComponent {
    @Input() node!: TreeData;
    @Input() expandedItems!: string[];
    @Output() nodeSelected = new EventEmitter<TreeData>();

    get expanded(): boolean {
        return this.expandedItems.includes(this.node.data);
    }

    toggleExpand() {
        if (!this.node.children || this.node.children.length === 0) return;
        
        const index = this.expandedItems.indexOf(this.node.data);
        if (index > -1) {
            this.expandedItems.splice(index, 1);
        } else {
            this.expandedItems.push(this.node.data);
        }
    }

    selectItem(event: Event) {
        event.stopPropagation();
        this.nodeSelected.emit(this.node);
    }

    onNodeSelected(node: TreeData) {
        this.nodeSelected.emit(node);
    }
}