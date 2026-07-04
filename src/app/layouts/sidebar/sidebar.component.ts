import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MenuService } from '@/app/services/menu.service';
import { AuthService, PermissionType } from '@/app/core/services/auth.service';
import { convertFlatToTree, TreeItem, FlatItem } from '@/app/utils/tree-utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-16">
      <nav class="p-4">
        <ul class="space-y-1">
          <ng-template #menuRecursive let-items>
            @for (item of items; track item.id) {
              <li>
                @if (item.children?.length) {
                  <div class="menu-item">
                    <button 
                      class="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-left"
                      (click)="toggleExpand(item.id)"
                    >
                      <span class="flex items-center space-x-3">
                        <span class="pi" [ngClass]="item.icon"></span>
                        <span>{{ item.label }}</span>
                      </span>
                      <span 
                        class="pi pi-chevron-down transition-transform duration-200"
                        [class.rotate-180]="expandedItems.has(item.id)"
                      ></span>
                    </button>
                    @if (expandedItems.has(item.id)) {
                      <ul class="ml-4 mt-1 space-y-1">
                        <ng-container *ngTemplateOutlet="menuRecursive; context: { $implicit: item.children }"></ng-container>
                      </ul>
                    }
                  </div>
                }
                
                @if (!item.children?.length) {
                  <a 
                    [routerLink]="item.route || '#'" 
                    class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors block"
                    [class.bg-blue-600]="isActiveRoute(item.route)"
                  >
                    <span class="pi" [ngClass]="item.icon"></span>
                    <span>{{ item.label }}</span>
                  </a>
                }
              </li>
            }
          </ng-template>
          
          <ng-container *ngTemplateOutlet="menuRecursive; context: { $implicit: menuItems }"></ng-container>
        </ul>
      </nav>
    </aside>
  `,
  styles: [`
    aside {
      top: 64px;
      max-height: calc(100vh - 64px);
      overflow-y: auto;
    }
    
    aside::-webkit-scrollbar {
      width: 6px;
    }
    
    aside::-webkit-scrollbar-track {
      background: #1f2937;
    }
    
    aside::-webkit-scrollbar-thumb {
      background: #4b5563;
      border-radius: 3px;
    }
    
    aside::-webkit-scrollbar-thumb:hover {
      background: #6b7280;
    }
    
    .rotate-180 {
      transform: rotate(180deg);
    }
  `]
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: TreeItem[] = [];
  expandedItems = new Set<string>();
  currentRoute = '/';
  private routerSubscription: Subscription | null = null;
  private permissionSubscription: Subscription | null = null;

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadMenu();
    this.setupRouteListener();
    this.setupPermissionListener();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.permissionSubscription) {
      this.permissionSubscription.unsubscribe();
    }
  }

  async loadMenu(): Promise<void> {
    const flatData = await this.menuService.getFlatMenuData();
    const filteredData = this.filterMenuByPermission(flatData);
    this.menuItems = convertFlatToTree(filteredData);
    
    this.currentRoute = this.router.url;
    this.expandParentMenu(this.currentRoute);
    
    this.cdr.detectChanges();
  }

  filterMenuByPermission(flatData: FlatItem[]): FlatItem[] {
    const permission = this.authService.currentPermission;
    
    switch (permission) {
      case 'dashboard':
        return flatData.filter(item => item.id === '1' || item.parentId === '1');
      case 'dashboard-factory':
        return flatData.filter(item => 
          item.id === '1' || item.parentId === '1' ||
          item.id === '2' || item.parentId === '2' || item.parentId?.startsWith('2-')
        );
      case 'dashboard-factory-newhouse':
        return flatData;
      default:
        return flatData;
    }
  }

  setupRouteListener(): void {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.expandParentMenu(this.currentRoute);
        this.cdr.detectChanges();
      }
    });
  }

  setupPermissionListener(): void {
    this.permissionSubscription = this.authService.permission$.subscribe(() => {
      this.loadMenu();
    });
  }

  isActiveRoute(route: string | undefined): boolean {
    if (!route) return false;
    return this.currentRoute === route;
  }

  expandParentMenu(currentRoute: string): void {
    this.expandedItems.clear();
    
    const findAndExpandParent = (items: TreeItem[], targetRoute: string): boolean => {
      for (const item of items) {
        if (item.route === targetRoute) {
          return true;
        }
        if (item.children && item.children.length > 0) {
          const found = findAndExpandParent(item.children, targetRoute);
          if (found) {
            this.expandedItems.add(item.id);
            return true;
          }
        }
      }
      return false;
    };
    
    findAndExpandParent(this.menuItems, currentRoute);
  }

  toggleExpand(itemId: string): void {
    if (this.expandedItems.has(itemId)) {
      this.expandedItems.delete(itemId);
    } else {
      this.expandedItems.add(itemId);
    }
  }
}