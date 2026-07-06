import { TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return flat menu data', async () => {
    const menuData = await service.getFlatMenuData();

    expect(menuData).toBeDefined();
    expect(Array.isArray(menuData)).toBe(true);
    expect(menuData.length).toBeGreaterThan(0);
  });

  it('should return unique data each time', async () => {
    const menuData1 = await service.getFlatMenuData();
    const menuData2 = await service.getFlatMenuData();

    expect(menuData1).not.toBe(menuData2);
    expect(menuData1).toEqual(menuData2);
  });

  it('should contain expected menu items', async () => {
    const menuData = await service.getFlatMenuData();

    const dashboardItem = menuData.find(item => item.label === 'Dashboard');
    expect(dashboardItem).toBeDefined();
    expect(dashboardItem?.route).toBe('/');

    const factoryItem = menuData.find(item => item.label === 'Factory');
    expect(factoryItem).toBeDefined();

    const newHouseItem = menuData.find(item => item.label === 'New House');
    expect(newHouseItem).toBeDefined();
  });

  it('should have correct parent-child relationships', async () => {
    const menuData = await service.getFlatMenuData();

    const regionalItem = menuData.find(item => item.label === 'Regional' && item.parentId === '2');
    expect(regionalItem).toBeDefined();

    const factoryListItem = menuData.find(item => item.label === 'Factory List' && item.parentId === '2');
    expect(factoryListItem).toBeDefined();
  });
});