import { describe, it, expect, beforeEach } from 'vitest';
import { useSosStore } from '../sos';

describe('SOS Store', () => {
  beforeEach(() => {
    useSosStore.setState({
      isActive: false,
      sessionId: null,
      sessionStartTime: null,
      currentLocation: null,
      isLocationSharingPaused: false,
    });
  });

  it('should activate SOS', () => {
    useSosStore.getState().activateSos('session_1');
    expect(useSosStore.getState().isActive).toBe(true);
    expect(useSosStore.getState().sessionId).toBe('session_1');
    expect(useSosStore.getState().sessionStartTime).not.toBeNull();
  });

  it('should update location', () => {
    const loc = { latitude: 10, longitude: 20, accuracy: 5, timestamp: 1234 };
    useSosStore.getState().updateLocation(loc);
    expect(useSosStore.getState().currentLocation).toEqual(loc);
  });
});
