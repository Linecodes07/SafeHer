import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { ContactRepository } from '../repositories/ContactRepository';
import { useAuthStore } from '../../../store/auth';
import { useContactsStore } from '../../../store/contacts';

export const ContactFormScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addContact } = useContactsStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    try {
      const newContact = await ContactRepository.addContact(user.uid, {
        name,
        phone,
        relationship,
        isPrimary,
        email: '',
        notifyViaEmail: false,
        notifyViaSms: true,
        createdAt: new Date().toISOString()
      });
      addContact(newContact);
      navigate('/app/contacts');
    } catch (error) {
      console.error('Failed to save contact:', error);
      // Would show a toast error here in a production app
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col bg-gray-50 dark:bg-gray-950">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
        <button onClick={() => navigate(-1)} className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Add Contact</h1>
        <div className="w-9" /> {/* Spacer */}
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSave} className="mx-auto max-w-md space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 555-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Input
                label="Relationship"
                placeholder="Sister, Friend, Lawyer"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                required
              />
              
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Primary Emergency Contact</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Notified first during an SOS.</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" checked={isPrimary} onChange={(e) => setIsPrimary(e.target.checked)} />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-pink-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-pink-800"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Save className="mr-2 h-5 w-5" />
            )}
            Save Contact
          </Button>
        </form>
      </div>
    </motion.div>
  );
};
