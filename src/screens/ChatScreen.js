import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ChatHeader from '../components/ChatHeader';
import ChatBubble from '../components/ChatBubble';
import ChatInput from '../components/ChatInput';
import { getConversationById, saveConversation } from '../services/storage';
import { generateChatResponse, summarizeConversation } from '../services/openai';

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);
  const { isNew, conversationId } = route.params || { isNew: true };
  const [currentConversationId, setCurrentConversationId] = useState(
    conversationId || `conv_${Date.now()}`
  );
  
  useEffect(() => {
    if (isNew) {
      // Start with bot welcome messages for new chats
      const initialMessages = [
        { id: '1', content: 'Hey User', sender: 'bot', timestamp: Date.now() },
        { id: '2', content: 'Where are you looking to go?', sender: 'bot', timestamp: Date.now() + 1 }
      ];
      setMessages(initialMessages);
      
      // Save this new conversation
      saveConversation(currentConversationId, initialMessages, 'New conversation');
    } else if (conversationId) {
      // Load existing conversation
      loadConversation(conversationId);
    }
  }, [isNew, conversationId]);
  
  const loadConversation = async (id) => {
    const conversation = await getConversationById(id);
    if (conversation) {
      setMessages(conversation.messages);
    }
  };
  
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage = {
      id: `msg_${Date.now()}`,
      content: text,
      sender: 'user',
      timestamp: Date.now()
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Check if this is the first user message (responding to "Where are you looking to go?")
      if (messages.length === 2 && messages[1].content === 'Where are you looking to go?') {
        // Send the predefined response for the first user message
        const botResponse = {
          id: `msg_${Date.now() + 1}`,
          content: `We currently are working on tours in ${text}, but we can help you plan your trip and make reservations.`,
          sender: 'bot',
          timestamp: Date.now() + 1000
        };
        
        setTimeout(() => {
          setIsTyping(false);
          setMessages([...updatedMessages, botResponse]);
          
          // Update the conversation in storage
          saveConversation(
            currentConversationId, 
            [...updatedMessages, botResponse],
            `Planning a trip to ${text}`
          );
        }, 1500);
      } else {
        // For subsequent messages, use the OpenAI API
        const response = await generateChatResponse(updatedMessages);
        
        const botResponse = {
          id: `msg_${Date.now() + 1}`,
          content: response,
          sender: 'bot',
          timestamp: Date.now() + 1000
        };
        
        setIsTyping(false);
        setMessages([...updatedMessages, botResponse]);
        
        // Generate a summary if needed and update storage
        const allMessages = [...updatedMessages, botResponse];
        const summary = await summarizeConversation(allMessages);
        
        saveConversation(currentConversationId, allMessages, summary);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      setIsTyping(false);
      
      // Add error message
      const errorMessage = {
        id: `msg_${Date.now() + 2}`,
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: Date.now() + 2000
      };
      
      setMessages([...updatedMessages, errorMessage]);
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ChatHeader onBack={() => navigation.goBack()} />
      
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatBubble message={item} />
        )}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        style={styles.inputContainer}>
        <ChatInput onSend={handleSendMessage} isTyping={isTyping} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf8ef',
  },
  messagesList: {
    padding: 10,
    paddingBottom: 80,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ChatScreen;