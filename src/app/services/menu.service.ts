// src/app/services/menu.service.ts
import { Injectable } from '@angular/core';
import { FlatItem } from '../utils/tree-utils';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // 模拟接口返回的平级数据
  private flatMenuData: FlatItem[] = [
    // 一级菜单
    { id: '1', parentId: null, label: 'Dashboard', icon: 'pi pi-home', route: '/' },
    { id: '2', parentId: null, label: 'Users', icon: 'pi pi-users', route: '/users' },
    { id: '3', parentId: null, label: 'Orders', icon: 'pi pi-file-text', route: '/orders' },
    { id: '4', parentId: null, label: 'Products', icon: 'pi pi-box' },
    { id: '5', parentId: null, label: 'Reports', icon: 'pi pi-chart-bar', route: '/reports' },
    { id: '6', parentId: null, label: 'Settings', icon: 'pi pi-settings', route: '/settings' },
    
    // 二级菜单 (Products 的子菜单)
    { id: '4-1', parentId: '4', label: 'All Products', route: '/products' },
    { id: '4-2', parentId: '4', label: 'Categories', route: '/products/categories' },
    { id: '4-3', parentId: '4', label: 'Inventory', route: '/products/inventory' },
    
    // 三级菜单 (Categories 的子菜单)
    { id: '4-2-1', parentId: '4-2', label: 'Electronics', route: '/products/categories/electronics' },
    { id: '4-2-2', parentId: '4-2', label: 'Clothing', route: '/products/categories/clothing' },
    { id: '4-2-3', parentId: '4-2', label: 'Books', route: '/products/categories/books' },
    
    // 四级菜单 (Electronics 的子菜单)
    { id: '4-2-1-1', parentId: '4-2-1', label: 'Smartphones', route: '/products/categories/electronics/smartphones' },
    { id: '4-2-1-2', parentId: '4-2-1', label: 'Laptops', route: '/products/categories/electronics/laptops' },
    { id: '4-2-1-3', parentId: '4-2-1', label: 'Tablets', route: '/products/categories/electronics/tablets' },
    
    // Users 的子菜单
    { id: '2-1', parentId: '2', label: 'User List', route: '/users/list' },
    { id: '2-2', parentId: '2', label: 'Roles', route: '/users/roles' },
    { id: '2-3', parentId: '2', label: 'Permissions', route: '/users/permissions' },
  ];

  /**
   * 模拟接口调用，返回平级数据
   */
  getFlatMenuData(): Promise<FlatItem[]> {
    return new Promise(resolve => {
      // 模拟网络延迟
      setTimeout(() => {
        resolve([...this.flatMenuData]);
      }, 500);
    });
  }
}