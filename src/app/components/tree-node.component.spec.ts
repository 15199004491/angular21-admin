import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeNodeComponent } from './tree-node.component';
import { CommonModule } from '@angular/common';
import { TreeItem } from '@/app/utils/tree-utils';

describe('TreeNodeComponent', () => {
  let component: TreeNodeComponent;
  let fixture: ComponentFixture<TreeNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TreeNodeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TreeNodeComponent);
    component = fixture.componentInstance;
    component.node = {
      data: '1',
      label: 'Test Node',
      children: []
    };
    component.expandedItems = [];
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have default expanded state', () => {
    fixture.detectChanges();
    expect(component.expanded).toBe(false);
  });

  it('should toggle expanded state', () => {
    const expandedItems: string[] = [];
    component.node = {
      data: '1',
      label: 'Parent Node',
      children: [{ data: '1-1', label: 'Child', children: [] }]
    };
    component.expandedItems = expandedItems;
    
    expect(component.expanded).toBe(false);
    component.toggleExpand();
    expect(expandedItems.includes('1')).toBe(true);
    component.toggleExpand();
    expect(expandedItems.includes('1')).toBe(false);
  });

  it('should have correct node', () => {
    fixture.detectChanges();
    expect(component.node).toEqual({
      data: '1',
      label: 'Test Node',
      children: []
    });
  });

  it('should not expand if no children', () => {
    component.node = { data: '1', label: 'Leaf', children: [] };
    component.expandedItems = [];
    component.toggleExpand();
    expect(component.expanded).toBe(false);
  });

  it('should have children when children exist', () => {
    component.node = { 
      data: '1', 
      label: 'Parent', 
      children: [
        { data: '1-1', label: 'Child', children: [] }
      ] 
    };
    component.expandedItems = [];
    expect(component.node.children?.length).toBe(1);
  });
});