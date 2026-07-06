import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonTreeComponent } from './common-tree.component';
import { CommonModule } from '@angular/common';
import { TreeNodeComponent } from './tree-node.component';
import { MenuService } from '@/app/services/menu.service';
import { vi } from 'vitest';

describe('CommonTreeComponent', () => {
  let component: CommonTreeComponent;
  let fixture: ComponentFixture<CommonTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, CommonTreeComponent, TreeNodeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CommonTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial tree data', () => {
    expect(component.treeData).toBeDefined();
    expect(component.treeData.length).toBeGreaterThan(0);
  });
});