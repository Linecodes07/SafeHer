export interface TrustedContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  relationship: string;
  isPrimary: boolean;
  notifyViaSms: boolean;
  notifyViaEmail: boolean;
  createdAt: string;
}
