import { collection, doc, setDoc, getDocs, getDoc, deleteDoc, query, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../../core/firebase/config';
import { Conversation, Message } from '../../../store/chat';

export const ChatRepository = {
  getCollectionRef: (userId: string) => collection(db, 'users', userId, 'conversations'),

  async saveConversation(userId: string, conversation: Conversation): Promise<void> {
    const docRef = doc(ChatRepository.getCollectionRef(userId), conversation.id);
    await setDoc(docRef, {
      ...conversation,
      createdAt: conversation.createdAt || serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  },

  async getConversations(userId: string): Promise<Conversation[]> {
    const q = query(ChatRepository.getCollectionRef(userId), orderBy('updatedAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        // Convert timestamp to ISO string if needed
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
      } as Conversation;
    });
  },

  async deleteConversation(userId: string, conversationId: string): Promise<void> {
    const docRef = doc(db, 'users', userId, 'conversations', conversationId);
    await deleteDoc(docRef);
  },

  async updateConversationTitle(userId: string, conversationId: string, title: string): Promise<void> {
    const docRef = doc(db, 'users', userId, 'conversations', conversationId);
    await updateDoc(docRef, {
      title,
      updatedAt: serverTimestamp(),
    });
  }
};
