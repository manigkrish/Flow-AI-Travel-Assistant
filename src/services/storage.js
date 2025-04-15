import AsyncStorage from '@react-native-async-storage/async-storage';

const CONVERSATIONS_KEY = 'flow_conversations';

// Get all conversations
export const getConversations = async () => {
  try {
    const data = await AsyncStorage.getItem(CONVERSATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving conversations:', error);
    return [];
  }
};

// Get a specific conversation by ID
export const getConversationById = async (id) => {
  try {
    const conversations = await getConversations();
    return conversations.find(conv => conv.id === id) || null;
  } catch (error) {
    console.error('Error retrieving conversation:', error);
    return null;
  }
};

// Save or update a conversation
export const saveConversation = async (id, messages, summary) => {
  try {
    const conversations = await getConversations();
    const existingIndex = conversations.findIndex(conv => conv.id === id);
    
    const conversation = {
      id,
      messages,
      summary,
      timestamp: Date.now()
    };
    
    if (existingIndex !== -1) {
      // Update existing conversation
      conversations[existingIndex] = conversation;
    } else {
      // Add new conversation
      conversations.push(conversation);
    }
    
    await AsyncStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
    return true;
  } catch (error) {
    console.error('Error saving conversation:', error);
    return false;
  }
};

// Delete a conversation
export const deleteConversation = async (id) => {
  try {
    const conversations = await getConversations();
    const updatedConversations = conversations.filter(conv => conv.id !== id);
    await AsyncStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(updatedConversations));
    return true;
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return false;
  }
};