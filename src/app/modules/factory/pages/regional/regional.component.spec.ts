import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegionalComponent } from './regional.component';
import { CommonModule } from '@angular/common';
import { RegionalAddDialogComponent } from './regional-add-dialog.component';
import { RegionalEditDialogComponent } from './regional-edit-dialog.component';
import { RegionalDetailDialogComponent } from './regional-detail-dialog.component';
import { RegionalFactoriesDialogComponent } from './regional-factories-dialog.component';
import { RegionalVacantFactoriesDialogComponent } from './regional-vacant-factories-dialog.component';
import { BaseDialogComponent } from '@/app/components/base-dialog.component';

describe('RegionalComponent', () => {
  let component: RegionalComponent;
  let fixture: ComponentFixture<RegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BaseDialogComponent,
        RegionalComponent,
        RegionalAddDialogComponent,
        RegionalEditDialogComponent,
        RegionalDetailDialogComponent,
        RegionalFactoriesDialogComponent,
        RegionalVacantFactoriesDialogComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});