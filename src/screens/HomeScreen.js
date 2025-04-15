import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ConversationCard from '../components/ConversationCard';
import { getConversations } from '../services/storage';

const HomeScreen = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  
  useEffect(() => {
    loadConversations();
    
    // Add listener to reload conversations when navigating back to this screen
    const unsubscribe = navigation.addListener('focus', () => {
      loadConversations();
    });
    
    return unsubscribe;
  }, [navigation]);
  
  const loadConversations = async () => {
    const savedConversations = await getConversations();
    setConversations(savedConversations.reverse()); // Most recent first
  };
  
  const handleNewChat = () => {
    navigation.navigate('Chat', { isNew: true });
  };
  
  const handleConversationPress = (conversation) => {
    navigation.navigate('Chat', { conversationId: conversation.id, isNew: false });
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.logo}>Chat with me</Text>
      
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationCard 
            conversation={item} 
            onPress={() => handleConversationPress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No conversations yet</Text>
        }
      />
      
      <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
        <Text style={styles.newChatButtonText}> + CREATE NEW</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf8ef',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logo: {
    color: '#000',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
  newChatButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#000',
    paddingVertical: 8,
    borderRadius: 0,
    alignItems: 'center',
  },
  newChatButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'normal',
  },
});

export default HomeScreen;