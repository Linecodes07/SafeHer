import { collection, doc, setDoc, getDocs, deleteDoc, query, updateDoc } from 'firebase/firestore';
import { db } from '../../../core/firebase/config';
import { TrustedContact } from '../models/TrustedContact';

export const ContactRepository = {
  getCollectionRef: (userId: string) => collection(db, 'users', userId, 'trusted_contacts'),

  async getContacts(userId: string): Promise<TrustedContact[]> {
    const q = query(ContactRepository.getCollectionRef(userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TrustedContact));
  },

  async addContact(userId: string, contact: Omit<TrustedContact, 'id'>): Promise<TrustedContact> {
    const docRef = doc(ContactRepository.getCollectionRef(userId));
    const newContact = { ...contact, id: docRef.id };
    await setDoc(docRef, newContact);
    return newContact as TrustedContact;
  },

  async updateContact(userId: string, contactId: string, data: Partial<TrustedContact>): Promise<void> {
    const docRef = doc(db, 'users', userId, 'trusted_contacts', contactId);
    await updateDoc(docRef, data);
  },

  async deleteContact(userId: string, contactId: string): Promise<void> {
    const docRef = doc(db, 'users', userId, 'trusted_contacts', contactId);
    await deleteDoc(docRef);
  }
};
