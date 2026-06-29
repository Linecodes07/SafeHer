import { describe, it, expect, beforeEach } from 'vitest';
import { useDashboardStore } from '../dashboard';

describe('Dashboard Store', () => {
  beforeEach(() => {
    useDashboardStore.setState({
      unreadNotificationCount: 2,
      recentWellnessMood: null,
    });
  });

  it('should update unread notification count', () => {
    useDashboardStore.getState().setUnreadNotificationCount(5);
    expect(useDashboardStore.getState().unreadNotificationCount).toBe(5);
  });

  it('should update recent wellness mood', () => {
    useDashboardStore.getState().setRecentWellnessMood('great');
    expect(useDashboardStore.getState().recentWellnessMood).toBe('great');
  });
});
