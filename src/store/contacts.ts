import { create } from 'zustand';
import { TrustedContact } from '../features/contacts/models/TrustedContact';

interface ContactsState {
  contacts: TrustedContact[];
  isLoading: boolean;
  setContacts: (contacts: TrustedContact[]) => void;
  addContact: (contact: TrustedContact) => void;
  updateContact: (id: string, contact: Partial<TrustedContact>) => void;
  deleteContact: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useContactsStore = create<ContactsState>((set) => ({
  contacts: [],
  isLoading: false,
  setContacts: (contacts) => set({ contacts }),
  addContact: (contact) => set((state) => ({ contacts: [...state.contacts, contact] })),
  updateContact: (id, contactUpdate) => set((state) => ({
    contacts: state.contacts.map((c) => c.id === id ? { ...c, ...contactUpdate } : c)
  })),
  deleteContact: (id) => set((state) => ({
    contacts: state.contacts.filter((c) => c.id !== id)
  })),
  setLoading: (loading) => set({ isLoading: loading })
}));
