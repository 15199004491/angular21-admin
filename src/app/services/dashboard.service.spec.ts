import { TestBed } from '@angular/core/testing';
import { DashboardService, StatCard, Order } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return stats data', async () => {
    const stats = await service.getStats();

    expect(stats).toBeDefined();
    expect(Array.isArray(stats)).toBe(true);
    expect(stats.length).toBeGreaterThan(0);

    stats.forEach(stat => {
      expect(stat.id).toBeDefined();
      expect(stat.title).toBeDefined();
      expect(stat.value).toBeDefined();
      expect(stat.icon).toBeDefined();
      expect(stat.bgColor).toBeDefined();
      expect(stat.iconColor).toBeDefined();
    });
  });

  it('should return recent orders', async () => {
    const orders = await service.getRecentOrders();

    expect(orders).toBeDefined();
    expect(Array.isArray(orders)).toBe(true);
    expect(orders.length).toBeGreaterThan(0);

    orders.forEach(order => {
      expect(order.id).toBeDefined();
      expect(order.orderNumber).toBeDefined();
      expect(order.amount).toBeDefined();
      expect(order.status).toBeDefined();
      expect(order.statusColor).toBeDefined();
    });
  });

  it('should have expected stat titles', async () => {
    const stats = await service.getStats();
    const titles = stats.map(s => s.title);

    expect(titles).toContain('Total Users');
    expect(titles).toContain('Orders');
    expect(titles).toContain('Revenue');
    expect(titles).toContain('Conversion');
  });

  it('should have expected order statuses', async () => {
    const orders = await service.getRecentOrders();
    const statuses = orders.map(o => o.status);

    expect(statuses).toContain('Completed');
    expect(statuses).toContain('Processing');
    expect(statuses).toContain('Shipped');
  });
});