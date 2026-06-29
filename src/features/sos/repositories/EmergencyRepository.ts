import { collection, doc, setDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../core/firebase/config';
import { EmergencySession, LocationUpdate } from '../models/EmergencySession';

export const EmergencyRepository = {
  async createSession(userId: string, contactsNotified: string[]): Promise<EmergencySession> {
    const docRef = doc(collection(db, 'emergency_sessions'));
    const session: EmergencySession = {
      id: docRef.id,
      userId,
      startTime: new Date().toISOString(),
      endTime: null,
      status: 'active',
      contactsNotified
    };
    await setDoc(docRef, {
      ...session,
      startTime: serverTimestamp() // Overwrite with server time in DB
    });
    return session;
  },

  async resolveSession(sessionId: string): Promise<void> {
    const docRef = doc(db, 'emergency_sessions', sessionId);
    await updateDoc(docRef, {
      status: 'resolved',
      endTime: serverTimestamp()
    });
  },

  async logLocation(sessionId: string, location: LocationUpdate): Promise<void> {
    const colRef = collection(db, 'emergency_sessions', sessionId, 'location_updates');
    await addDoc(colRef, {
      ...location,
      serverTime: serverTimestamp()
    });
  }
};
