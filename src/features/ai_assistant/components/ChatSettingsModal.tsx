import React, { useState } from 'react';
import { Settings, X, Trash2, Download, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useChatStore } from '../../../store/chat';
import { ChatRepository } from '../repositories/ChatRepository';
import { useAuthStore } from '../../../store/auth';

interface ChatSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatSettingsModal: React.FC<ChatSettingsModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuthStore();
  const { conversations, setConversations, setActiveConversation } = useChatStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClearHistory = async () => {
    if (!user) return;
    setIsDeleting(true);
    try {
      await Promise.all(conversations.map(c => ChatRepository.deleteConversation(user.uid, c.id)));
      setConversations([]);
      setActiveConversation(null);
      onClose();
    } catch (error) {
      console.error('Failed to clear history:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(conversations, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "safeher_chat_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Chat Settings
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:bg-gray-100 p-1 rounded-md dark:hover:bg-gray-800">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-4 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-pink-600" />
                Privacy & Data
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={handleExport}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <span className="flex items-center">
                    <Download className="h-4 w-4 mr-2 text-gray-500" />
                    Export Conversations
                  </span>
                </button>

                <button 
                  onClick={handleClearHistory}
                  disabled={isDeleting || conversations.length === 0}
                  className="w-full flex items-center justify-between px-4 py-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors text-sm font-medium text-red-700 dark:text-red-400 disabled:opacity-50"
                >
                  <span className="flex items-center">
                    <Trash2 className="h-4 w-4 mr-2" />
                    {isDeleting ? 'Deleting...' : 'Delete All Conversations'}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Your conversations are stored securely. SafeHer does not use your chat data to train AI models. Remember to delete your history if someone else has access to your device.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
