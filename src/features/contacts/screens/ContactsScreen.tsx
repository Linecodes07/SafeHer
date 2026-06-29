import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Plus, Star, Phone, Mail, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../../components/ui/Button';
import { useContactsStore } from '../../../store/contacts';
import { useAuthStore } from '../../../store/auth';
import { ContactRepository } from '../repositories/ContactRepository';

export const ContactsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { contacts, setContacts, isLoading, setLoading, deleteContact } = useContactsStore();

  useEffect(() => {
    const fetchContacts = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const fetchedContacts = await ContactRepository.getContacts(user.uid);
        setContacts(fetchedContacts);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [user, setContacts, setLoading]);

  const handleDelete = async (id: string) => {
    if (!user) return;
    try {
      await ContactRepository.deleteContact(user.uid, id);
      deleteContact(id);
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trusted Contacts</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage who receives your SOS alerts.</p>
        </div>
        <Button onClick={() => navigate('/app/contacts/add')} size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600"></div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-16 dark:border-gray-700">
            <Users className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No contacts added</h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Add trusted people to receive emergency alerts.</p>
            <Button onClick={() => navigate('/app/contacts/add')} variant="secondary">Add Contact</Button>
          </div>
        ) : (
          contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-lg font-bold text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                    {contact.isPrimary && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{contact.relationship} • {contact.phone}</p>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(contact.id)}
                className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};
