import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../auth';

describe('Auth Store', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isAuthInitialized: false,
      isOnboardingComplete: false,
      isBiometricEnabled: false,
    });
  });

  it('should complete onboarding', () => {
    useAuthStore.getState().completeOnboarding();
    expect(useAuthStore.getState().isOnboardingComplete).toBe(true);
  });

  it('should set user on login', () => {
    const mockUser = {
      uid: '123',
      email: 'test@example.com',
      phoneNumber: null,
      displayName: 'Test User',
      emailVerified: true,
    };
    
    useAuthStore.getState().setUser(mockUser);
    expect(useAuthStore.getState().user).toEqual(mockUser);
  });

  it('should clear user on logout', () => {
    useAuthStore.setState({ user: { uid: '123', email: '', phoneNumber: null, displayName: null, emailVerified: true } });
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().user).toBeNull();
  });
});
