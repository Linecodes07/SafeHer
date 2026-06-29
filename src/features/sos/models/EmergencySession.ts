export interface EmergencySession {
  id: string;
  userId: string;
  startTime: string;
  endTime: string | null;
  status: 'active' | 'resolved';
  contactsNotified: string[];
}

export interface LocationUpdate {
  timestamp: string;
  latitude: number;
  longitude: number;
  accuracy: number;
}
